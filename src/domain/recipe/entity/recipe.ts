import { CookingTime } from "../valueObject/cookingTime";
import { RecipeStep } from "../valueObject/recipeStep";
import { RecipeId } from "../valueObject/recipeId";
import { RecipeType } from "../enum/recipeType";
import { parseStringEnum } from "utils/enum";
import { ConstructRecipeProps, CreateRecipeProps, PrimitiveRecipeProps } from "./types";
import { RecipeIngredient } from "../valueObject/recipeIngredient";


export class Recipe {
    private constructor(private props: ConstructRecipeProps) {}

    private static ensureInvariants(props: CreateRecipeProps | PrimitiveRecipeProps) {
        if (!props.name.trim())
            throw new Error("Recipe name must be non empty!")
        if (props.ingredients.length == 0)
            throw new Error("There should be at least one ingredient!")
        if (props.steps.length == 0)
            throw new Error("There should be at least one step!")
    }

    public static create(props: CreateRecipeProps): Recipe {
        this.ensureInvariants(props)
        
        const ingredientsVO = props.ingredients.map(
            ingredient => RecipeIngredient.create(ingredient)
        )
        const stepsVO = props.steps.map(
            step => RecipeStep.create(step)
        )

        return new Recipe({
            id: RecipeId.generate(),
            name: props.name,
            ingredients: ingredientsVO,
            steps: stepsVO,
            time: CookingTime.create(props.time),
            type: parseStringEnum(RecipeType, props.type)
        })
    }

    public static rehydrate(props: PrimitiveRecipeProps): Recipe {
        this.ensureInvariants(props)

        const ingredientsVO = props.ingredients.map(
            ingredient => RecipeIngredient.create(ingredient)
        )
        const stepsVO = props.steps.map(
            step => RecipeStep.create(step)
        )

        return new Recipe({
            id: RecipeId.rehydrate({ value: props.id }),
            name: props.name,
            ingredients: ingredientsVO,
            steps: stepsVO,
            time: CookingTime.create(props.time),
            type: parseStringEnum(RecipeType, props.type)
        })
    }

    public toPrimitives() {
        return {
            id: this.id,
            name: this.name,
            ingredients: this.ingredients.map(
                ingredient => ingredient.toPrimitive()
            ),
            steps: this.steps.map(step => step.toPrimitive()),
            time: this.time.toPrimitive(),
            type: this.type.toString(),
            source: this.source
        }
    }

    get id() {
        return this.props.id
    }

    get name() {
        return this.props.name
    }

    get ingredients() {
        return this.props.ingredients
    }

    get steps() {
        return this.props.steps
    }

    get time() {
        return this.props.time
    }

    get type() {
        return this.props.type
    }

    get source() {
        return this.props.source
    }
}
