import express,{Application} from 'express'
import controller from './controller'
const apexRoute:Application = express()


apexRoute.post('/login',controller.login)
apexRoute.post('/create-nodal',controller.nodalCreation)
apexRoute.get('/home',controller.Home)
apexRoute.get('/get-sending-fdms',controller.getSendingFdms)
apexRoute.post('/transfer-sending-fdm',controller.transferSendingFdm)
apexRoute.get('/recieved-fdms',controller.getApexRecievedfdms)
apexRoute.post('/transfer-recieved-fdms',controller.transferRecievedFdm)
apexRoute.post('/search-by-pincode',controller.searchCpByPin)
apexRoute.get('/tracking/:awb',controller.consignmentTracking)
apexRoute.get('/return-sending-fdms',controller.getReturnSendingFdms)
apexRoute.post('/return-sending-fdm',controller.transferReturnSendingFdms)
apexRoute.get('/return-recieved-fdms',controller.getReturnRecievedFdms)
apexRoute.post('/return-recieved-fdms',controller.transferReturnRecievedFdms)











export default apexRoute

