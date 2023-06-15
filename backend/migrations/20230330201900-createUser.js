module.exports = {
    /**
     * @param {import("sequelize").QueryInterface} queryInterface
     * @param {typeof import("sequelize")} Sequelize
     * @ignore
     */
    up: (queryInterface, Sequelize) =>
        queryInterface
            .createTable("user", {
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
            }),
    down: (queryInterface) => queryInterface.dropTable("user"),
};
