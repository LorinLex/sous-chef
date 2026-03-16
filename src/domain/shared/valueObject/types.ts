import { UUIDTypes } from 'uuid';

export interface IngredientIdProps {
    value: UUIDTypes
}

export interface IngredientNameProps {
    value: string
}

export interface NutritionProps {
    proteins: number
    fats: number
    carbs: number
    calories: number
}
