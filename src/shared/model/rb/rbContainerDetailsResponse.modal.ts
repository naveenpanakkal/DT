export class ContainerDetailsResponseModal {
  acceptedContainers: AcceptedContainers[];
  rejectedContainers: RejectedContainers[];
  message: string;
  containerNo: string;
  isoType: string;
  designation: string;
  tradeType: string;
}

export class AcceptedContainers {
  containerNo: string;
  isoType: string;
  designation: string;
  tradeType: string;
  isSelected:string;
  selected:boolean;
  rsbContainerId:number;
}

export class RejectedContainers {

}
export class ContainerMasterResponse{
  list: AcceptedContainers[];
}