// staging
export const BASE_URL = 'http://staging.mawani.trade/';

// sit
// export const BASE_URL = 'http://sit.mawani.trade/';
export const AUTH_URL = BASE_URL + 'uaa/oauth/token';


//Common services
export const DOWNLOAD_FILE = BASE_URL + "common/download";
export const TRUCK_UPLOAD_FILE = BASE_URL + "common/upload/TRUCK_REG";
export const IDO_UPLOAD_FILE = BASE_URL + "common/upload/IDO_FILES";
export const TRUCK_COUNTRY_MASTER = BASE_URL + "truck/COUNTRY_MASTER";
export const CA_UPLOAD_FILE = BASE_URL + "common/upload/CA_FILES";
export const TA_FILES = BASE_URL + "common/upload/TA_FILES";
export const GIGO_UPLOAD_FILES = BASE_URL + "common/upload/GiGo";
export const DEFINED_SET = BASE_URL + "common/getDefinedSetValuesForNames";
export const SIGNUP_LINK = BASE_URL + "open/signup.html";
export const FORGOT_PASSWD_LINK = BASE_URL + "open/forgotpassword";

//Vessel services
export const SEARCH_VESSEL_REG_URL = BASE_URL + 'vessel/searchVesselRegistered';
export const SEARCH_VESSEL_BY_ID_URL = BASE_URL + 'vessel/searchById';
export const SEARCH_VESSEL_BY_WORKFLOWID_URL = BASE_URL + 'vessel/getAllTasks';
export const VESSEL_HISTORY_URL = BASE_URL + 'vessel/getHistory';
export const VESSEL_EXECUTE_ACTION = BASE_URL + 'vessel/executeAction';
export const VESSEL_SEARCH_APPROVAL_IMO = BASE_URL + "vessel/searchApprovedImo";
export const VESSEL_COMPARISON_URL = BASE_URL + 'vessel/compareById';

//Truck services
export const SEARCH_TRUCK_REGISTERED_URL = BASE_URL + 'truck/searchTruckRegistered';
export const TRUCK_SEARCH_BY_ID_URL = BASE_URL + 'truck/searchById';
export const SEARCH_TRUCK_BY_WORKFLOWID_URL = BASE_URL + 'truck/getAllTasks';
export const TRUCK_HISTORY_URL = BASE_URL + 'truck/getHistory';
export const TRUCK_CREATE_URL = BASE_URL + 'truck/saveTruckReg';
export const TRUCK_SEARCH_FOR_REG = BASE_URL + 'truck/searchTruckForRegistration';
export const TRUCK_EDIT_URL = BASE_URL + 'truck/saveModifiedTruckReg';
export const TRUCK_ADMIN_EDIT_URL = BASE_URL + 'truck/saveExpiryDate';
export const TRUCK_COMPARISON_URL = BASE_URL + 'truck/compareById';
export const TRUCK_EXECUTE_ACTION = BASE_URL + 'truck/executeAction';
export const TRUCK_MULTIPLE_EXIST = BASE_URL + 'truck/checkMutlipleTruckExist';
export const TRUCK_DOCUMENT_MASTER = BASE_URL + "truck/DOCUMENT_MASTER";
//owner check  truck service owner check
export const TRUCK_OWNER_CHECK = BASE_URL + 'truck/getOwnerDetails';
//truck cancel service
export const TRUCK_CANCEL = BASE_URL + "truck/deleteById";

//berthenquiry services
export const SEARCH_BERTH_REG_URL =  BASE_URL + 'berthbooking/searchBerthRegistered';
export const SEARCH_BERTH_BY_NO_URL =  BASE_URL + 'berthbooking/searchById';
export const BERTH_HISTORY_URL = BASE_URL + 'berthbooking/getHistory';
export const SEARCH_BERTH_WORKFLOWID_URL = BASE_URL + 'berthbooking/getAllTasks';
export const BERTH_COMPARISON_URL = BASE_URL + 'berthbooking/compareById';
export const BERTH_EXECUTE_ACTION = BASE_URL + 'berthbooking/executeAction';
export const BERTH_CANCEL = BASE_URL + 'berthbooking/cancelBerth';
export const BERTH_DELETE_BY_ID = BASE_URL + 'berthbooking/deleteById';
export const BERTH_CLIENT_MASTER=BASE_URL +'berthbooking/CLIENT_MASTER';
export const BERTH_SHIPPING_MASTER=BASE_URL +'berthbooking/SHIPPING_MASTER';
export const BERTH_TERMINAL_MASTER=BASE_URL+'berthbooking/TERMINAL_MASTER_DATA';

