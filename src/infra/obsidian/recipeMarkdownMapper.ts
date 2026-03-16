import { App } from "obsidian";
import { CookingTimeProps, PrimitiveRecipeIngredientProps, RecipeStepProps } from "../../domain/recipe/valueObject/types";
import { PrimitiveRecipeProps } from "../../domain/recipe/entity/types";

export interface MarkdownData {
    frontMatter: Record<string, unknown>
    body: string
}

export class RecipeMarkdownMapper {
    constructor(private app: App) {}

    private parseStep({ raw }: { raw: unknown }): RecipeStepProps {
        if (typeof raw !== "object" || raw === null)
            throw new Error("Ingredient must be an object!")

        const rawStep = raw as Record<string, unknown>
        
        if (!rawStep.order || typeof rawStep.order !== "number")
            throw new Error("Recipe step order is missing or is not a number!")
        
        if (!rawStep.text || typeof rawStep.text !== "string" || !rawStep.text.trim())
            throw new Error("Recipe step text is missing or is not a string!")
    
        return {
            order: rawStep.order,
            text: rawStep.text,
        }
    }

    private parseIngredient({ raw }: { raw: unknown }): PrimitiveRecipeIngredientProps {
        if (typeof raw !== "object" || raw === null)
            throw new Error("Ingredient must be an object!")

        const rawIngredient = raw as Record<string, unknown>

        if (!rawIngredient.id || typeof rawIngredient.id !== "string")
            throw new Error("Ingredient has no id!")

        if (!rawIngredient.name || typeof rawIngredient.name !== "string")
            throw new Error("Ingredient has no name!")

        if (!rawIngredient.quantity) throw new Error("Ingredient has no quantity!")

        if (typeof rawIngredient.quantity !== "number")
            throw new Error("Ingredient quantity is not a number")
        
        if (!rawIngredient.baseNutritionSnapshot || typeof rawIngredient.baseNutritionSnapshot !== "object")
            throw new Error("Ingredient has no nutrition!")

        // Better to another method?
        const rawBaseNutritionSnapshot = rawIngredient.baseNutritionSnapshot as Record<string, unknown>
        if (
            !rawBaseNutritionSnapshot.proteins 
            || typeof rawBaseNutritionSnapshot.proteins !== "number"
        )
            throw new Error("Ingredient nutrition has no protein!")

        if (
            !rawBaseNutritionSnapshot.fats 
            || typeof rawBaseNutritionSnapshot.fats !== "number"
        )
            throw new Error("Ingredient nutrition has no fats!")

        if (
            !rawBaseNutritionSnapshot.carbs 
            || typeof rawBaseNutritionSnapshot.carbs !== "number"
        )
            throw new Error("Ingredient nutrition has no carbs!")

        if (
            !rawBaseNutritionSnapshot.calories 
            || typeof rawBaseNutritionSnapshot.calories !== "number"
        )
            throw new Error("Ingredient nutrition has no calories!")

        if (!rawIngredient.isLiquid || typeof rawIngredient.isLiquid !== "boolean")
            throw new Error("Ingredient has no isLiquid!")

        return {
            id: rawIngredient.id,
            name: rawIngredient.name,
            quantity: rawIngredient.quantity,
            baseNutritionSnapshot: {
                proteins: rawBaseNutritionSnapshot.proteins,
                fats: rawBaseNutritionSnapshot.fats,
                carbs: rawBaseNutritionSnapshot.carbs,
                calories: rawBaseNutritionSnapshot.calories,
            },
            isLiquid: rawIngredient.isLiquid,
        }
    }

    private parseTime({ raw }: { raw: Record<string, unknown> }): CookingTimeProps {
        if (!raw.prepareTime || typeof raw.prepareTime !== "number")
            throw new Error("Recipe prepare time is missing or is not a number!")
        
        if (!raw.cookingTime || typeof raw.cookingTime !== "number")
            throw new Error("Recipe cooking time is missing or is not a number!")
    
        return {
            prepareTime: raw.prepareTime,
            cookingTime: raw.cookingTime,
        }
    }

    toPrimitives({ frontMatter }: MarkdownData): PrimitiveRecipeProps {
        if (!frontMatter.id || typeof frontMatter.id !== "string")
            throw new Error("Recipe id is missing or not a string!")

        if (!frontMatter.name || typeof frontMatter.name !== "string")
            throw new Error("Recipe name is missing or not a string!")

        if (!frontMatter.ingredients)
            throw new Error("Ingredients are missing!")
        
        if (!Array.isArray(frontMatter.ingredients))
            throw new Error("Ingredients are not an array!")

        const ingredients: PrimitiveRecipeIngredientProps[] = []
        for (const ingredient of frontMatter.ingredients) {
            ingredients.push(this.parseIngredient({ raw: ingredient }))
        }

        // steps
        if (!frontMatter.steps)
            throw new Error("Ingredients are missing!")
        
        if (!Array.isArray(frontMatter.steps))
            throw new Error("Ingredients are not an array!")

        const steps: RecipeStepProps[] = []
        for (const step of frontMatter.steps) {
            steps.push(this.parseStep({ raw: step }))
        }

        if (!frontMatter.time || typeof frontMatter.time !== "object")
            throw new Error("Recipe time is missing or not an object!")

        const time = this.parseTime({ raw: frontMatter.time as Record<string, unknown> })

        if (!frontMatter.type || typeof frontMatter.type !== "string")
            throw new Error("Recipe type is missing or is not a string!")

        if (!frontMatter.source || typeof frontMatter.source !== "string")
            throw new Error("Recipe source is missing or is not a string!")

        return {
            id: frontMatter.id,
            name: frontMatter.name,
            ingredients: ingredients,
            steps: steps,
            time: time,
            type: frontMatter.type,
            source: frontMatter.source,
        }
    }

    // toPersistence(data: PersistedRecipe): string {}
}