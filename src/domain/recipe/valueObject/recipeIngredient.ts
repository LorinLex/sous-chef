import { IngredientName } from "../../shared/valueObject/ingredientName";
import { IngredientId } from "../../shared/valueObject/ingredientId";
import { Nutrition, NutritionProps } from "../../shared/valueObject/nutrition";
import { Quantity, QuantityProps } from "./quantity";

interface BaseRecipeIngredientProps {
    isLiquid: boolean
}

interface RecipeIngredientProps extends BaseRecipeIngredientProps {
    id: IngredientId
    name: IngredientName
    baseNutrition: Nutrition
    quantity: Quantity
}

export interface CreateRecipeIngredientProps extends BaseRecipeIngredientProps{
    name: string
    baseNutrition: NutritionProps
    quantity: QuantityProps
}


export interface PersistentRecipeIngredientProps extends BaseRecipeIngredientProps{
    id: string
    name: string
    baseNutrition: NutritionProps
    quantity: QuantityProps
}

export class RecipeIngredient {
    private constructor(private props: RecipeIngredientProps) {}

    public static create(
        { name, isLiquid, baseNutrition, quantity }: CreateRecipeIngredientProps
    ): RecipeIngredient {
        if (!name.trim()) throw new Error("Ingredient name must be not empty!")
        
        return new RecipeIngredient({
            id: IngredientId.generate(),
            name: IngredientName.create({ value: name }),
            isLiquid,
            baseNutrition: Nutrition.create(baseNutrition),
            quantity: Quantity.create(quantity)
        })
    }

    public static rehydrate(
        { id, name, isLiquid, baseNutrition, quantity }: PersistentRecipeIngredientProps
    ): RecipeIngredient {
        if (!name.trim()) throw new Error("Ingredient name must be not empty!")

        return new RecipeIngredient({
            id: IngredientId.rehydrate({ value: id }),
            name: IngredientName.rehydrate({ value: name }),
            isLiquid,
            baseNutrition: Nutrition.rehydrate(baseNutrition),
            quantity: Quantity.rehydrate(quantity)
        })
    }

    public toPrimitive(): { id: string, name: string, quantity: number } {
        return {
            id: this.props.id.toString(),
            name: this.props.name.toPrimitive(),
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
        return this.props.baseNutrition.scale(this.quantity)
    }
}
