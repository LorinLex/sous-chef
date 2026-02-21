import { IngredientId } from "../../shared/valueObject/ingredientId";
import { Nutrition } from "../../shared/valueObject/nutrition";
import { Quantity } from "./quantity";

interface BaseRecipeIngredientProps {
    name: string
    isLiquid: boolean
    quantity: Quantity
}

interface RecipeIngredientProps extends BaseRecipeIngredientProps {
    id: IngredientId
    nutrition: Nutrition
}

interface CreateRecipeIngredientProps extends BaseRecipeIngredientProps{
    baseNutrition: Nutrition
}

export class RecipeIngredient {
    private constructor(private props: RecipeIngredientProps) {}

    public create(props: CreateRecipeIngredientProps) {
        if (!props.name.trim()) throw new Error("Ingredient name must be not empty!")

        return new RecipeIngredient({
            id: IngredientId.create(),
            nutrition: props.baseNutrition.scale(props.quantity),
            ...props
        })
    }

    public rehydrate(props: RecipeIngredientProps) {
        return new RecipeIngredient(props)
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
