export interface CreateRecipeDTO {
  name: string;
  ingredients: {
    name: string;
    baseNutritionSnapshot: {
      proteins: number;
      fats: number;
      carbs: number;
      calories: number;
    };
    quantity: number;
    isLiquid: boolean;
  }[];
  steps: {
    order: number;
    text: string;
  }[];
  time: {
    prepareTime: number;
    cookingTime: number;
  };
  type: string;
}
