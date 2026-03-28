import { Recipe } from "../entity/recipe"
import { RecipeId } from "../valueObject/recipeId"

export interface IRecipeRepository {
  add({ recipe }: { recipe: Recipe }): Promise<void>
  save({ recipe }: { recipe: Recipe }): Promise<void>
  read({ path }: { path: string }): Promise<Recipe | undefined>
  // findById({ id }: { id: RecipeId }): Promise<Recipe | undefined>
  // findByName({ name }: { name: string }): Promise<Recipe | undefined>
}
