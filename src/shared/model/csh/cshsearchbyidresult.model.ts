import { CSHBaseInfoAttachModel} from './cshbaseinfoattach.model';
import { CSHCountDetailsModel} from './cshcountdetails.model';
import { CSHHazardousContainerModel} from './cshhazardouscontainer.model';
import { CSHOOGContainerModel} from './cshoogcontainer.model';
import { CSHSpecialHandlingModel} from './cshspecialhandling.model';

export class CSHSearchByIDResultModel{
    action:string;
    agentReferenceNo:string;
    amendRequestStatus:string;
    approverButton:boolean;
    b2bMsgStartRefNo:string;
    b2bRefNumber:string;
    channel:string;
    clientCode:string;
    createdBy:string;
    createdDate:string;
    createdTo:string;
    cshBaseInfoAttach:CSHBaseInfoAttachModel[];
    cshCountDetls:CSHCountDetailsModel[];
    cshHazardousContainer:CSHHazardousContainerModel[];
    cshNo:number;
    cshOOGContainer:CSHOOGContainerModel[];
    cshRequestNo:string;
    cshSpecialHandling:CSHSpecialHandlingModel[];
    ediDocumentIssueDate:string;
    ediMessageReferenceNo:string;
    eta:string;
    etd:string;
    isB2bMessage:string;
    isEdi:string;
    isSelected:string;
    lastModifiedDate:string;
    pendingStatus:boolean;
    rejectionReason:string;
    requestCutOffTime:string;
    requestNo:string;
    requestStatus:string;
    rotationNumber:number;
    shippingLine:string;
    vesselName:string;
    workFlowStatus:string;
    wrkflwId:string;
}
