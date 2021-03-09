export class EndPoint {
    public static login = '/api/login';
    public static register = '/v1/users';
    public static phoneNumbers = '/v1/phoneNumbers';
    public static numberSearchType = '/v1/phoneNumbers/search/';
    public static numberPrice = '/v1/phoneNumbers/price';
    public static numberPurchase = '/v1/phoneNumbers/purchase';
    public static omanNetPaymentGateway = 'http:///ec2-3-141-179-51.us-east-2.compute.amazonaws.com/backend/public/omannet-payment-form';
    public static cyberSourcePaymentGateway = 'http:///ec2-3-141-179-51.us-east-2.compute.amazonaws.com/backend/public/payment-form';
    public static getPaymentData = 'http://ec2-3-141-179-51.us-east-2.compute.amazonaws.com/backend/public/payment-get-data';
}



export const SupplierIdList = {
    local: [
        11337788,
        11337487,
        12312312372
    ],
    individual: [     // citizen id list
        1122331321,
        4455664654,
        7799798987
    ],
    international: [
        'Saibal.Khan@envecon.com',
        'saibal.khan@envecon.com',
        'test.test@envecon.com',
        'demo@demo.com'
    ]
};

export const SelectedIdEmailForTenderPayment = [
    11337788, // local
    1122331321, // individual
    'demo@demo.com' // international
];

