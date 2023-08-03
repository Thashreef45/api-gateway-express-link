import express,{Request,Response} from 'express'
import controller from './controller'

const authRoute = express()

//apex routes
authRoute.post('/apex/login',controller.apexLogin)


//nodal routes
authRoute.post('/nodal/create-nodal')
authRoute.post('/nodal/login')


//channel-partners
authRoute.post('/cp/create-cp')
authRoute.post('/cp/login')


export default authRoute