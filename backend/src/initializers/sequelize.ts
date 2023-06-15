
import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";

const modelsPath = path.join(__dirname, "..", "models");

const db = new Sequelize('default_database', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
});

const ignoreList = ["index.ts", "index.js"];
const associators: Array<any> = [];

fs.readdirSync(modelsPath)
    .filter((file) => file.indexOf(".") !== 0 && !ignoreList.includes(file))
    .forEach((file) => {
        const { associate, init } = require(path.join(modelsPath, file));

        init(db, DataTypes);
        associators.push(associate);
    });

associators.forEach((associate) => {
    associate(db.models);
});

export default db;