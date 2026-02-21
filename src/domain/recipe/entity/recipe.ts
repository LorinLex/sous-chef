import { CookingTime, CookingTimeProps } from "../valueObject/cookingTime";
import { CreateRecipeIngredientProps, RecipeIngredient } from "../valueObject/recipeIngredient";
import { RecipeStep, RecipeStepProps } from "../valueObject/recipeStep";
import { RecipeId } from "../valueObject/recipeId";
import { RecipeType } from "../enum/recipeType";
import { parseStringEnum } from "utils/enum";


interface BaseRecipeProps {
    name: string
    source?: string  // TODO: изменить тип
}

interface ConstructRecipeProps extends BaseRecipeProps {
    id: RecipeId
    ingredients: RecipeIngredient[]
    steps: RecipeStep[]
    time: CookingTime
    type: RecipeType
}

interface CreateRecipeProps extends BaseRecipeProps {
    ingredients: CreateRecipeIngredientProps[]
    steps: RecipeStepProps[]
    time: CookingTimeProps
    type: string
} 

interface PersistentRecipeProps extends CreateRecipeProps {
    id: string
}

export class Recipe {
    private constructor(private props: ConstructRecipeProps) {}

    private ensureInvariants(props: CreateRecipeProps | PersistentRecipeProps) {
        if (!props.name.trim())
            throw new Error("Recipe name must be non empty!")
        if (props.ingredients.length == 0)
            throw new Error("There should be at least one ingredient!")
        if (props.steps.length == 0)
            throw new Error("There should be at least one step!")
    }

    public create(props: CreateRecipeProps): Recipe {
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

    public rehydrate(props: PersistentRecipeProps): Recipe {
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
