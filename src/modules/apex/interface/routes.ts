import express,{Application} from 'express'
import controller from './controller'
const apexRoute:Application = express()


apexRoute.post('/login',controller.login)
apexRoute.post('/create-nodal',controller.nodalCreation)
apexRoute.get('/home',controller.Home)





export default apexRoute

