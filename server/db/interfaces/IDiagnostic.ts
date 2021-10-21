import { Model } from 'sequelize';

interface IDiagnostic extends Model {
  id: number;
  diagnosis: string;
  public: boolean;
  anonymous: boolean;
}

export default IDiagnostic;
