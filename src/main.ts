import {
  App,
  Editor,
  MarkdownView,
  Modal,
  Notice,
  Plugin,
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

// Remember to rename these classes and interfaces!

export default class SousChef extends Plugin {
  settings: MyPluginSettings

  async onload() {
    await this.loadSettings()

    this.registerView(
      CREATE_RECIPE_VIEW_TYPE,
      (leaf) => new CreateRecipeView(leaf),
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
