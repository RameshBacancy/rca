// General info step
export interface GeneralInfoStep {
    generalInfoTab: GeneralInfoStep;
    addressInfoTab: AddressInfoTab;
}

// General info tab
export interface GeneralInfoTab {
    crNo: string;
    civilNo: number;
    arabicName: string;
    englishName: string;
    companyInfo: string;
    activities: Activities[];
}
export interface Activities {
    id: string;
    activityName: string;
    subActivity: string;
    sagment: string;
    family: string;
    class: string;
    commodity: string;
    isEdit: boolean;
    isMoci: boolean;
}

// General info address
export interface AddressInfoTab {
    address: Address[];
}
export interface Address {
    addressID: string;
    addressLine1: string;
    addressLine2: string;
    language: string;
    country: string;
    isEdit: boolean;
    isMoci: boolean;
}



// Personal Detail Step
export interface PersonalDetailsStep {
    personalDetails: PersonalDetails[];
}

export interface PersonalDetails {
    personName: string;
    nationality: string;
    idType: string;
    idNo: string;
    designation: string;
    noOfShares: number;
    perShares: number;
    authorizationType: string;
    authorizationLimit: string;
    note: string;
    regDate: string;
    isEdit: boolean;
    isMoci: boolean;
}

// Communication Method Step
export interface CommunicationMethodStep {
    communicationMethod: CommunicationMethod[];
}
export interface CommunicationMethod {
    no: number;
    method: string;
    value: string;
    isEdit: boolean;
    isMoci: boolean;
}

// Bank detail step
export interface BankDetailStep {
    activityInfoTab: ActivityInfoTab;
    bankDetailsTab: BankDetailsTab;
    companyInfoTab: CompanyInfoTab;
    otherInfoTab: OtherInfoTab;
}

export interface ActivityInfoTab {
    activityInfo: ActivityInfo[];
}
export interface ActivityInfo {
    id: string;
    activityName: string;
    subActivity: string;
    establishmentDate: string;
    regDate: string;
    expDate: string;
    duration: string;
    companyGrade: string;
    location: string;
    isEdit: boolean;
    documents: string[];
    isMoci: boolean;
}

export interface BankDetailsTab {
    BankDetails: BankDetails[];
}
export interface BankDetails {
    bankingId: string;
    bankingIdname: string;
    bankAcc: string;
    bankName: string;
    bankBranch: string;
    holderName: string;
    isMoci: boolean;
}

export interface CompanyInfoTab {
    compFinanceInfo: CompFinanceInfo;
    compBranchInfo: CompBranchInfo[];
}
export interface CompFinanceInfo {
    cashCapital: string;
    kindCapital: string;
    noOfShares: string;
    shareValue: string;
}
export interface CompBranchInfo {
    reqDate: string;
    branchId: string;
    branchActivity: string;
    branchActivityNo: number;
    isMoci: boolean;
}

export interface OtherInfoTab {
    otherDetails: OtherDetails[];
}

export interface OtherDetails {
    no: number;
    name: number;
    value: number;
    documents: string[];
    isEdit: boolean;
    isMoci: boolean;
}


// Employee Details Step
export interface EmployeeDetailsStep {
    crNo: string;
    civilNo: string;
    omanizationRatio: string;
    employeDetails: EmployeDetails[]
}
export interface EmployeDetails {
    no: number;
    name: string;
    qualification: string;
    specialization: string;
    jobTitle: string;
    designation: string;
    designationDate: string;
    expDate: string;
    experience: string;
    appointmentDate: string;
    status: string;
    statusDate: string;
    staffCategory: string;
    country: string;
    passportNum: string;
    recidentCard: string;
    civilNo: number;
    crNo: number;
    omaniratio: string;
    isEdit: boolean;
    documents: string[];
    isMoci: boolean;
}


// Ministries data 1 step
export interface MinistriesData1Step {
    occiDataTab: OcciDataTab;
    tenderBoardDataTab: TenderBoardDataTab;
    municipalityDataTab: MunicipalityDataTab;
}

export interface OcciDataTab {
    regDate: string;
    expDate: string;
    membershipNumber: string;
    companyGrade: string;
    crNo: number;
}

export interface TenderBoardDataTab {
    crNo: number;
    companyGrade: string;
    registeredActivities: string[];
    regDate: string;
    expDate: string;
    registrationCertificate: string[];
}

export interface MunicipalityDataTab {
    civilNo: number;
    location: string;
    crNo: number;
    regDate: string;
    expDate: string;
    activities: string[]
}


// Ministries data 2 step
export interface MinistriesData2Step {
    mofDataTab: MofDataTab;
    mohDataTab: MohDataTab;
    mociDataTab: MociDataTab;
    smallMediumEntDataTab: SmallMediumEntDataTab;
}

export interface MofDataTab {
    crNo: number;
    regDate: string;
    taxCertificateNumber: string;
    activities: string[];
    expDate: string;
}

export interface MohDataTab {
    crNo: number;
    regDate: string;
    healthAndPharmacyLicenses: string[];
    expDate: string;
    typeOfActivity: string;
}

export interface MociDataTab {
    perAndLiceOfConsCom: string[];
    liceOfTraAndQuaInst: string[];
    ageAndTread: string;
    foreignInvestment: string;
    perOfGovOwn: string;
    accrAgencies: string;
}

// Ministries data 1 step
export interface SmallMediumEntDataTab {
    crNo: number;
    regDate: string;
    expDate: string;
    activities: string[];
}

// Ministries data 3 step
export interface MinistriesData3Step {
    authorityOfCivilDefenseData: AuthorityOfCivilDefenseData;
    capitalMarketData: CapitalMarketData;
    creditBureauData: CreditBureauData;
    distRulesReviewBoardData: DistRulesReviewBoardData;
}

export interface AuthorityOfCivilDefenseData {
    licensesForFireResistant: string;
    crNo: number;
    regDate: string;
    expDate: string;
    activities: string[];
}

export interface CapitalMarketData {
    crNo: number;
    regDate: string;
    expDate: string;
    activities: string[];
}

export interface CreditBureauData {
    crNo: number;
    listOfFinanciallyTroubledCompanies: string[]
}

export interface DistRulesReviewBoardData {
    crNo: number;
    regNumber: number;
    regDate: string;
    expDate: string;
    activities: string[];
}

// Project detail step
export interface ProjectDetailsStep {
    projectDetails: ProjectDetails[];
}

export interface ProjectDetails {
    no: number;
    name: string;
    client: string;
    consultent: string;
    costConsultent: string;
    value: number;
    period: string;
    completion: number;
    documents: string[];
    isEdit: boolean;
    isMoci: boolean;
}

// Sub contractor detail step
export interface SubContractorDetailsStep {
    subContractorDetails: SubContractorDetails[];
}

export interface SubContractorDetails {
    no: number;
    nameOfWork: string;
    subContractor: string;
    crNo: number;
    telephone: string;
    fax: string;
    email: string;
    regWithRca: boolean;
    isEdit: boolean;
    isMoci: boolean;
}

// Equipment Details Step
export interface EquipmentDetailsStep {
    equipmentDetails: EquipmentDetails[];
}

export interface EquipmentDetails {
    no: number;
    type: string;
    quantity: number;
    capacity: string;
    year: string;
    regNo: string;
    approxValue: string;
    isEdit: boolean;
    isMoci: boolean;
}

