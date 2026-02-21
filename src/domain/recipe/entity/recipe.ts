import { CookingTime } from "../valueObject/cookingTime";
import { RecipeIngredient } from "../valueObject/recipeIngredient";
import { RecipeStep } from "../valueObject/recipeStep";
import { RecipeId } from "../valueObject/recipeId";
import { RecipeType } from "../enum/recipeType";


interface BaseRecipeProps {
    ingredients: RecipeIngredient[]
    steps: RecipeStep[],
    time: CookingTime,
    recipeType: RecipeType
    source?: string  // TODO: изменить тип
}

type CreateRecipeProps = BaseRecipeProps

interface FullRecipeProps extends BaseRecipeProps {
    id: RecipeId
}

interface RehydrateRecipeProps extends BaseRecipeProps {
    id: RecipeId
}

export class Recipe {
    private constructor(private props: FullRecipeProps) {}

    public rehydrate(props: RehydrateRecipeProps) {
        return new Recipe(props)
    }

    public createManual(props: CreateRecipeProps) {
        if (props.ingredients.length == 0) throw new Error("There should be at least one ingredient!")
        if (props.steps.length == 0) throw new Error("There should be at least one step!")
        
        return new Recipe({
            ...props,
            id: RecipeId.create()
        })
    }

    public createFromApi(props: CreateRecipeProps) {
        if (props.ingredients.length == 0) throw new Error("There should be at least one ingredient!")
        if (props.steps.length == 0) throw new Error("There should be at least one step!")
        
        return new Recipe({
            ...props,
            id: RecipeId.create()
        })
    }
}
