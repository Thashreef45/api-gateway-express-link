import { Request, Response, response } from "express"
import client from "../../auth/config/grpc-client"
import { ServiceError } from '@grpc/grpc-js';
import cpClient from "../config/grpc-cp-client";
import consignmentClient from "../../consignment/config/grpc-consignment-client";
import { AuthRes, BookingRes, BuyAwbRes, HomeRes, SearchByPinRes, ValidateAwbRes } from "../types/interfaces";


export default {

    cpLogin: (req: Request, res: Response) => {
        try {
            cpClient.Login(req.body, (err: ServiceError, response: any) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                res.status(response.status).json(response)
            })
        } catch (error) {
            console.log(error)
        }
    },

    cpHome: (req: Request, res: Response) => {
        try {
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    cpClient.Home({ id: req.headers.token }, (err: ServiceError, response: HomeRes) => {
                        if (err) {
                            console.log(err)
                            res.status(500).json({ error: 'An internal server error occurred.' });
                            return
                        }
                        response.phone = Number(response.phone)
                        res.status(response.status).json(response)
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    },


    searchCpByPin: (req: Request, res: Response) => {
        try {
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    cpClient.searchByPin({ pincode: req.body.pincode }, (err: ServiceError, response: SearchByPinRes) => {
                        if (err) {
                            console.log(err)
                            res.status(500).json({ error: 'An internal server error occurred.' });
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
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    req.body.id = req.headers.token
                    consignmentClient.buyAwb(req.body, (err: ServiceError, response: BuyAwbRes) => {
                        if (err) {
                            console.log(err)
                            res.status(500).json({ error: 'An internal server error occurred.' });
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
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    cpClient.validateAwb(req.body, (err: ServiceError, response: ValidateAwbRes) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ error: 'An internal server error occurred.' });
                            return
                        }
                        res.status(response.status).json(response)
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
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {

                    //awb validation part
                    cpClient.validateAwb(req.body, (err: ServiceError, response: ValidateAwbRes) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ error: 'An internal server error occurred.' });
                            return
                        }
                        if (response.status != 200) {
                            res.status(response.status).json(response)
                        } else {

                            //destination pincode validation part
                            cpClient.searchByPin({ pincode: req.body.pincode }, (err: ServiceError, response: SearchByPinRes) => {
                                if (err) {
                                    console.log(err)
                                    res.status(500).json({ error: 'An internal server error occurred.' });
                                    return
                                }
                                if (response.status != 200) {
                                    res.status(response.status).json(response)
                                } else {

                                    // Booking Part
                                    consignmentClient.newBooking(req.body, (err: ServiceError, response: BookingRes) => {
                                        if (err) {
                                            console.log(err);
                                            res.status(500).json({ error: 'An internal server error occurred.' });
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