import { IngredientId } from "../../shared/valueObject/ingredientId";
import { Nutrition, NutritionProps } from "../../shared/valueObject/nutrition";
import { Quantity, QuantityProps } from "./quantity";

interface BaseRecipeIngredientProps {
    name: string
    isLiquid: boolean
}

interface RecipeIngredientProps extends BaseRecipeIngredientProps {
    id: IngredientId
    nutrition: Nutrition
    quantity: Quantity
}

export interface CreateRecipeIngredientProps extends BaseRecipeIngredientProps{
    baseNutrition: NutritionProps
    quantity: QuantityProps
}


export interface PersistentRecipeIngredientProps extends BaseRecipeIngredientProps{
    id: string
    nutrition: NutritionProps
    quantity: QuantityProps
}

export class RecipeIngredient {
    private constructor(private props: RecipeIngredientProps) {}

    public static create(
        { name, isLiquid, baseNutrition, quantity }: CreateRecipeIngredientProps
    ): RecipeIngredient {
        if (!name.trim()) throw new Error("Ingredient name must be not empty!")
        
        const baseNutritionVO = Nutrition.create(baseNutrition)
        const quantityVO = Quantity.create(quantity)
        return new RecipeIngredient({
            id: IngredientId.generate(),
            name,
            isLiquid,
            nutrition: baseNutritionVO.scale(quantityVO),
            quantity: quantityVO
        })
    }

    public static rehydrate(
        { id, name, isLiquid, nutrition, quantity }: PersistentRecipeIngredientProps
    ): RecipeIngredient {
        if (!name.trim()) throw new Error("Ingredient name must be not empty!")

        return new RecipeIngredient({
            id: IngredientId.rehydrate({ value: id }),
            name,
            isLiquid,
            nutrition: Nutrition.rehydrate(nutrition),
            quantity: Quantity.rehydrate(quantity)
        })
    }

    public toPrimitive(): { id: string, name: string, quantity: number } {
        return {
            id: this.props.id.toString(),
            name: this.props.name,
            quantity: this.props.quantity.value
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
        return this.props.nutrition
    }
}
