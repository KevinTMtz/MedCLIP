export interface PatientCaseData {
  caseName: string;
  caseDescription: string;
  patientName: string;
  patientBirthDate: Date | null;
  patientSex: string;
  patientWeight: number;
  imageURL: string | undefined;
  id?: string;
  diagnosticId?: string;
}

export interface DiagnosticData {
  id: number;
  diagnosis: string;
  isPublic: boolean;
  isAnonymous: boolean;
}
