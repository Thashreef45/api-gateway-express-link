import { Request,Response, json } from "express"
import client from "../config/grpc-client"
import {ServiceError} from '@grpc/grpc-js';

export default {
    apexLogin : async(req:Request,res:Response)=>{
        client.apexLogin(req.body,(err:ServiceError,response:any)=>{
            if (err) {
                console.error(err);
                return;
            }
            res.status(response.status).json(response)
        })
    },

    nodalCreation : async(req:Request,res:Response)=>{
        req.body.token = req.headers.token
        client.createNodal(req.body,(err:ServiceError,response:any)=>{
            if(err){
                console.log(err)
                return
            }
            res.status(response.status).json(response)
        })
    },

    nodalLogin : async(req:Request,res:Response)=>{
        client.nodalLogin(req.body,(err:ServiceError,response:any)=>{
            if(err){
                console.log(err)
                return
            }
            res.status(response.status).json(response)
        })
    },
}