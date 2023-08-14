import { Request, Response, json } from "express"
import client from "../config/grpc-client"
import { ServiceError } from '@grpc/grpc-js';

export default {
    apexLogin: async (req: Request, res: Response) => {
        try {
            client.apexLogin(req.body, (err: ServiceError, response: any) => {
                if (err) {
                    console.error(err);
                    return;
                }
                res.status(response.status).json(response)
            })
        } catch (error) {
            console.log(error)
        }
    },

    nodalCreation: async (req: Request, res: Response) => {
        try {
            req.body.token = req.headers.token
            client.createNodal(req.body, (err: ServiceError, response: any) => {
                if (err) {
                    console.log(err)
                    return
                }
                res.status(response.status).json(response)
            })
        } catch (error) {
            console.log(error)
        }
    },

    nodalLogin: async (req: Request, res: Response) => {
        try {
            client.nodalLogin(req.body, (err: ServiceError, response: any) => {
                if (err) {
                    console.log(err)
                    return
                }
                res.status(response.status).json(response)
            })
        } catch (error) {
            console.log(error)
        }
    },

    createCP: async (req: Request, res: Response) => {
        try {
            req.body.token = req.headers.token
            client.createCP(req.body, (err: ServiceError, response: any) => {
                if (err) {
                    console.log(err)
                    return
                }
                res.status(response.status).json(response)
            })
        } catch (error) {
            console.log(error)
        }
    },

    cpLogin: async (req: Request, res: Response) => {
        try {
            client.cpLogin(req.body, (err: ServiceError, response: any) => {
                if (err) {
                    console.log(err)
                    return
                }
                res.status(response.status).json(response)
            })
        } catch (error) {
            console.log(error)
        }
    },

    /////////////     Test     ///////////////////

    hi :  async (req: Request, res: Response) => {
        try {
            client.cpAuth({token:req.headers.token}, (err: ServiceError, response: any) => {
                if (err) {
                    console.log(err)
                    return
                }
                res.status(response.status).json(response)
            })
        } catch (error) {
            console.log(error)
        }
    },
}