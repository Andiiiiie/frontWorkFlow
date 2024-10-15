export interface ProcessTypeVersion {
  id: number;
  reference: string;
  creationDate: string; // Use string to represent LocalDateTime
  validationDate: string; // Use string to represent LocalDateTime
  state: number;
  processTypeId: number;
  processTypeName: string;
}