//Delivery Order services
export const DO_PORT_MASTER = BASE_URL + "containerenquiry/PORT_MASTER";
export const BOX_OPERATOR_MASTER = BASE_URL + 'containerenquiry/BOX_OPERATOR_MASTER';
export const TERMINAL_MASTER = BASE_URL + 'containerenquiry/TERMINAL_MASTER';
export const ROTATION_MASTER = BASE_URL + 'containerenquiry/ROTATION_NUMBER_MASTER';
export const ROTATION_INFO_MASTER = BASE_URL + 'containerenquiry/ROTATION_INFO_MASTER';
export const MRN_MASTER = BASE_URL + 'containerenquiry/MRN_NUMBER_MASTER';
export const HBIOL_MASTER = BASE_URL + 'containerenquiry/HBIOL_NUMBER_MASTER';
export const BIOL_MASTER = BASE_URL + 'containerenquiry/BIOL_NUMBER_MASTER';
export const EDIT_DO = BASE_URL + 'containerenquiry/saveModifiedDO';
export const FRIEGHT_FORWARDER_CODE = BASE_URL + 'containerenquiry/FRIEGHT_FORWARDER_CODE';
export const CHA_CODE = BASE_URL + 'containerenquiry/CHA_CODE';
export const CFS_CODE = BASE_URL + 'containerenquiry/CFS_CODE';
export const EMPTY_YARD_CODE = BASE_URL + 'containerenquiry/EMPTY_YARD_CODE';
export const HAULIER_CODE = BASE_URL + 'containerenquiry/HAULIER_CODE';
export const CONSIGNEE_CODE = BASE_URL + 'containerenquiry/CONSIGNEE_CODE';
export const SEARCH_DELIVERY_ORDER = BASE_URL + 'containerenquiry/searchDeliveryOrder';
export const SEARCH_DO_BY_ID = BASE_URL + 'containerenquiry/searchById';
export const GET_HISTORY = BASE_URL + 'containerenquiry/getHistory';
export const DO_RETRIVE_VALIDATE = BASE_URL + 'containerenquiry/doRetriveValidate';
export const IMPORT_RETRIVE = BASE_URL + 'containerenquiry/importRetrive';
export const CONTAINER_RETRIVE = BASE_URL + 'containerenquiry/containerRetrieve';
export const CANCEL_DO = BASE_URL + 'containerenquiry/deleteById';
export const VERIFY_HBNO = BASE_URL + 'containerenquiry/verifyHouseBillNoAlrdyExists';
export const VERIFY_BNO = BASE_URL + 'containerenquiry/verifyBillNoAlrdyExists';
export const VERIFY_ROTATION_NO = BASE_URL + 'containerenquiry/verifyValidRotationNo';
export const VERIFY_IGMMRN_NO = BASE_URL + 'containerenquiry/verifyValidIGMMRNNo';
export const VERIFY_AGENT_REF = BASE_URL + 'containerenquiry/verifyAgentRefNoAlrdyExists';
export const SAVE_DELIVERY_ORDER = BASE_URL + 'containerenquiry/saveDeliveryOrder';
export const CONTAINER_DETAILS_MASTER = BASE_URL + 'containerenquiry/CONTAINER_DETAILS_MASTER';
export const PRINT_DELIVERY_ORDER = BASE_URL + 'containerenquiry/printDelOrderReport?';
export const RELEASE_LOCATION_MASTER = BASE_URL + 'containerenquiry/RELEASE_LOCATION_MASTER';
export const SEARCH_HOLD_RELEASE = BASE_URL +  'containerenquiry/searchHoldReleaseDtls';

