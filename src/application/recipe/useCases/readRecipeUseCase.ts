import { IRecipeRepository } from "domain/recipe/interface/recipeRepository"
import { ReadRecipeDTO } from "../dto/readRecipeDTO"

export class ReadRecipeUseCase {
  constructor(private readonly repository: IRecipeRepository) {}

  async execute(path: string): Promise<ReadRecipeDTO> {
    const recipe = await this.repository.read({ path })
    if (recipe === undefined) {
      throw Error(`Something wrong while trying to read recipe ${name}`)
    }
    return recipe.toPrimitives()
  }
}
