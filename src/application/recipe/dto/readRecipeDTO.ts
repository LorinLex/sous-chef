export interface ReadRecipeDTO {
  id: string
  name: string
  ingredients: {
    id: string
    name: string
    baseNutritionSnapshot: {
      proteins: number
      fats: number
      carbs: number
      calories: number
    }
    quantity: number
    isLiquid: boolean
  }[]
  steps: {
    order: number
    text: string
  }[]
  time: {
    prepareTime: number
    cookingTime: number
  }
  recipeType: string
}
