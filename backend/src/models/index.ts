import db from "../initializers/sequelize"
import IHitModel from "./hitModel"

interface Models {
    HitModel: typeof IHitModel;
}

export default (db.models as unknown) as Models;
module.exports = db.models;