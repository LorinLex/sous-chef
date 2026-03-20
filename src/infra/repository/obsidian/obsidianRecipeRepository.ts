/**
 * Что должен делать репозиторий:
 * - Записать рецепт
 * - считать рецепт
 * - изменить рецепт
 */

import { App, stringifyYaml, TFile, TFolder } from "obsidian"
import { Recipe } from "../../../domain/recipe/entity/recipe"
import { IRecipeRepository } from "../../../domain/recipe/interface/recipeRepository"
import { RecipeMarkdownMapper } from "../../mapper/recipeMarkdownMapper"
import { RecipeId } from "../../../domain/recipe/valueObject/recipeId"
import { IStorage } from "infra/storage/interface"

const EXT = ".recipe.md"

export class ObsidianRecipeRepository implements IRecipeRepository {
  constructor(
    private readonly storage: IStorage,
    private readonly recipeFolderPath: string,
  ) {}

  private buildRecipe({ recipe }: { recipe: Recipe }): string {
    const data = recipe.toPrimitives()

    return (
      "---\n" +
      `${stringifyYaml(data)}` +
      "\n---\n" +
      `# ${data.name}\n\n` +
      "## Ingredients\n\n" +
      data.ingredients
        .map(
          (ingredient) =>
            `- ${ingredient.name} ` +
            `- ${ingredient.quantity} ${ingredient.isLiquid ? "ml" : "g"}`,
        )
        .join("\n") +
      "\n" +
      "## Steps\n\n" +
      data.steps
        .sort((a, b) => (a.order < b.order ? -1 : a.order > b.order ? 1 : 0))
        .map((step, i) => `${i + 1}. ${step.text}`)
        .join("\n") +
      "\n"
    )
  }

  private getRecipeFileName({ name }: { name: string }): string {
    return `${this.recipeFolderPath}/${name}${EXT}`
  }

  async add({ recipe }: { recipe: Recipe }): Promise<void> {
    const data = await this.storage.writeFile(
      this.getRecipeFileName({ name: recipe.name }),
      this.buildRecipe({ recipe }),
    )
  }

  async save({ recipe }: { recipe: Recipe }): Promise<void> {
    this.storage.updateFile(
      this.getRecipeFileName({ name: recipe.name }),
      this.buildRecipe({ recipe }),
    )
  }

  // async findById({ id }: { id: RecipeId }): Promise<Recipe | undefined> {
  //   /**
  //    * TODO: Заменить итерацию по папкам 2 уровня на прямую итерацию по категориям
  //    */
  //   const app: obsidian.App
  //   const recipeRootFolder = app.vault.getFolderByPath(BASE_PATH)
  //   // if (!recipeRootFolder) return

  //   const mapper = new RecipeMarkdownMapper()

  //   for (const folder of recipeRootFolder.children) {
  //     if (!(folder instanceof TFolder)) continue

  //     for (const file of folder.children) {
  //       if (!(file instanceof TFile)) continue

  //       const frontMatter =
  //         this.app.metadataCache.getFileCache(file)?.frontmatter
  //       if (!frontMatter) continue

  //       const recipe_id = frontMatter.id as string | undefined
  //       if (!recipe_id || recipe_id !== id.toString()) continue

  //       const primitives = mapper.toPrimitives({
  //         frontMatter: frontMatter,
  //         body: await this.app.vault.read(file),
  //       })

  //       return Recipe.rehydrate(primitives)
  //     }
  //   }
  //   return
  // }

  // async findByName({ name }: { name: string }): Promise<Recipe | undefined> {
  //   /**
  //    * TODO: Заменить итерацию по папкам 2 уровня на прямую итерацию по категориям
  //    */
  //   const recipeRootFolder = this.app.vault.getFolderByPath(BASE_PATH)
  //   if (!recipeRootFolder) return

  //   const mapper = new RecipeMarkdownMapper(this.app)

  //   for (const folder of recipeRootFolder.children) {
  //     if (!(folder instanceof TFolder)) continue

  //     for (const file of folder.children) {
  //       if (!(file instanceof TFile)) continue

  //       const frontMatter =
  //         this.app.metadataCache.getFileCache(file)?.frontmatter
  //       if (!frontMatter) continue

  //       const recipe_name = frontMatter.name as string | undefined
  //       if (!recipe_name || recipe_name !== name) continue

  //       const primitives = mapper.toPrimitives({
  //         frontMatter: frontMatter,
  //         body: await this.app.vault.read(file),
  //       })

  //       return Recipe.rehydrate(primitives)
  //     }
  //   }
  //   return
  // }
}
