import { Recipe } from "../../../domain/recipe/entity/recipe";
import { RecipeRepository } from "../../../domain/recipe/interface/recipeRepository";
import { CreateRecipeDTO } from "../dto/createRecipeDTO";

export class CreateRecipeUseCase {
    constructor(private readonly repository: RecipeRepository) {}

    async execute({ dto }: { dto: CreateRecipeDTO }) {
        const recipe = Recipe.create(dto)

        await this.repository.add({ recipe })
    }
}