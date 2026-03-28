import { StrictMode } from "react"
import { ItemView, WorkspaceLeaf } from "obsidian"
import { Root, createRoot } from "react-dom/client"
import {
  CreateRecipeForm,
  CreateRecipeFormState,
  IngredientForm,
  StepForm,
} from "../components/createRecipeForm"
import { AppContext } from "../utils/context"
import { useApp } from "../utils/contextHook"
import { CreateRecipeDTO } from "application/recipe/dto/createRecipeDTO"
import { CreateRecipeUseCase } from "application/recipe/useCases/createRecipeUseCase"
import { ObsidianRecipeRepository } from "infra/repository/obsidian/obsidianRecipeRepository"
import { IRecipeRepository } from "domain/recipe/interface/recipeRepository"

export const CREATE_RECIPE_VIEW_TYPE = "create-recipe" as string

export class CreateRecipeView extends ItemView {
  root: Root | null = null
  recipeRepository: IRecipeRepository

  constructor(leaf: WorkspaceLeaf, recipeRepository: IRecipeRepository) {
    super(leaf)
    this.recipeRepository = recipeRepository
  }

  getViewType() {
    return CREATE_RECIPE_VIEW_TYPE
  }

  getDisplayText() {
    return "Create recipe"
  }

  onFormSubmit({ data }: { data: CreateRecipeFormState }) {
    const dto: CreateRecipeDTO = {
      name: String(data.name),
      time: {
        prepareTime: Number(data.time.prepareTime),
        cookingTime: Number(data.time.cookingTime),
      },
      recipeType: "breakfast",
      ingredients: data.ingredients.map((ing: IngredientForm) => ({
        name: String(ing.name),
        quantity: Number(ing.quantity),
        isLiquid: ing.measure === "ml" ? false : true,
        baseNutritionSnapshot: {
          proteins: 1,
          fats: 1,
          carbs: 1,
          calories: 1,
        },
      })),
      steps: data.steps.map((step: StepForm, i: number) => ({
        order: i + 1,
        text: String(step.text),
      })),
    }

    new CreateRecipeUseCase(this.recipeRepository).execute({ dto })
  }

  async onOpen() {
    this.root = createRoot(this.contentEl)
    this.root.render(
      <AppContext.Provider value={this.app}>
        <CreateRecipeForm onSubmit={this.onFormSubmit.bind(this)} />
      </AppContext.Provider>,
    )
  }

  async onClose() {
    this.root?.unmount()
  }
}
