export interface ProcessHistory {
  id: number;
  processId: number;
  requestReference: string;
  taskId: number;
  taskName: string;
  resultTypeId: number;
  resultTypeName: string;
  startingTime: string; // Use string to represent LocalDateTime
  endingTime: string; // Use string to represent LocalDateTime
  actual: boolean;
}
