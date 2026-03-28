import { IngredientName } from "../../shared/valueObject/ingredientName";
import { IngredientId } from "../../shared/valueObject/ingredientId";
import { Nutrition } from "../../shared/valueObject/nutrition";
import { Quantity } from "./quantity";
import { CreateRecipeIngredientProps, PrimitiveRecipeIngredientProps, RecipeIngredientProps } from "./types";


export class RecipeIngredient {
    private constructor(private props: RecipeIngredientProps) {}

    public static create(
        { name, isLiquid, baseNutritionSnapshot, quantity }: CreateRecipeIngredientProps
    ): RecipeIngredient {
        if (!name.trim()) throw new Error("Ingredient name must be not empty!")
        
        return new RecipeIngredient({
            id: IngredientId.generate(),
            name: IngredientName.create({ value: name }),
            isLiquid,
            baseNutritionSnapshot: Nutrition.create(baseNutritionSnapshot),
            quantity: Quantity.create({ value: quantity })
        })
    }

    public static rehydrate(
        { id, name, isLiquid, baseNutritionSnapshot, quantity }: PrimitiveRecipeIngredientProps
    ): RecipeIngredient {
        if (!name.trim()) throw new Error("Ingredient name must be not empty!")

        return new RecipeIngredient({
            id: IngredientId.rehydrate({ value: id }),
            name: IngredientName.rehydrate({ value: name }),
            isLiquid,
            baseNutritionSnapshot: Nutrition.rehydrate(baseNutritionSnapshot),
            quantity: Quantity.rehydrate({ value: quantity })
        })
    }

    public toPrimitive(): PrimitiveRecipeIngredientProps {
        return {
            id: this.props.id.toString(),
            name: this.props.name.toPrimitive(),
            isLiquid: this.isLiquid,
            baseNutritionSnapshot: this.props.baseNutritionSnapshot.toPrimitives(),
            quantity: this.props.quantity.toPrimitive()
        }
    }

    get name() {
        return this.props.name
    }

    get isLiquid() {
        return this.props.isLiquid
    }

    get quantity() {
        return this.props.quantity
    }

    get nutrition() {
        return this.props.baseNutritionSnapshot.scale(this.quantity)
    }
}
