import { DataTypes, Model, Optional } from 'sequelize';
import db from '../connection';

interface UserInterface extends Model {
  id: number;
  name: string;
}

const User = db.define<UserInterface>('User', {
  id: {
    type: DataTypes.UUID,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
});

export default User;