//Voyage services
export const VOYAGE_INIT=BASE_URL+'common/getDefinedSetValuesForNames';
export const VOYAGE_SEARCH_REQUEST=BASE_URL+'berthbooking/searchVoyageEnquiry';
export const VOYAGE_SEARCH_BY_ID=BASE_URL+'berthbooking/searchVoyageById';
export const VOYAGE_SEARCH_LOCATION_MASTER=BASE_URL+'berthbooking/ServiceProviderLocationsMasterValue';

//Open Voyage Services
export const VOYAGE_OPEN_INIT=BASE_URL+'open/getDefinedSetValuesForNames';
export const VOYAGE_OPEN_SEARCH_REQUEST=BASE_URL+'open/searchVoyageEnquiryPre';
export const VOYAGE_OPEN_SEARCH_BY_ID=BASE_URL+'open/searchVoyageByIdPre';
export const VOYAGE_OPEN_SEARCH_LOCATION_MASTER=BASE_URL+'open/ServiceProviderLocationsMasterValue';

//container acceptance services
export const CA_LOCATION_MASTER = BASE_URL + 'containeracceptance/LOCATION_MASTER';
export const CA_SP_NAME_MASTER = BASE_URL + 'containeracceptance/SP_NAME_MASTER';
export const CA_BOX_OPERATOR_MASTER = BASE_URL + 'containeracceptance/BOX_OPERATOR_MASTER';
export const CA_ROTATION_NUMBER_MASTER = BASE_URL + 'containeracceptance/ROTATION_NUMBER_MASTER';
export const CA_ISO_CODE = BASE_URL + 'containeracceptance/ISO_CODE';
export const CA_VERIFY_ROTATION_NUMBER = BASE_URL + 'containeracceptance/verifyValidRotationNo';
export const CA_VERIFY_BOOKING_NO = BASE_URL + 'containeracceptance/verifyBookingNoAlrdyExists';
export const CA_VERIFY_CONTAINER_NO = BASE_URL + 'containeracceptance/verifyContainerNoAlrdyExists';
export const CA_PORT_TERMINAL_BERTH_MASTER = BASE_URL + 'containeracceptance/PORT_TERMINAL_BERTH_MASTER';
export const CA_CLIENT_CODE = BASE_URL + 'containeracceptance/CLIENT_CODE';
export const CA_SAVE = BASE_URL + 'containeracceptance/saveContainerAcceptance';
export const CA_SEARCH = BASE_URL + 'containeracceptance/searchContainerAcceptance';
export const CA_SEARCHBYID = BASE_URL + 'containeracceptance/searchById';
export const CA_EDITREQUEST = BASE_URL + 'containeracceptance/saveModifiedCA';
export const CA_HISTORY = BASE_URL + 'containeracceptance/getHistory';
export const CA_CANCEL = BASE_URL + 'containeracceptance/deleteById';
export const CA_PRINT = BASE_URL + 'containeracceptance/printAcceptanceReport?';

//VLDS
export const VLDS_SEARCH_ALL = BASE_URL + 'containerenquiry/searchALL';
export const VLDS_SEARCH_BY_ID = BASE_URL + 'containerenquiry/vldsSearchById';
export const VLDS_SEND_MAIL = BASE_URL + 'containerenquiry/sendingMail';
export const VLDS_DEFINED_VALUES = BASE_URL + 'common/getDefinedSetValuesForNames';
export const VLDS_DOWNLOAD_DOCUMENT = BASE_URL + 'containerenquiry/generatedischargeReport?';

