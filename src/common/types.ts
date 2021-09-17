export interface PatientCaseData {
  caseName: string;
  caseDescription: string;
  patientName: string;
  patientBirthDate: Date | null;
  patientSex: string;
  PatientWeight: number;
  imageURL: string | undefined;
  hasDiagnostic: boolean;
  isPublic: boolean;
}
