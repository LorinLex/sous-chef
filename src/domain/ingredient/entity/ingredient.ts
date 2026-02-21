import { IngredientId } from "../../shared/valueObject/ingredientId";
import { Nutrition, NutritionProps } from "../../shared/valueObject/nutrition";
import { SourceEnum } from "../enum/source";



interface BaseIngredientProps {
    name: string
    isLiquid: boolean
}

interface CreateIngredientProps extends BaseIngredientProps {
    source: SourceEnum
    nutrition: NutritionProps
}

interface IngredientProps extends BaseIngredientProps {
    id: IngredientId
    nutrition: Nutrition
    source: SourceEnum
    createdAt: Date
    updatedAt: Date
}

interface PersistentIngredientProps extends BaseIngredientProps {
    id: string
    nutrition: NutritionProps
    source: SourceEnum
    createdAt: Date
    updatedAt: Date
}

export class Ingredient {
    private constructor(private props: IngredientProps) {}

    public createManual({ name, nutrition, isLiquid }: CreateIngredientProps): Ingredient {
        if (!name.trim()) throw new Error("Name should be not empty!")

        const now = new Date()
        return new Ingredient({
            id: IngredientId.generate(),
            name,
            nutrition: Nutrition.create(nutrition),
            isLiquid,
            source: SourceEnum.MANUAL,
            createdAt: now,
            updatedAt: now
        })
    }

    public createFromApi({ name, nutrition, isLiquid }: CreateIngredientProps): Ingredient {
        if (!name.trim()) throw new Error("Name should be not empty!")

        const now = new Date()
        return new Ingredient({
            id: IngredientId.generate(),
            name,
            nutrition: Nutrition.create(nutrition),
            isLiquid,
            source: SourceEnum.API,
            createdAt: now,
            updatedAt: now
        })
    }

    public rehydrate(
        { id, name, nutrition, isLiquid, source, createdAt, updatedAt }:
        PersistentIngredientProps
    ): Ingredient {
        return new Ingredient({
            id: IngredientId.rehydrate({ value: id }),
            name,
            nutrition: Nutrition.rehydrate(nutrition),
            isLiquid,
            source,
            createdAt,
            updatedAt,
        })
    }

    public updateNutrition(nutrition: NutritionProps) {
        this.props.nutrition.update(nutrition);
        this.props.updatedAt = new Date();
    }

    public rename(newName: string) {
        if (!newName.trim()) {
            throw new Error("Ingredient name cannot be empty");
        }

        this.props.name = newName;
        this.props.updatedAt = new Date();
    }

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