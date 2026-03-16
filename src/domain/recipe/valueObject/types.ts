import { UUIDTypes } from 'uuid';
import { IngredientName } from "../../shared/valueObject/ingredientName";
import { IngredientId } from "../../shared/valueObject/ingredientId";
import { Nutrition } from "../../shared/valueObject/nutrition";
import { Quantity } from "./quantity";
import { NutritionProps } from '../../../domain/shared/valueObject/types';

export interface CookingTimeProps{
    prepareTime: number
    cookingTime: number
}

export interface QuantityProps {
    value: number
}

export interface RecipeIdProps {
    value: UUIDTypes
}

interface BaseRecipeIngredientProps {
    isLiquid: boolean
}

export interface RecipeIngredientProps extends BaseRecipeIngredientProps {
    id: IngredientId
    name: IngredientName
    baseNutritionSnapshot: Nutrition
    quantity: Quantity
}

export interface CreateRecipeIngredientProps extends BaseRecipeIngredientProps{
    name: string
    baseNutritionSnapshot: NutritionProps
    quantity: number
}

export interface PrimitiveRecipeIngredientProps extends BaseRecipeIngredientProps{
    id: string
    name: string
    baseNutritionSnapshot: NutritionProps
    quantity: number
}

export interface RecipeStepProps {
    order: number
    text: string
}
