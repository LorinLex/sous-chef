import { Recipe } from "../entity/recipe";
import { RecipeId } from "../valueObject/recipeId";

export interface RecipeRepository {
    add({ recipe }: { recipe: Recipe }): Promise<void>;
    save({ recipe }: { recipe: Recipe }): Promise<void>
    findById({ id }: { id: RecipeId }): Promise<Recipe | undefined>
    findByName({ name }: { name: string }): Promise<Recipe | undefined>
}
