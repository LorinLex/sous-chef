import {
  App,
  Editor,
  MarkdownView,
  Modal,
  Notice,
  Plugin,
  PluginManifest,
  WorkspaceLeaf,
} from "obsidian"
import {
  DEFAULT_SETTINGS,
  MyPluginSettings,
  SampleSettingTab,
} from "./settings"
import {
  CreateRecipeView,
  CREATE_RECIPE_VIEW_TYPE,
} from "ui/view/createRecipeView"
import { IRecipeRepository } from "domain/recipe/interface/recipeRepository"
import { ObsidianRecipeRepository } from "infra/repository/obsidian/obsidianRecipeRepository"
import { InitUseCase } from "application/main/useCases/initUseCase"
import { IStorage } from "infra/storage/interface"
import { ObsidianStorage } from "infra/storage/obsidianStorage"

// Remember to rename these classes and interfaces!

const ROOT_FOLDER = "SousChef"
const RECIPE_FOLDER = "Recipes"

export default class SousChef extends Plugin {
  settings: MyPluginSettings
  storage: IStorage
  recipeRepository: IRecipeRepository

  constructor(app: App, manifest: PluginManifest) {
    super(app, manifest)
    this.storage = new ObsidianStorage(app)
    this.recipeRepository = new ObsidianRecipeRepository(
      this.storage,
      `/${ROOT_FOLDER}/${RECIPE_FOLDER}`,
    )
  }

  async onload() {
    await this.loadSettings()
    new InitUseCase(this.storage).execute()

    this.registerView(
      CREATE_RECIPE_VIEW_TYPE,
      (leaf) => new CreateRecipeView(leaf, this.recipeRepository),
    )

    this.addRibbonIcon("dice", "Sample", (evt: MouseEvent) => {
      void this.activateCreateRecipeView()
    })

    this.addSettingTab(new SampleSettingTab(this.app, this))
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_SETTINGS,
      (await this.loadData()) as Partial<MyPluginSettings>,
    )
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }

  async activateCreateRecipeView() {
    const { workspace } = this.app

    const leaves = workspace.getLeavesOfType(CREATE_RECIPE_VIEW_TYPE)

    if (leaves.length > 0 && leaves[0] instanceof WorkspaceLeaf) {
      return await workspace.revealLeaf(leaves[0])
    }

    await workspace.getLeaf("tab").setViewState({
      type: CREATE_RECIPE_VIEW_TYPE,
      active: true,
    })
  }
}