//SSS
export const SSS_SEARCH_ALL = BASE_URL + 'shippingServiceSchedule/search';
export const SSS_SEARCH_BY_ID = BASE_URL + 'shippingServiceSchedule/searchById';
export const SSS_LOCATION_MASTER = BASE_URL + 'shippingServiceSchedule/getServiceProvider';
export const SSS_HISTORY = BASE_URL + 'shippingServiceSchedule/getHistory';
export const SSS_SEARCH_BY_REQUEST_ID= BASE_URL + 'shippingServiceSchedule/searchByRequestId';
export const SEARCH_SSS_WORKFLOWID_URL = BASE_URL + 'shippingServiceSchedule/getAllTasks';
export const SSS_EXECUTE_ACTION = BASE_URL + 'shippingServiceSchedule/executeAction';
export const SSS_IS_APPROVED = BASE_URL + 'shippingServiceSchedule/isRequestApproved';
export const SSS_DOWNLOAD = BASE_URL + 'shippingServiceSchedule/generateSSSReport?';
export const SSS_VESSEL_NAME = BASE_URL + 'shippingServiceSchedule/VESSEL_NAME';
export const SSS_COMPARISON_URL = BASE_URL + 'shippingServiceSchedule/compareById';

///CSH
export const CSH_SEARCH_ALL = BASE_URL + 'containerspecialhandling/searchCSHRegistered';
export const CSH_ROTATION_MASTER = BASE_URL + 'containerspecialhandling/ROTATION_ETA_MASTERS';
export const CSH_CONTAINER_DETAILS = BASE_URL + 'containerspecialhandling/getContainerDetails';

export const CSH_SEARCH_BY_ID_DETAILS = BASE_URL + 'containerspecialhandling/searchById';
export const CSH_HISTORY = BASE_URL + 'containerspecialhandling/getHistory';
export const CSH_COMPARISON = BASE_URL + 'containerspecialhandling/compareById';
export const SEARCH_CSH_WORKFLOWID_URL = BASE_URL + 'containerspecialhandling/getAllTasks';
export const CSH_UPLOAD_FILE = BASE_URL + "common/upload/CSHBaseInfo";
export const CSH_CREATE = BASE_URL + "containerspecialhandling/saveCSHReg";
export const CSH_EDIT = BASE_URL + "containerspecialhandling/saveModify";
export const CSH_ACTION = BASE_URL + "containerspecialhandling/executeAction";
export const SPECAIL_CONTAINER = BASE_URL + "containerspecialhandling/SPECIAL_CONTAINER";
export const CANCEL_CONTAINER_DETAILS = BASE_URL + "containerspecialhandling/cancelContainerDetails";

