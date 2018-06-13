import {VesselWFTaskVariableModel} from "./vesselwftaskvariable.model";
import {VesselWFProcessVariableModel} from "./vesselwfprocessvariable.model";

export class VesselWFResultModel {
    claimTime: string;
    name: string;
    assignee: string;
    remarks: string;
    taskVariable: VesselWFTaskVariableModel;
    processVariable: VesselWFProcessVariableModel;
}
