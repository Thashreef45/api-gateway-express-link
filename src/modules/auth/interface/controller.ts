import { Request,Response } from "express"
import client from "../config/grpc-client"
import {ServiceError} from '@grpc/grpc-js';

export default {
    apexLogin : async(req:Request,res:Response)=>{
        client.apexLogin({
            "id":req.body.id,
            "password":req.body.password
        },(err:ServiceError,response:any)=>{
            if(!err) { 
                console.log(response,'response << --gRPC')
            } 
        })
    }
}