import {ProcessTypeVersion} from "./process-type-version";
import {Step} from "./step";
import { Task } from "./task";
import {StepInfo} from "./step-info";

export interface ProcessTypeVersionInfo {
  processTypeVersion: ProcessTypeVersion;
  listStep:StepInfo[];
}
