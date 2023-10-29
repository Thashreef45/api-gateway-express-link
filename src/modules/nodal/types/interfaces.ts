interface AuthRes {
    message: string;
    status: number;
    id: number;
}

interface LoginRes {
    message: string;
    status: number;
    token: string;
}

interface HomeRes {
    id : string;
    address : Address;
    name : string;
    phone : number;
    email : string;
    apex : string;
    status : number;
}
interface Address {
    pincode : number;
    address : string;
}

interface CreateCpRes {
    message : string;
    status : number;
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



export {
    AuthRes,
    LoginRes,
    HomeRes,
    CreateCpRes,
    SearchByPinRes
}