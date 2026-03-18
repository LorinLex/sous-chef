import { StrictMode } from "react"
import { ItemView, WorkspaceLeaf } from "obsidian"
import { Root, createRoot } from "react-dom/client"
import { CreateRecipeForm } from "../components/createRecipeForm"
import { AppContext } from "../utils/context"
import { useApp } from "../utils/contextHook"

export const CREATE_RECIPE_VIEW_TYPE = "create-recipe" as string

export class CreateRecipeView extends ItemView {
  root: Root | null = null

  constructor(leaf: WorkspaceLeaf) {
    super(leaf)
  }

  getViewType() {
    return CREATE_RECIPE_VIEW_TYPE
  }

  getDisplayText() {
    return "Create recipe"
  }

  async onOpen() {
    this.root = createRoot(this.contentEl)
    this.root.render(
      <AppContext.Provider value={this.app}>
        <CreateRecipeForm />
      </AppContext.Provider>,
    )
  }

  async onClose() {
    this.root?.unmount()
  }
}
