import express,{Application} from 'express'
import controller from './controller'
const nodalRoute:Application = express()


nodalRoute.post('/login',controller.login)
nodalRoute.get('/home',controller.home)
nodalRoute.post('/create-cp',controller.createChannelPartner)
nodalRoute.get('/accept-fdm',controller.acceptCpFdm)
nodalRoute.get('/accept-fdm-cp/:id',controller.assignFdmFromCp)





export default nodalRoute

