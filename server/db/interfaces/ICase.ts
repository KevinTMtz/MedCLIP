import { Model } from 'sequelize';

interface ICase extends Model {
  id: number;
  userID: number;
  diagnosticID: number;
  name: string;
  description: string;
  patientName: string;
  patientBirthDate: Date;
  patientSex: string;
  patientWeight: number;
  imageURL: string;
}

export default ICase;
