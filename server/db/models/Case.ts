import { DataTypes } from 'sequelize';
import db from '../connection';

import ICase from '../interfaces/ICase';
import User from './User';
import Diagnostic from './Diagnostic';

const Case = db.define<ICase>('Case', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientBirthDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  patientSex: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientWeight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  imageURL: {
    type: DataTypes.STRING,
    allowNull: false,
    //TODO: define the default image url
    defaultValue: 'url',
  },
});

Case.belongsTo(User, { as: 'user', foreignKey: { allowNull: false } });

Case.belongsTo(Diagnostic, {
  as: 'diagnostic',
  foreignKey: { allowNull: true },
});

export default Case;
