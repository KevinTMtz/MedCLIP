import { DataTypes } from 'sequelize';
import db from '../connection';

import IDiagnostic from '../interfaces/IDiagnostic';

const Diagnostic = db.define<IDiagnostic>('Diagnostic', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  diagnosis: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isAnonymous: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export default Diagnostic;
