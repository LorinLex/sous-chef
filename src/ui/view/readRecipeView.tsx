import { Dispatch, SetStateAction, StrictMode, useState } from "react"
import {
  FileView,
  ItemView,
  TFile,
  ViewStateResult,
  WorkspaceLeaf,
} from "obsidian"
import { Root, createRoot } from "react-dom/client"
import { AppContext } from "../utils/context"
import { useApp } from "../utils/contextHook"
import { ReadRecipeDTO } from "application/recipe/dto/readRecipeDTO"
import { ReadRecipeUseCase } from "application/recipe/useCases/readRecipeUseCase"
import { ObsidianRecipeRepository } from "infra/repository/obsidian/obsidianRecipeRepository"
import { IRecipeRepository } from "domain/recipe/interface/recipeRepository"
import { ReadRecipe } from "ui/components/readRecipe"

export const READ_RECIPE_VIEW_TYPE = "read-recipe" as string

export class ReadRecipeView extends FileView {
  root: Root | null = null
  recipeRepository: IRecipeRepository
  component: React.FC
  setAppData: Dispatch<SetStateAction<{}> | undefined>

  constructor(leaf: WorkspaceLeaf, recipeRepository: IRecipeRepository) {
    super(leaf)
    this.recipeRepository = recipeRepository
  }

  getViewType() {
    return READ_RECIPE_VIEW_TYPE
  }

  getDisplayText() {
    return "Read recipe"
  }

  // override async setState(
  //   state: { file: string },
  //   result: ViewStateResult,
  // ): Promise<void> {
  //   console.log("setState", state, result)
  //   if (state.filePath) {
  //     this.filePath = state.filePath
  //   }

  //   return super.setState(state, result)
  // }

  // override getState(): { filePath: string } {
  //   return { filePath: this.filePath }
  // }

  getState() {
    return {
      file: this.file?.path,
    }
  }

  async setState(state: any, result: ViewStateResult) {
    if (state.file) {
      console.log(`setState:`, state)
      const file = this.app.vault.getAbstractFileByPath(state.file)

      if (file instanceof TFile) {
        this.file = file
        this.setAppData(await this.getRecipeData(state.file))
        // await this.onLoadFile(file)
      }
    }

    super.setState(state, result)
  }

  // async onLoadFile(file: TFile) {
  //   this.setAppData(await this.getRecipeData(file))
  // }

  async getRecipeData(file: TFile): Promise<ReadRecipeDTO> {
    const useCase = new ReadRecipeUseCase(this.recipeRepository)
    if (!this.file) throw Error("No file!")
    return await useCase.execute(this.file?.path)
  }

  async onOpen() {
    console.log("onOpen", this.file)

    this.root = createRoot(this.contentEl)

    const App = () => {
      const [data, setData] = useState<ReadRecipeDTO | undefined>()
      this.setAppData = setData

      if (!data) return <div>Loading...</div>

      return <ReadRecipe data={data} />
    }

    this.root.render(
      <AppContext.Provider value={this.app}>
        <App />
      </AppContext.Provider>,
    )
  }

  async onClose() {
    this.root?.unmount()
  }
}
