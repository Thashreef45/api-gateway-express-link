import { Request, Response, response } from 'express'
import nodalClient from '../config/grpc-nodal-client'
import client from '../../auth/config/grpc-client'
import { AuthRes, CreateCpRes, HomeRes, LoginRes } from '../types/interfaces'
import cpClient from '../../cp/config/grpc-cp-client'
import { ServiceError } from '@grpc/grpc-js'

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
                    cpClient.fdmToNodal({token: req.headers.token }, (err: ServiceError, response: any) => {
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
    }



}