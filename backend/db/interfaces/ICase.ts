import { Model } from 'sequelize';

interface ICase extends Model {
  id: number;
  userId: number;
  diagnosticId: number;
  caseName: string;
  caseDescription: string;
  patientName: string;
  patientBirthDate: Date;
  patientSex: string;
  patientWeight: number;
  imageURL: string;
}

export default ICase;
