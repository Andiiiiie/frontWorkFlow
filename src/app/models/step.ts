export interface Step {
  id: number;
  name: string;
  description: string;
  order: number;
  processTypeVersionId: number;
  processTypeVersionReference: string;
  state: number;
}
