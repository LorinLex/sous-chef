import { Ingredient } from "../entity/ingredient";
import { IngredientId } from "../../shared/valueObject/ingredientId";
import { IngredientName } from "../../shared/valueObject/ingredientName";

export interface IngredientRepository {
    add({ ingredient }: { ingredient: Ingredient }): Promise<void>;
    save({ ingredient }: { ingredient: Ingredient }): Promise<void>
    findById({ id }: { id: IngredientId }): Promise<Ingredient | undefined>
    findByName({ name }: { name: IngredientName }): Promise<Ingredient | undefined>
}
