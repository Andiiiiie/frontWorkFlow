export interface ExceptionResult {
  id: number;
  resultTypeId: number;
  resultTypeName: string;
  currentTaskName: string;
  currentTaskId: number;
  nextTaskName: string;
  nextTaskId: number;
  isLastInProcess: boolean;
  isLastInStep: boolean;
}
