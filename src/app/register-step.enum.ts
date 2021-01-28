export enum RegisterStep {
}


export enum LocalRegisterStep {
    GENERAL_INFO_TAB = 'generalInfoActivity',
    GENERAL_INFO_ADDRESS_TAB = 'generalInfoAddress',
    PERSONAL_DETAILS = 'personalDetails',
    COMMUNICATION_METHOD = 'communicationMethod',
    BANK_DETAILS = 'bankDetails',
    EMPLOYEE_DETAILS = 'employeeDetails',
    MINISTRY_DATA_1 = 'ministryData1',
    MINISTRY_DATA_2 = 'ministryData2',
    MINISTRY_DATA_3 = 'ministryData3',
    PROJECT_DETAILS = 'projectDetails',
    SUBCONTRACTOR_DETAILS = 'subcontractorDetails',
    EQUIPMENT_DETAILS = 'equipmentDetails'
}

export const LocalRegisterWsdlData = {
    generalInfoActivity: {
        jsonHead: 'supplierRegHead',
        wsdlUrl: 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSupplierRegManagement?wsdl',
        xmlUrl: 'http://creceivesupplierregmanagement.managetotcintegration.webservices.ifsworld.com/',
        crecText: 'cReceiveSupplierReg'
    },
    generalInfoAddress: {
        jsonHead: 'supplierInfoHead',
        wsdlUrl: 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSupplierInfoManagement?wsdl',
        xmlUrl: 'http://creceivesupplierinfomanagement.managetotcintegration.webservices.ifsworld.com/',
        crecText: 'cReceiveSupplierInfo'
    },
    personalDetails: {
        jsonHead: 'supplierPersonalHead',
        wsdlUrl: 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppPersonalManagement?wsdl',
        xmlUrl: 'http://creceivesupppersonalmanagement.managetotcintegration.webservices.ifsworld.com/',
        crecText: 'cReceiveSuppPersonal'
    },
    communicationMethod: {
        jsonHead: 'supplierInfoHead',
        wsdlUrl: 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSupplierInfoManagement?wsdl',
        xmlUrl: 'http://creceivesupplierinfomanagement.managetotcintegration.webservices.ifsworld.com/',
        crecText: 'cReceiveSupplierInfo'
    },
    bankDetails: {
        jsonHead: 'supplierCommercialHead',
        wsdlUrl: 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppCommManagement?wsdl',
        xmlUrl: 'http://creceivesuppcommmanagement.managetotcintegration.webservices.ifsworld.com/',
        crecText: 'cReceiveSuppComm'
    },
    employeeDetails: {
        jsonHead: 'supplierStaffHead',
        wsdlUrl: 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppStaffManagement?wsdl',
        xmlUrl: 'http://creceivesuppstaffmanagement.managetotcintegration.webservices.ifsworld.com/',
        crecText: 'cReceiveSuppStaff'
    },
    ministryData1: {
        jsonHead: 'supplierMinistry1Head',
        wsdlUrl: 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppMin1Management?wsdl',
        xmlUrl: 'http://creceivesuppmin1management.managetotcintegration.webservices.ifsworld.com/',
        crecText: 'cReceiveSuppMin1'
    },
    ministryData2: {
        jsonHead: 'supplierMinistry2Head',
        wsdlUrl: 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppMin2Management?wsdl',
        xmlUrl: 'http://creceivesuppmin2management.managetotcintegration.webservices.ifsworld.com/',
        crecText: 'cReceiveSuppMin2'
    },
    ministryData3: {
        jsonHead: 'supplierMinistry3Head',
        wsdlUrl: 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppMin3Management?wsdl',
        xmlUrl: 'http://creceivesuppmin3management.managetotcintegration.webservices.ifsworld.com/',
        crecText: 'cReceiveSuppMin3'
    },
    projectDetails: {
        jsonHead: 'supplierProjectHead',
        wsdlUrl: 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppProjManagement?wsdl',
        xmlUrl: 'http://creceivesuppprojmanagement.managetotcintegration.webservices.ifsworld.com/',
        crecText: 'cReceiveSuppProj'
    },
    subcontractorDetails: {
        jsonHead: 'supplierSubconHead',
        wsdlUrl: 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppSubconManagement?wsdl',
        xmlUrl: 'http://creceivesuppsubconmanagement.managetotcintegration.webservices.ifsworld.com/',
        crecText: 'cReceiveSuppSubcon'
    },
    equipmentDetails: {
        jsonHead: 'supplierEquipHead',
        wsdlUrl: 'https://rcaifsprotos01.rca.gov.om:48080/webservices/CReceiveSuppEquipManagement?wsdl',
        xmlUrl: 'http://creceivesuppequipmanagement.managetotcintegration.webservices.ifsworld.com/',
        crecText: 'cReceiveSuppEquip'
    }
};

