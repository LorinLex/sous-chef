import { IngredientId } from "../valueObject/ingredientId";
import { Nutrition } from "../valueObject/nutrition";



interface BaseIngredientProps {
    name: string
    nutrition: Nutrition
    isLiquid: boolean
}

interface CreateIngredientProps extends BaseIngredientProps {
    source: "manual" | "api";
}

interface IngredientProps extends BaseIngredientProps {
    id: IngredientId
    source: "manual" | "api";
    createdAt: Date;
    updatedAt: Date;
}

export class Ingredient {
    private constructor(private props: IngredientProps) {}

    public createManual({ name, nutrition, isLiquid }: CreateIngredientProps): Ingredient {
        if (!name.trim()) throw new Error("Name should be not empty!")

        const id = IngredientId.create()
        const now = new Date()
        return new Ingredient({
            id,
            name,
            nutrition,
            isLiquid,
            source: "manual",
            createdAt: now,
            updatedAt: now
        })
    }

    public createFromApi({ name, nutrition, isLiquid }: CreateIngredientProps): Ingredient {
        if (!name.trim()) throw new Error("Name should be not empty!")

        const id = IngredientId.create()
        const now = new Date()
        return new Ingredient({
            id,
            name,
            nutrition,
            isLiquid,
            source: "api",
            createdAt: now,
            updatedAt: now
        })
    }

    public rehydrate(props: IngredientProps): Ingredient {
        return new Ingredient(props)
    }

    public updateNutrition(nutrition: Nutrition) {
        this.props.nutrition = nutrition;
        this.props.updatedAt = new Date();
    }

    public rename(newName: string) {
        if (!newName.trim()) {
            throw new Error("Ingredient name cannot be empty");
        }

        this.props.name = newName;
        this.props.updatedAt = new Date();
    }

    // ---- Getters ----

    get id() {
        return this.props.id;
    }

    get name() {
        return this.props.name;
    }

    get nutrition() {
        return this.props.nutrition;
    }

    get source() {
        return this.props.source;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }
}