export const TA_SEARCH = BASE_URL + "truckappointment/searchTruckAppointment";
export const TA_SEARCHBYID = BASE_URL + "truckappointment/searchTaById";
export const TA_CANCEL = BASE_URL + "truckappointment/deleteById";
export const TA_HISTORY = BASE_URL + "truckappointment/getHistory";
export const TA_LOCATION_MASTER = BASE_URL + 'truckappointment/LOCATION_MASTER';
export const TA_SP_NAME_MASTER = BASE_URL + 'truckappointment/SP_NAME_MASTER';
export const TA_ADD_CONTAINER = BASE_URL + "truckappointment/addContainer";
export const TA_ADD_QUANTITY = BASE_URL + "truckappointment/addQuantity";
export const TA_VERIFY_AGENT_NO = BASE_URL + "truckappointment/verifyAgentNoAlrdyExists";
export const TA_VALID_DAYS_CAL = BASE_URL + "truckappointment/VALID_DAYS_CAL";
export const TA_AMEND = BASE_URL + "truckappointment/saveModifiedTA";
export const TA_CREATE = BASE_URL + "truckappointment/saveTruckAppointment";
export const TA_PRINT = BASE_URL + "truckappointment/generateTAPrint?&";
export const TA_TIME_SLOT = BASE_URL + "truckappointment/timeSlotDetails";
export const TA_GET_CONTAINER_COUNT = BASE_URL + "truckappointment/getContainerCount";
export const TA_TRUCK_MASTERS_FULL = BASE_URL + "truckappointment/TRUCK_MASTERS_FULL";
export const TA_TRUCK_MASTERS = BASE_URL + "truckappointment/TRUCK_MASTERS";
export const TA_DRIVER_MASTER = BASE_URL + "truckappointment/DRIVER_MASTER";
export const TA_DRIVER_MASTER_SEARCH = BASE_URL + "truckappointment/DRIVER_MASTER_SEARCH";
export const TA_COMPANY_CODE_TRANS = BASE_URL + "truckappointment/COMPANY_CODE_TRANS";
export const TA_TRUCK_SEARCH = BASE_URL + "truckappointment/TRUCK_SEARCH";
export const TA_SHIPPING_LINE = BASE_URL + "truckappointment/COMPANY_CODE_SL";
export const TA_ROTATION_MASTERS = BASE_URL + "truckappointment/ROTATION_MASTERS";
//Resource booking
export const RB_SERVICE_PROVIDER = BASE_URL + "resourcebooking/getServiceProvider";
export const RB_SEARCH_TERMINAL = BASE_URL + "resourcebooking/searchTerminalByServiceProvider";
export const RB_LOAD_TERMINAL = BASE_URL + "resourcebooking/loadDefaultTerminalsByUser";
export const RB_RESOURCE_MASTER = BASE_URL + "resourcebooking/RESOURCE_MASTER";
export const RB_SEARCHBYID = BASE_URL + "resourcebooking/searchById";
export const RB_CONTAINER_DETAILS = BASE_URL + "resourcebooking/getContainerDetailsByContainerNO";
export const RB_EXPORT_CONTAINER_DETAILS = BASE_URL + "resourcebooking/getExportContainerDetailsByContainerNO";
export const RB_TS_CONTAINER_DETAILS = BASE_URL + "resourcebooking/getTSContainerDtlsByContainerNo";
export const RB_SEARCHRESULT = BASE_URL + "resourcebooking/searchResBooked";
export const RB_ROTATION_MASTER = BASE_URL + "resourcebooking/ROTATION_MASTERS";
export const RB_SEARCH_BY_ROTATION_NUMBER = BASE_URL + "resourcebooking/searchTerminalByRotationNO";
export const RB_HISTORY = BASE_URL + "resourcebooking/getHistory";
export const RB_WORKFLOW = BASE_URL + "resourcebooking/getAllTasks";
export const RB_SEARCHBYREQID = BASE_URL + "resourcebooking/searchByRequestId";
export const RB_VALIDATECONTAINERS = BASE_URL + "resourcebooking/validateContainerResources";
export const RB_UPDATERB = BASE_URL + "resourcebooking/updateResourceBooking";
export const RB_SAVE_RESOURCE_BOOKING = BASE_URL + "resourcebooking/saveResourceBooking";
export const RB_UPLOAD_FILE = BASE_URL + "common/upload/RESOURCE_BOOKING";
export const RB_WORKFLOWID_URL = BASE_URL + 'resourcebooking/getAllTasks';
export const RB_DO_MASTER = BASE_URL + 'resourcebooking/DO_MASTERS';
export const RB_CA_MASTER = BASE_URL + 'resourcebooking/CA_MASTERS';
export const RB_ACTION = BASE_URL + "resourcebooking/executeAction";
export const RB_CONTAINER_MASTER = BASE_URL + "resourcebooking/CONTAINER_MASTERS";
export const RB_CANCEL = BASE_URL + "resourcebooking/deleteById";


export const GIGO_SEARCH_ALL = BASE_URL + 'gateingateout/gigoSearchALL';
export const GIGO_LOCATION_MASTER = BASE_URL + 'gateingateout/LOCATION_MASTER';
export const GIGO_SP_NAME_MASTER = BASE_URL + 'gateingateout/SP_NAME_MASTER';
export const GIGO_SEARCH_BY_ID = BASE_URL + 'gateingateout/searchById';
export const GIGO_GET_HISTORY = BASE_URL + 'gateingateout/gigoGetHistory';
export const GIGO_SAVE_MODIFY = BASE_URL + 'gateingateout/saveModify';
export const GIGO_DELETE_BY_ID = BASE_URL + 'gateingateout/deleteById';
export const GIGO_VERIFY_REFNO = BASE_URL + 'gateingateout/verifyRefNoAlrdyExists';
export const GIGO_MOVEMENT_LOG = BASE_URL + 'gateingateout/gigoMovementLog';
export const GIGO_SAVE_REG = BASE_URL + 'gateingateout/saveGIGOReg';
export const GIGO_SEND_MAIL = BASE_URL + 'gateingateout/sendingMail';
export const GIGO_DOWNLOAD_DOCUMENT = BASE_URL + 'gateingateout/generateGIGOReport?';

