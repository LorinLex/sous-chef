import { CookingTime } from "../valueObject/cookingTime";
import { RecipeIngredient } from "../valueObject/recipeIngredient";
import { RecipeStep } from "../valueObject/recipeStep";
import { RecipeId } from "../valueObject/recipeId";
import { RecipeType } from "../enum/recipeType";
import { CookingTimeProps, CreateRecipeIngredientProps, PrimitiveRecipeIngredientProps, RecipeStepProps } from "../valueObject/types";


interface BaseRecipeProps {
    name: string
    source?: string  // TODO: изменить тип
}

export interface ConstructRecipeProps extends BaseRecipeProps {
    id: RecipeId
    ingredients: RecipeIngredient[]
    steps: RecipeStep[]
    time: CookingTime
    type: RecipeType
}

export interface CreateRecipeProps extends BaseRecipeProps {
    ingredients: CreateRecipeIngredientProps[]
    steps: RecipeStepProps[]
    time: CookingTimeProps
    type: string
} 

export interface PrimitiveRecipeProps extends BaseRecipeProps {
    id: string
    ingredients: PrimitiveRecipeIngredientProps[]
    steps: RecipeStepProps[]
    time: CookingTimeProps
    type: string
}