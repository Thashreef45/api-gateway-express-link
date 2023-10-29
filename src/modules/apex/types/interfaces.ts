interface LoginRes {
    message: string;
    status: number;
    token: string;
}


interface AuthRes {
    message: string;
    status: number;
    id: string;
}

interface createNodalRes {
    message: string;
    status: number;
}


interface Home {
    address: string;
    pincode: number;
    id: string;
    name: string;
    consignmentPrefix: string;
    email: string;
    phone: number;
    message: string;
    status: number;
}

interface Fdms {
    message: string;
    status: number;
    data: [
        {
            awb: number;
            awbPrefix: string;
            destinationPin : number;
            type : string;
            bookingTime : string;
            _id :string;
            originPin : number;
            status : string;
        }
    ]
}


interface TransferApexSendingFdmRes {
    status : number;
    message : string;
}


interface SearchByPinRes {
    id: string;
    name: string;
    phone: number;
    email: string;
    address: string;
    pincode:number
    status: number;
    message: string;
}


export {
    LoginRes,
    AuthRes,
    createNodalRes,
    Home,
    Fdms,
    TransferApexSendingFdmRes,
    SearchByPinRes
}

