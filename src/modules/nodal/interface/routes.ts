import express,{Application} from 'express'
import controller from './controller'
const nodalRoute:Application = express()


nodalRoute.post('/login',controller.login)
nodalRoute.get('/home',controller.home)
nodalRoute.post('/create-cp',controller.createChannelPartner)




export default nodalRoute

