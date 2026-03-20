import { App, FrontMatterCache, TFile } from "obsidian"
import { IStorage } from "./interface"

export class ObsidianStorage implements IStorage {
  constructor(private app: App) {}

  async addFolder(path: string) {
    console.log("addFolder: " + path)
    if (path[0] !== "/") throw Error("Path must be from root!")

    if (this.app.vault.getFolderByPath(path) !== null)
      throw Error(`Path "${path}" already exists`)

    const folders = path
      .split("/")
      .slice(1)
      .reduce((acc: string[], name: string) => {
        if (acc.length === 0) return [name]

        acc.push(`${acc[acc.length - 1]}/${name}`)
        return acc
      }, [])

    for (const folder of folders) {
      try {
        await this.app.vault.createFolder(folder)
      } catch (e) {
        console.log(`Create folder ${folder}: ${e}`)
      }
    }
  }

  async readFile(path: string): Promise<{
    body: string
    frontmatter: FrontMatterCache | undefined
  }> {
    console.log("read: " + path)
    if (path[0] !== "/") throw Error("Path must be from root!")

    const file = this.app.vault.getFileByPath(path)
    if (file === null) throw Error(`File "${path}" does not exists`)

    return {
      body: await this.app.vault.read(file),
      frontmatter: await this.app.metadataCache.getFileCache(file)?.frontmatter,
    }
  }

  async writeFile(path: string, data: string): Promise<TFile> {
    console.log("write: " + path)
    if (path[0] !== "/") throw Error("Path must be from root!")

    if (this.app.vault.getFileByPath(path) !== null)
      throw Error(`File "${path}" exists`)

    return await this.app.vault.create(path, data)
  }

  async updateFile(path: string, data: string): Promise<void> {
    console.log("update: " + path)
    if (path[0] !== "/") throw Error("Path must be from root!")

    const file = this.app.vault.getFileByPath(path)
    if (file === null) throw Error(`File "${path}" does not exists`)

    await this.app.vault.modify(file, data)
  }
}
