import {JwtHelper} from 'angular2-jwt';


export class SecurityUtility {

    jwtHelper: JwtHelper = new JwtHelper();
    decodedtoken: any;
    availableServices: any;
    servicePrivilege : any;

    currentStatus : Boolean;

    VESSEL_REGISTRATION = "VSSL_RG";
    CLIENT_REGISTRATION = "CLNT_RG";
    TRUCK_REGISTRATION = "TRK_RG";
    VOYAGE_ENQUIRY = "VYG_ENQ";
    CONTAINER_ACCEPTANCE = "CONT_ACC";
    CSH_REGISTRATION = "CONT_SH";
    RESOURCE_BOOKING = "RES_BKNG";
    GIGO = "GIGO";
    HOLD_RELEASE_CONTAINER = "HRC";
    SSR_REGISTRATION = "SSR_RG";
    /*IEBM;
    IDO;
    VYG_ENQ;
    USR_MGMT;

    VSSL_VLDS;
    BRTH_BKNG;*/

    constructor() {

    }

    getPrivilege(item) {
      this.servicePrivilege = JSON.parse(localStorage.getItem('PRIVILEGES'));
      if (item == this.VESSEL_REGISTRATION) {
        this.availableServices = this.servicePrivilege.VSSL_RG;
      } else if (item == this.TRUCK_REGISTRATION) {
        this.availableServices = this.servicePrivilege.TRK_RG;
      } else if (item == this.CLIENT_REGISTRATION) {
        this.availableServices = this.servicePrivilege.CLNT_RG;
      } else if (item == this.VOYAGE_ENQUIRY) {
        this.availableServices = this.servicePrivilege.VYG_ENQ;
      } else if (item == this.CONTAINER_ACCEPTANCE) {
        this.availableServices = this.servicePrivilege.CONT_ACC;
      } else if (item == this.CSH_REGISTRATION) {
        this.availableServices = this.servicePrivilege.CONT_SH;
      } else if (item == this.RESOURCE_BOOKING) {
        this.availableServices = this.servicePrivilege.RES_BKNG;
      } else if (item == this.GIGO) {
        this.availableServices = this.servicePrivilege.GIGO;
      } else if (item == this.HOLD_RELEASE_CONTAINER) {
        this.availableServices = this.servicePrivilege.HRC;
      } else if (item == this.SSR_REGISTRATION) {
        this.availableServices = this.servicePrivilege.SSR_RG;
      }
    }

    canAmend(item) {
        this.currentStatus = false;
        this.getPrivilege(item);
        this.availableServices.forEach((service :string) => {
          if(service.indexOf("_AMND") > -1) {
            this.currentStatus = true;
          }
        });
        return this.currentStatus;
    }

    canCreate(item){
      this.currentStatus = false;
      this.getPrivilege(item);
      this.availableServices.forEach((service :string) => {
        if(service.indexOf("_CRTE") > -1) {
          this.currentStatus = true;
        }
      });
      return this.currentStatus;
    }

    canApprove(item) {
      this.currentStatus = false;
      this.getPrivilege(item);
      this.availableServices.forEach((service :string) => {
        if(service.indexOf("_APPRV") > -1) {
          this.currentStatus = true;
        }
      });
      return this.currentStatus;
    }

    canView(item) {
      this.currentStatus = false;
      this.getPrivilege(item);
      this.availableServices.forEach((service :string) => {
        if(service.indexOf("_VW") > -1) {
          this.currentStatus = true;
        }
      });
      return this.currentStatus;
     }

    canCancel(item) {
      this.currentStatus = false;
      this.getPrivilege(item);
      this.availableServices.forEach((service :string) => {
        if(service.indexOf("_CNCL") > -1) {
          this.currentStatus = true;
        }
      });
      return this.currentStatus;
     }

}