//Hold & Container Release
export const HRC_LOCATION_MASTER = BASE_URL + "holdreleasecontainer/HRC_LOCATION_MASTER";
export const HRC_CONFIGRD_HRS = BASE_URL + "holdreleasecontainer/HRC_CONFIGRD_HRS";
export const HRC_SEARCH = BASE_URL + "holdreleasecontainer/HRC_SEARCH";
export const HRC_SEARCH_BY_ID = BASE_URL + "holdreleasecontainer/HRC_SEARCH_BY_ID";
export const HRC_SP_NAME_MASTER = BASE_URL + "holdreleasecontainer/HRC_SP_NAME_MASTER";
export const HRC_LINE_MASTER = BASE_URL + "holdreleasecontainer/HRC_LINE_MASTER";
export const HRC_HISTORY = BASE_URL + "holdreleasecontainer/HRC_HISTORY";

export const HRC_SEARCHHOLDRELEASE_DTLS = BASE_URL + "holdreleasecontainer/searchHoldReleaseDtls";
export const HRC_SEARCHHOLDRELEASE_DTLS_2 = BASE_URL + "containerenquiry/searchHoldReleaseDtls";

export const HRC_REF_NO = BASE_URL + "holdreleasecontainer/HRC_REF_NO";
export const HRC_SEARCH_CONTAINER = BASE_URL + "holdreleasecontainer/HRC_SEARCH_CONTAINER";
export const HRC_SAVE_MODIFIED = BASE_URL + "holdreleasecontainer/HRC_SAVE_MODIFIED";
export const HRC_SAVE_HOLDDETAILS = BASE_URL + "holdreleasecontainer/HRC_SAVE_HOLDDETAILS";
export const HRC_DELETE_BY = BASE_URL + "holdreleasecontainer/HRC_DELETE_BY";
export const HNRC_FILES = BASE_URL + "common/upload/HRC_FILES";


//HNRC
export const HNRC_DOWNLOAD_DOCUMENT = BASE_URL + '/containerenquiry/generateReleaseReport?';
export const SAVE_RELEASE_DETAILS = BASE_URL + '/containerenquiry/saveReleaseDetails';
export const HRC_ISO_CODE = BASE_URL + '/holdreleasecontainer/HRC_ISO_CODE';

//Special services request
export const SEARCH_SPECIAL_SERVICES_BY_ID = BASE_URL + 'specialservice/searchById';
export const SEARCH_SPECIAL_SERVICES = BASE_URL + 'specialservice/searchAllSpecialService';
export const SPECIAL_SUB_SERVICE_TYPE = BASE_URL + 'specialservice/SPECIAL_SUB_SERVICE_TYPE'
export const SSR_HISTORY = BASE_URL + 'specialservice/getHistory';
export const SSR_SP_MASTER = BASE_URL + '/specialservice/SERVICE_PROVIDER_MASTER';
export const LOCATION_TERMINAL_MASTER = BASE_URL + '/specialservice/LOCATION_TERMINAL_MASTER';
export const SPECIAL_SERVICE_TYPE = BASE_URL + '/specialservice/SPECIAL_SERVICE_TYPE';
export const SSR_WORKFLOWID_URL=BASE_URL + '/specialservice/getAllTasks';
export const SSR_ACTION=BASE_URL + '/specialservice/executeAction';
export const SSR_CANCEL=BASE_URL + '/specialservice/cancelSpecialService';
//YISR
export const YISR_SEARCH_ALL = BASE_URL + 'yardinventory/search';
export const YISR_GET_CLIENTDETAILS = BASE_URL + 'yardinventory/getClientDetails';
