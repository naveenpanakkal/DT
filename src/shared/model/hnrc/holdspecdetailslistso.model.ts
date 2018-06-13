export class HoldSpecificationDetailsSO {
    containerNo: string;
    containerPrefix: string;
    containerRangeFrom: string;
    containerSize: string;
    containerrangeTo: string;
    errorList: string;
    iSOCode: string;
    iSOCodeContainerNo: string;
    imoNumber: string;
    incrementRotationNumber: string;
    isExclude: string;
    lineHold: string;
    locationHold: string;
    shippingStatus: string;
    statusHold: string;
}

export class HoldSpecDetailsListSO {
  list: HoldSpecificationDetailsSO[];
}
