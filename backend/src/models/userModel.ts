import Sequelize from "sequelize";
import SerializedUser from "../../common/SerializedUser"

export default class UserModel extends Sequelize.Model implements SerializedUser {
    public readonly id!: string;
    public password!: string;
    public username!: string;

}

export const init = (sequelize: Sequelize.Sequelize) => {
    UserModel.init({
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    { tableName: "user", sequelize, timestamps: false },
    )
}


export const associate = () => {}