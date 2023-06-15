// @filename: models.ts
import { Models, } from "@rematch/core"
import { Auth } from "./authModel"

export interface RootModel extends Models<RootModel> {
  Auth: typeof Auth
}
const models: RootModel = { Auth }

export default models;