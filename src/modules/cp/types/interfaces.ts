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

interface GetEmployeesRes {
    status: number;
    employees: [
        {
            name: string,
            email: string,
            phone: number,
            _id: string
        }
    ]
}

interface CreateEmployeeRes {
    message: string;
    status: number;
}

interface GetConsignmentTypes {
    status: number;
    types: [
        {
            _id: string,
            typeName: string
        }
    ]
}

interface GetTodaysBookingsRes {
    status: number;
    message: string;
    bookings: [
        {
            awb: number,
            awbPrefix: string,
            destinationPin: number,
            type: string,
            bookingTime: string,
            _id: string,
        }
    ]
}

interface DeleteBookingRes {
    message: string;
    status: number;
}



interface GetBookingHistoryRes {
    status: number,
    message: string,
    data: [
        {
            awbPrefix: string,
            awb: number,
            destinationPin: number,
            type: string,
            bookingTime: string,
            status: string,
        }
    ]
}

interface TrackingRes {
    status: number;
    message: string;
    data: {
        image: string;
        awbPrefix: string;
        awb: number;
        originAddress: string;
        address: string;
        originPin: number;
        destinationPin: number;
        contentType: string
        declaredValue: number;
        bookingTime: string;
        mobile: number;

        sending: {
            nodalRecieved: Office,
            nodalSend: string,
            apexRecieved: Office,
            apexSend: string
        }

        recieving: {
            apexRecieved: Office;
            apexSend: string;
            nodalRecieved: Office;
            nodalSend: string;
            cpRecieved: Office;
            cpUpdate: string;
        }

        status: string;
        drs: string;
        isReturned: boolean;

        notDelivered: {
            sending: {
                nodalRecieved: Office,
                nodalSend: string,
                apexRecieved: Office,
                apexSend: string
            }
            recieving: {
                apexRecieved: Office;
                apexSend: string;
                nodalRecieved: Office;
                nodalSend: string;
                cpRecieved: Office;
                cpUpdate: string;
            }
        }
    }
}
interface Office {
    Date: string;
    address: string;
    name: string
}

interface GetCpRecievedFdmsRes {
    status : number;
    message : string;
    data : [
        {
            awbPrefix : string;
            awb : number;
            mobile : string;
            address : string;
            type : string;
            _id : string
        }
    ]
}

interface AssignFdmRes {
    status : number;
    message : string
}

interface GetAssignedFdmsRes {
    status : number;
    message : string;
    data : [
        {
            _id : string,
            awbPrefix : string,
            awb : number,
            mobile : string,
            address : string,
            status : string,
            type : string,
            isReturned : boolean,
        }
    ]
}

interface GetDeliveryStatusRes {
    status : number
    message : string;
    data : [
        {
            _id : string,
            statusName : string
        }
    ]
}

interface updateDeliveryStatusRes {
    status : number
    message : string
}

interface GetAnEmployeeRes {
    status : number;
    data : {
        name : string;
        email : string;
        phone : string;
        message : string;
    }
}


export {
    HomeRes,
    AuthRes,
    SearchByPinRes,
    BuyAwbRes,
    ValidateAwbRes,
    BookingRes,
    GetEmployeesRes,
    CreateEmployeeRes,
    GetConsignmentTypes,
    GetTodaysBookingsRes,
    // DeleteBookingRes,
    GetBookingHistoryRes,
    TrackingRes,
    GetCpRecievedFdmsRes,
    AssignFdmRes,
    GetAssignedFdmsRes,
    GetDeliveryStatusRes,
    updateDeliveryStatusRes,
    GetAnEmployeeRes,
}
