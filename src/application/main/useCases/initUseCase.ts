import { IStorage } from "../../../infra/storage/interface"

// как прокинуть папки сюда из настроек?
const ROOT_FOLDER_NAME = "SousChef"
const RECIPE_FOLDER_NAME = "Recipes"

export class InitUseCase {
  constructor(private storage: IStorage) {}

  private createFolders() {
    const folders = [`/${ROOT_FOLDER_NAME}/${RECIPE_FOLDER_NAME}`]
    for (const folder of folders) {
      try {
        this.storage.addFolder(folder)
      } catch (e) {
        console.log(`Create folder ${folder}: ${e}`)
      }
    }
  }

  execute() {
    this.createFolders()
  }
}
