export interface ProcessFollower {
  id: number;
  idProcess: number;
  idTask: number;
  idNextTask: number;
  taskName: string;
  idResultType: number;
  resultTypeName: string;
  followUpDate: string; // Use string to match the ISO date format
  ending: boolean;
  taskDone: boolean;
}
