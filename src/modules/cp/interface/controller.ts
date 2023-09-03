import { Request, Response, response } from "express"
import client from "../../auth/config/grpc-client"
import { ServiceError } from '@grpc/grpc-js';
import cpClient from "../config/grpc-cp-client";
import consignmentClient from "../../consignment/config/grpc-consignment-client";


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
                    cpClient.Home({ id: response.id }, (err: ServiceError, response: any) => {
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


    searchCpByPin: (req: Request, res: Response) => {
        try {
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: any) => {
                if (err) {
                    console.log(err)
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    cpClient.searchByPin({ pincode: req.body.pincode }, (err: ServiceError, response: any) => {
                        if (err) {
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
    },



    buyAwb: (req: Request, res: Response) => {
        try {
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: any) => {
                if (err) {
                    console.log(err)
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    req.body.id = response.id
                    consignmentClient.buyAwb(req.body, (err: ServiceError, response: any) => {
                        if (err) {
                            console.log(err)
                            return
                        }
                        res.status(response.status).json(response)
                    })
                }
            })
        } catch (error) {

        }
    },



    //--inputs awb,cpId
    validateAwb: (req: Request, res: Response) => {
        try {
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: any) => {
                if (err) {
                    console.log(err)
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    cpClient.validateAwb(req.body, (err: ServiceError, response: any) => {
                        if (err) {
                            console.log(err);
                            return
                        }
                        if (response.status != 200) {
                            res.status(response.status).json(response)
                        } else {
                            res.status(response.status).json(response)
                        }
                    })
                }

            })
        } catch (error) {
            console.log(error);

        }
    },



    newBooking: (req: Request, res: Response) => {
        try {
            //Authentication part
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: any) => {
                if (err) {
                    console.log(err)
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {

                    //awb validation part
                    cpClient.validateAwb(req.body, (err: ServiceError, response: any) => {
                        if (err) {
                            console.log(err);
                            return
                        }
                        if (response.status != 200) {
                            res.status(response.status).json(response)
                        } else {

                            //destination pincode validation part
                            cpClient.searchByPin({ pincode: req.body.pincode }, (err: ServiceError, response: any) => {
                                if (err) {
                                    console.log(err)
                                    return
                                }
                                if (response.status != 200) {
                                    res.status(response.status).json(response)
                                } else {

                                    // Booking Part
                                    consignmentClient.newBooking(req.body, (err: ServiceError, response: any) => {
                                        if (err) {
                                            console.log(err);
                                            return
                                        }
                                        res.status(response.status).json(response)
                                    })
                                }
                            })
                        }
                    })
                }

            })
        } catch (error) {
            console.log(error);

        }
    },
    //end---newBooking


}