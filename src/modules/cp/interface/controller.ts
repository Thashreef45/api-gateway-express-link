import { Request, Response, response } from "express"
import client from "../../auth/config/grpc-client"
import { ServiceError } from '@grpc/grpc-js';
import cpClient from "../config/grpc-cp-client";


export default {
    cpHome: (req: Request, res: Response) => {
        try {
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: any) => {
                if (err) {
                    console.log(err)
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    cpClient.Home({id:response.id},(err:ServiceError,response:any)=>{
                        if (err) {
                            console.log(err,)
                            return
                        }
                        response.phone = Number(response.phone)
                        const status = response.status
                        delete response.status
                        res.status(status).json(response)
                    }) 
                }
            })
        } catch (error) {
            console.log(error)
        }
    },


    searchCpByPin : (req : Request , res:Response) =>{
        try {
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: any) => {
                if (err) {
                    console.log(err)
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    cpClient.searchByPin({pincode:req.body.pincode},(err:ServiceError,response:any)=>{
                        if(err){
                            console.log(err)
                            return
                        }
                        response.phone = Number(response.phone)
                        res.status(response.status).json(response)
                    })
                }
            })
        } catch (error) {
            console.error(error)
        }
    }
    
}