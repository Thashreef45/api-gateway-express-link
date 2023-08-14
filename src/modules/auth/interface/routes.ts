import express,{Request,Response} from 'express'
import controller from './controller'

const authRoute = express()

//apex routes
authRoute.post('/apex/login',controller.apexLogin) 
authRoute.post('/apex/create-nodal',controller.nodalCreation)


//nodal routes
authRoute.post('/nodal/login',controller.nodalLogin)
authRoute.post('/nodal/create-cp',controller.createCP)


//channel-partners
authRoute.post('/cp/login',controller.cpLogin)
authRoute.post('/cp/hi',controller.hi)



export default authRoute