import { Quantity } from "../../../domain/recipe/valueObject/quantity";

export interface NutritionProps {
    proteins: number
    fats: number
    carbs: number
    calories: number
} 

export class Nutrition {
    private constructor(private props: NutritionProps) {}

    public static create(props: NutritionProps): Nutrition {
        if (props.calories < 0) throw new Error("Calories cannot be negative");
        if (props.proteins < 0) throw new Error("Protein cannot be negative");
        if (props.fats < 0) throw new Error("Fat cannot be negative");
        if (props.carbs < 0) throw new Error("Carbs cannot be negative");

        return new Nutrition(props)
    }

    public static rehydrate(props: NutritionProps): Nutrition {
        return Nutrition.create(props)
    }

    public scale(quantity: Quantity): Nutrition {
        return new Nutrition({
            proteins: this.props.proteins / 100 * quantity.value,
            fats: this.props.fats / 100 * quantity.value,
            carbs: this.props.carbs / 100 * quantity.value,
            calories: this.props.calories / 100 * quantity.value,
        })
    }

    get proteins() { return this.props.proteins }
    get fats() { return this.props.fats }
    get carbs() { return this.props.carbs }
    get calories() { return this.props.calories }
}
