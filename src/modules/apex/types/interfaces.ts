interface LoginRes{
    message : string;
    status : number;
    token : string;
}


interface AuthRes {
    message : string;
    status : number;
    id : string;
}

interface createNodalRes {
    message : string;
    status : number;
}




export  {
    LoginRes,
    AuthRes,
    createNodalRes
}

