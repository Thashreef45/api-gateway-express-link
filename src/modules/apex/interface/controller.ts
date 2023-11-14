import { Request, Response } from "express"
import { ServiceError } from "@grpc/grpc-js"
import nodalClient from "../../nodal/config/grpc-nodal-client"
import client from "../../auth/config/grpc-client"
import apexClient from "../config/grpc-apex-client"
import { AuthRes, LoginRes, createNodalRes, Home, TransferApexSendingFdmRes, Fdms, SearchByPinRes } from "../types/interfaces"
import consignmentClient from "../../consignment/config/grpc-consignment-client"
import cpClient from "../../cp/config/grpc-cp-client"

export default {

    login: async (req: Request, res: Response) => {
        try {
            apexClient.Login(req.body, (err: ServiceError, response: LoginRes) => {
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



    nodalCreation: async (req: Request, res: Response) => {
        try {
            req.body.token = req.headers.token
            client.apexAuth(req.headers, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) {
                    res.status(response.status).json(response)
                } else {
                    nodalClient.createNodal(req.body, (err: ServiceError, response: createNodalRes) => {
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
            console.log(error)
        }
    },


    Home: async (req: Request, res: Response) => {
        client.apexAuth(req.headers, (err: ServiceError, response: AuthRes) => {
            if (err) {
                console.log(err)
                res.status(500).json({ error: 'An internal server error occurred.' });
                return
            }
            if (response.status != 200) {
                res.status(response.status).json(response)
            } else {
                apexClient.Home({ id: req.headers.token }, (err: ServiceError, response: Home) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json({ error: 'An internal server error occurred.' });
                        return
                    }
                    if (response.status == 200) {
                        response.phone = Number(response.phone)
                    }
                    res.status(response.status).json(response)
                })
            }
        })
    },

    getSendingFdms: async (req: Request, res: Response) => {
        client.apexAuth(req.headers, (err: ServiceError, response: AuthRes) => {
            if (err) {
                console.log(err)
                res.status(500).json({ error: 'An internal server error occurred.' });
                return
            }
            if (response.status != 200) {
                res.status(response.status).json(response)
            } else {
                consignmentClient.getApexSendingFdms({ token: req.headers.token }, (err: ServiceError, response: Fdms) => {
                    if (err) {
                        console.log(err)
                        res.status(500).json({ error: 'An internal server error occurred.' });
                        return
                    }
                    res.status(response.status).json(response)
                })
            }
        })
    },

    transferSendingFdm: (req: Request, res: Response) => {
        try {
            client.apexAuth(req.headers, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) {
                    res.status(response.status).json(response)
                } else {
                    req.body.token = req.headers.token
                    consignmentClient.transferApexSendingFdm(req.body, (err: ServiceError, response: TransferApexSendingFdmRes) => {
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


    getApexRecievedfdms: (req: Request, res: Response) => {
        try {
            client.apexAuth(req.headers, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) {
                    res.status(response.status).json(response)
                } else {
                    req.body.token = req.headers.token
                    consignmentClient.getApexRecievedfdms(req.body, (err: ServiceError, response: Fdms) => {
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


    transferRecievedFdm : async(req:Request,res:Response) => {
        try {
            client.apexAuth(req.headers, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) {
                    res.status(response.status).json(response)
                } else {
                    req.body.token = req.headers.token
                    consignmentClient.transferApexRecievedFdms(req.body, (err: ServiceError, response: TransferApexSendingFdmRes) => {
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

    searchCpByPin: (req: Request, res: Response) => {
        try {
            client.apexAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
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
            client.apexAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
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
                        console.log(response,'ressp')
                        res.status(response.status).json(response)
                    })
                }
            })
        } catch (error) {

        }
    },


    getReturnSendingFdms : (req: Request, res: Response) => {
        try {
            client.apexAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    consignmentClient.getReturnApexSendingFdms({ token: req.headers.token }, (err: ServiceError, response: any) => {
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
            client.apexAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    consignmentClient.transferReturnApexSendingFdm(req.body, (err: ServiceError, response: any) => {
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
            client.apexAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    consignmentClient.getReturnApexRecievedFdms({ token: req.headers.token }, (err: ServiceError, response: any) => {
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


    transferReturnRecievedFdms : (req: Request, res: Response) => {
        try {
            client.apexAuth({ token: req.headers.token }, (err: ServiceError, response: AuthRes) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'An internal server error occurred.' });
                    return
                }
                if (response.status != 200) res.status(response.status).json(response)
                else {
                    consignmentClient.transferReturnApexRecievedFdm(req.body, (err: ServiceError, response: any) => {
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