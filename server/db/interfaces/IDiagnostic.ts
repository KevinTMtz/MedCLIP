import { Model } from 'sequelize';

interface IDiagnostic extends Model {
  id: number;
  caseID: number;
  diagnostic: string;
  public: boolean;
  anonymous: boolean;
}

export default IDiagnostic;
