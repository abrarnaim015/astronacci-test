"use strict";

const TABLE_NAME = "CategoryContents";
const contentDataSeed = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.ENUM(
          "general",
          "business",
          "entertainment",
          "health",
          "science",
          "sports",
          "technology"
        ),
        allowNull: false,
      },
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      deletedAt: {
        field: "deleted_at",
        type: DataTypes.DATE,
        allowNull: true,
      },
    });

    await Promise.all(
      contentDataSeed.map((data) => {
        return queryInterface.sequelize.query(
          `INSERT INTO "${TABLE_NAME}" (name, created_at, updated_at) VALUES ('${data}', NOW(), NOW())`
        );
      })
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(TABLE_NAME);
  },
};
