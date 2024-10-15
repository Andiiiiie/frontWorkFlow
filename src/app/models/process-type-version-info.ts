import {ProcessTypeVersion} from "./process-type-version";
import {Step} from "./step";
import { Task } from "./task";

export interface ProcessTypeVersionInfo {
  processTypeVersion: ProcessTypeVersion;
  listStep:Step[];
  listTask:Task[][];
}
