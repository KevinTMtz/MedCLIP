import { Model } from 'sequelize';

interface IUser extends Model {
  id: number;
  name: string;
  email: string;
  password: string;
}

export default IUser;
