interface HomeRes {
    id: string;
    name: string;
    phone: number;
    email: string;
    address: Address;
    status: number;
    consignmentPrefix: string;
}

interface AuthRes {
    message: string;
    status: number;
    token: number;
}

interface SearchByPinRes {
    id: string;
    name: string;
    phone: number;
    email: string;
    address: Address
    status: number;
    message: string;
}


interface Address {
    address: string;
    pincode: number;
}

interface BuyAwbRes {
    message: string;
    status: number;
}

interface ValidateAwbRes {
    message: string;
    status: number;
}

interface BookingRes {
    message: string;
    status: number;
}




export {
    HomeRes,
    AuthRes,
    SearchByPinRes,
    BuyAwbRes,
    ValidateAwbRes,
    BookingRes,
}
