/**
 * Что должен делать репозиторий:
 * - Записать рецепт
 * - считать рецепт
 * - изменить рецепт
 */

import { App, TFile, TFolder } from "obsidian";
import { Recipe } from "../../domain/recipe/entity/recipe";
import { RecipeRepository } from "../../domain/recipe/interface/recipeRepository";
import { RecipeMarkdownMapper } from "./recipeMarkdownMapper";
import { RecipeId } from "../../domain/recipe/valueObject/recipeId";

const BASE_PATH = "recipe"

export class ObsidianRecipeRepository implements RecipeRepository {
    constructor(private readonly app: App) {}
    
    async add({ recipe }: { recipe: Recipe }): Promise<void> {
        const data = recipe.toPrimitives()
        const path = this.getFilePathByNameAndType({
            name: recipe.name,
            type: recipe.type
        })

        try {
            await this.app.vault.create(path, JSON.stringify(data))
        } catch {
            throw new Error(`File with name ${recipe.name} already exists!`)
        }
    }

    async save({ recipe }: { recipe: Recipe }): Promise<void> {
        const data = recipe.toPrimitives()
        const path = this.getFilePathByNameAndType({
            name: recipe.name,
            type: recipe.type
        })

        const file = this.app.vault.getFileByPath(path)
        if (file !== null) {
            await this.app.vault.modify(file, JSON.stringify(data))
        } else {
            await this.app.vault.create(path, JSON.stringify(data))
        }
    }

    async findById({ id }: { id: RecipeId }): Promise<Recipe | undefined> {
        /**
         * TODO: Заменить итерацию по папкам 2 уровня на прямую итерацию по категориям
         */
        const recipeRootFolder = this.app.vault.getFolderByPath(BASE_PATH)
        if (!recipeRootFolder) return

        const mapper = new RecipeMarkdownMapper(this.app)

        for (const folder of recipeRootFolder.children) {
            if (!(folder instanceof TFolder)) continue
            
            for (const file of folder.children) {
                if (!(file instanceof TFile)) continue
            
                const frontMatter = this.app.metadataCache.getFileCache(file)?.frontmatter
                if (!frontMatter) continue

                const recipe_id = frontMatter.id as string | undefined
                if (!recipe_id || recipe_id !== id.toString()) continue

                const primitives = mapper.toPrimitives({
                    frontMatter: frontMatter,
                    body: await this.app.vault.read(file)
                })

                return Recipe.rehydrate(primitives)
            }
        }
        return
    }

    async findByName({ name }: { name: string }): Promise<Recipe | undefined> {
        /**
         * TODO: Заменить итерацию по папкам 2 уровня на прямую итерацию по категориям
         */
        const recipeRootFolder = this.app.vault.getFolderByPath(BASE_PATH)
        if (!recipeRootFolder) return

        const mapper = new RecipeMarkdownMapper(this.app)

        for (const folder of recipeRootFolder.children) {
            if (!(folder instanceof TFolder)) continue
            
            for (const file of folder.children) {
                if (!(file instanceof TFile)) continue
            
                const frontMatter = this.app.metadataCache.getFileCache(file)?.frontmatter
                if (!frontMatter) continue

                const recipe_name = frontMatter.name as string | undefined
                if (!recipe_name || recipe_name !== name) continue

                const primitives = mapper.toPrimitives({
                    frontMatter: frontMatter,
                    body: await this.app.vault.read(file)
                })

                return Recipe.rehydrate(primitives)
            }
        }
        return
    }

    getFilePathByNameAndType({ name, type }: { name: string, type: string }): string {
        return `${BASE_PATH}/${type}/${name}`
    }
}