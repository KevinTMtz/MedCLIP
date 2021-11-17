import { Model } from 'sequelize';

interface IDiagnostic extends Model {
  id: number;
  diagnosis: string;
  isPublic: boolean;
  isAnonymous: boolean;
}

export default IDiagnostic;
