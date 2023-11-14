import { Request, Response, response } from 'express'
import nodalClient from '../config/grpc-nodal-client'
import client from '../../auth/config/grpc-client'
import { AuthRes, CreateCpRes, HomeRes, LoginRes, SearchByPinRes } from '../types/interfaces'
import cpClient from '../../cp/config/grpc-cp-client'
import { ServiceError } from '@grpc/grpc-js'
import consignmentClient from '../../consignment/config/grpc-consignment-client'

export default {

    login: (req: Request, res: Response) => {
        try {
            nodalClient.Login(req.body, (err: ServiceError, response: LoginRes) => {
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


    home: (req: Request, res: Response) => {
        try {
            client.nodalAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) {
                    res.status(response.status).json(response)
                } else {
                    nodalClient.Home({ id: req.headers.token }, (err: ServiceError, response: HomeRes) => {
                        if (err) {
                            res.status(500).json({ error: 'An internal server error occurred.' });
                            console.log(err)
                        }
                        if (response.status == 200) {
                            response.phone = Number(response.phone)
                        }
                        res.status(response.status).json(response)
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    },




    createChannelPartner: (req: Request, res: Response) => {
        try {
            client.nodalAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    console.log(err)
                    return
                }
                if (response.status != 200) {
                    res.status(response.status).json(response)
                } else {
                    req.body.token = req.headers.token
                    cpClient.createCP(req.body, (err: ServiceError, response: CreateCpRes) => {
                        if (err) {
                            res.status(500).json({ error: 'An internal server error occurred.' });
                            console.log(err)
                            return
                        }
                        res.status(response.status).json(response)
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    },

    //list of cp with their bookings count
    acceptCpFdm: (req: Request, res: Response) => {
        try {
            client.nodalAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    console.log(err)
                    return
                }
                if (response.status != 200) {
                    res.status(response.status).json(response)
                } else {
                    cpClient.fdmToNodal({ token: req.headers.token }, (err: ServiceError, response: any) => {
                        if (err) {
                            res.status(500).json({ error: 'An internal server error occurred.' });
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

    assignFdmFromCp: (req: Request, res: Response) => {
        try {
            client.nodalAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    console.log(err)
                    return
                }
                if (response.status != 200) {
                    res.status(response.status).json(response)
                } else {
                    req.body.token = req.headers.token
                    req.body.id = req.params.id
                    cpClient.assignFdmToNodal(req.body, (err: ServiceError, response: any) => {
                        if (err) {
                            res.status(500).json({ error: 'An internal server error occurred.' });
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


    getSendingFdms: (req: Request, res: Response) => {
        try {
            client.nodalAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    console.log(err)
                    return
                }
                if (response.status != 200) {
                    res.status(response.status).json(response)
                } else {
                    consignmentClient.getNodalSendingFdms(req.headers, (err: ServiceError, response: any) => {
                        if (err) {
                            res.status(500).json({ error: 'An internal server error occurred.' });
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

    transferSendingFDM: (req: Request, res: Response) => {
        try {
            client.nodalAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    console.log(err)
                    return
                }
                if (response.status != 200) {
                    res.status(response.status).json(response)
                } else {
                    req.body.token = req.headers.token
                    consignmentClient.transferNodalSendingFdm(req.body, (err: ServiceError, response: any) => {
                        if (err) {
                            res.status(500).json({ error: 'An internal server error occurred.' });
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

    getRecievedFdms: async (req: Request, res: Response) => {
        try {
            client.nodalAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    console.log(err)
                    return
                }
                if (response.status != 200) {
                    res.status(response.status).json(response)
                } else {
                    consignmentClient.getNodalRecievedFdms({ token: req.headers.token }, (err: ServiceError, response: any) => {
                        if (err) {
                            res.status(500).json({ error: 'An internal server error occurred.' });
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

    transferRecievedFdm: async (req: Request, res: Response) => {
        try {
            client.nodalAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    console.log(err)
                    return
                }
                if (response.status != 200) {
                    res.status(response.status).json(response)
                } else {
                    req.body.token = req.headers.token
                    consignmentClient.transferNodalRecievedFdm(req.body, (err: ServiceError, response: any) => {
                        if (err) {
                            res.status(500).json({ error: 'An internal server error occurred.' });
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


    searchCpByPin: (req: Request, res: Response) => {
        try {
            client.nodalAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
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

    consignmentTracking : (req: Request, res: Response) => {
        try {
            client.nodalAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    consignmentClient.tracking(req.params, (err: ServiceError, response: any) => {
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


    getReturnSendingFdms : (req: Request, res: Response) => {
        try {
            client.nodalAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    consignmentClient.getReturnNodalSendingFdms({ token: req.headers.token }, (err: ServiceError, response: any) => {
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

    transferReturnSendingFdms : (req: Request, res: Response) => {
        try {
            client.nodalAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    req.body.token = req.headers.token
                    consignmentClient.transferReturnNodalSendingFdms(req.body, (err: ServiceError, response: any) => {
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

    getReturnRecievedFdms : (req: Request, res: Response) => {
        try {
            client.nodalAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    consignmentClient.getReturnNodalRecievingFdms({ token: req.headers.token }, (err: ServiceError, response: any) => {
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



    transferReturnRecievedFdm : (req: Request, res: Response) => {
        try {
            client.nodalAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    req.body.token = req.headers.token
                    consignmentClient.transferReturnNodalRecievedFdm(req.body, (err: ServiceError, response: any) => {
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