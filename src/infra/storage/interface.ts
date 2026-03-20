import { FrontMatterCache, TFile, TFolder } from "obsidian"

export interface IStorage {
  addFolder: (path: string) => void
  readFile: (path: string) => Promise<{
    body: string
    frontmatter: FrontMatterCache | undefined
  }>
  writeFile: (path: string, body: string) => Promise<TFile>
  updateFile: (path: string, body: string) => Promise<void>
}
