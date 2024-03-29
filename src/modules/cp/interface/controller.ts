import { Request, Response, response } from "express"
import client from "../../auth/config/grpc-client"
import { ServiceError } from '@grpc/grpc-js';
import cpClient from "../config/grpc-cp-client";
import consignmentClient from "../../consignment/config/grpc-consignment-client";
import { employeePhoneNumberConvert } from "../../../DAO/number-convert";
import setData from "../../../DAO/set-timestamp";

import {
    AssignFdmRes,
    AuthRes, BookingRes, BuyAwbRes,
    CreateEmployeeRes, GetAnEmployeeRes, GetAssignedFdmsRes, GetBookingHistoryRes, GetConsignmentTypes, GetCpRecievedFdmsRes, GetDeliveryStatusRes, GetEmployeesRes,
    GetTodaysBookingsRes,
    HomeRes,SearchByPinRes, TrackingRes, ValidateAwbRes, updateDeliveryStatusRes
} from "../types/interfaces";


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
                    console.log(req.body, '<<body')
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

                    req.body.token = req.headers.token

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

    getEmployees: (req: Request, res: Response) => {
        try {
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    cpClient.getEmployees({ token: req.headers.token }, (err: ServiceError, response: GetEmployeesRes) => {
                        if (err) {
                            console.log(err)
                            res.status(500).json({ error: 'An internal server error occurred.' });
                            return
                        }
                        if (response.employees) {
                            response.employees = employeePhoneNumberConvert(response.employees)
                        }
                        res.status(response.status).json(response)
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    },


    createEmployee: (req: Request, res: Response) => {
        try {
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    req.body.token = req.headers.token
                    cpClient.createEmployee(req.body, (err: ServiceError, response: CreateEmployeeRes) => {
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



    getConsignmentTypes: (req: Request, res: Response) => {
        try {
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    consignmentClient.getConsignmentTypes({}, (err: ServiceError, response: GetConsignmentTypes) => {
                        if (err) {
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

    getMyBookings: (req: Request, res: Response) => {
        try {
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    const pincode = req.params.pincode
                    consignmentClient.getTodaysBookings({ pincode }, (err: ServiceError, response: GetTodaysBookingsRes) => {
                        if (err) {
                            console.log(err)
                            res.status(500).json({ error: 'An internal server error occurred.' });
                            return
                        }
                        if (response.bookings) {
                            response.bookings = setData(response.bookings)
                        }
                        res.status(response.status).json(response)
                    })
                }
            })
        } catch (error) {

        }
    },

    deleteBookedConsignment: (req: Request, res: Response) => {
        try {
            req.headers.id = req.params.id
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    consignmentClient.deleteBooking(req.headers, (err: ServiceError, response: any) => {
                        if (err) {
                            console.log(err)
                            res.status(500).json({ error: 'An internal server error occurred.' });
                            return
                        }
                        if (response.bookings) {
                            response.bookings = setData(response.bookings)
                        }
                        res.status(response.status).json(response)
                    })
                }
            })
        } catch (error) {

        }
    },

    getBookingHistory: (req: Request, res: Response) => {
        try {
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    consignmentClient.getBookingHistory(req.body, (err: ServiceError, response: GetBookingHistoryRes) => {
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

    consignmentTracking: (req: Request, res: Response) => {
        try {
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    consignmentClient.tracking(req.params, (err: ServiceError, response: TrackingRes) => {
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

    getRecievedFdm: (req: Request, res: Response) => {
        try {
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    consignmentClient.getCpRecievedFdms({ token: req.headers.token }, (err: ServiceError, response: GetCpRecievedFdmsRes) => {
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

    assignFdmToEmployee: (req: Request, res: Response) => {
        try {
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    req.body.token = req.headers.token
                    consignmentClient.assignFdm(req.body, (err: ServiceError, response: AssignFdmRes) => {
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

    getEmployeeAssignedFdms: (req: Request, res: Response) => {
        try {
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    consignmentClient.getAssignedFdms({ id: req.params.id }, (err: ServiceError, response: GetAssignedFdmsRes) => {
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

    getDeliveryStatus: (req: Request, res: Response) => {
        try {
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    consignmentClient.getDeliveryStatus({}, (err: ServiceError, response: GetDeliveryStatusRes) => {
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

    updateDeliveryStatus: (req: Request, res: Response) => {
        try {
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    consignmentClient.updateDeliveryStatus(req.body, (err: ServiceError, response: updateDeliveryStatusRes) => {
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


    getEmployeeDetail: (req: Request, res: Response) => {
        try {
            client.cpAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    const data = { id: req.params.id, token: req.headers.token }
                    cpClient.getAnEmployee(data, (err: ServiceError, response: GetAnEmployeeRes) => {
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


}