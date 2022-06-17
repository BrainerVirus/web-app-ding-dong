import db from "../database/db.js";
import { DataTypes } from "sequelize";

const DireccionModel = db.define("direcciones", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  calle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numCalle: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comuna: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default DireccionModel;
