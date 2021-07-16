const { DataTypes } = require('sequelize');
const { all } = require('../app');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  return sequelize.define('type', {
    name: {
      type: DataTypes.STRING
    },
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    }
  })
}