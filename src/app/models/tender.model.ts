export interface TenderDetail {
    no: number;
    tenderNo: string;
    tenderTitle: string;
    startDate: Date;
    endDate: Date;
    tenderFee: number;
    remarks: string;
    siteId: string;
    siteDescription: string;
    tenderStatus: string;
}

export interface GeneralTenderDetails {
    tenderNo: string;
    tenderTitle: string;
    siteID: string;
    siteDescription: string;
    tenderStatus: string;
    tenderProgram: TenderProgram;
    tenderParticipate: TenderParticipate;
    tenderFees: TenderFees;
    tenderDocuments: string[];
    tenderBidsDisplay: TenderBidsDisplay;
    otherInfo: OtherInfo;
}

export interface TenderProgram  {
    tenderStartDate: string;
    tenderSubmissionDate: string;
    lastDateforTenderQueries: string;
    days: string;
    hours: string;
    min: string;
    briefDescriptionofTender: string;
}

export interface TenderParticipate {
    participate: string;
    regretReason: string;
    siteVisitRequired: string;
    tenderDocumentFee: string;
}

export interface TenderFees {
    tenderDocumentFee: string;
    paymentMode: string;
}

export interface TenderDocuments {
    tenderDocuments: string[];
}

export interface TenderBidsDisplay {
    revisionNo: string;
    lineNo: string;
    itemPartCode: string;
    itemPartCodeDescription: string;
    uom: string;
    quantity: string;
    unitPrice: string;
    totalPrice: string;
    documentAttachment: string[];
}

export interface OtherInfo {
    freeField1: string;
    freeField2: string;
    freeField3: string;
    freeField4: string;
    freeField5: string;
}