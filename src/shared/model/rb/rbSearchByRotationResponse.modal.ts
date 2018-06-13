export class SearchByRotationResponseModal {
  rotationNumber: number;
  vesselName: string;
  vesselType: string;
  vesselStatus: string;
  terminalOperator: string;
  prefBerth: any;
  eta: string;
  rotationNo: number;
  locationVessel: string;
  locationContainer: string;
  remarksVessel: any;
  cutOffTime: string;
  terminals: string[];
  terminalNames: string[];
  terminalDependents: RBTerminalModal[];

}

export class RBTerminalModal {
  terminal : RBTerminalOperatorModal[];
}

export class RBTerminalOperatorModal {
  terminalOperator: string;
  prefBerth: string;
}
