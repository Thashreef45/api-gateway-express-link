import express,{Request,Response} from 'express'
const authRoute = express()

//apex routes
authRoute.post('/apex/login')


//nodal routes
authRoute.post('/nodal/create-nodal')
authRoute.post('/nodal/login')


//channel-partners
authRoute.post('/cp/create-cp')
authRoute.post('/cp/login')


export default authRoute