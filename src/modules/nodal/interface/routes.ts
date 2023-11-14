import express,{Application} from 'express'
import controller from './controller'
const nodalRoute:Application = express()


nodalRoute.post('/login',controller.login)
nodalRoute.get('/home',controller.home)
nodalRoute.post('/create-cp',controller.createChannelPartner)
nodalRoute.get('/accept-fdm',controller.acceptCpFdm)
nodalRoute.post('/accept-fdm-cp/:id',controller.assignFdmFromCp)
nodalRoute.get('/get-sending-fdms',controller.getSendingFdms)
nodalRoute.post('/transfer-sending-fdm',controller.transferSendingFDM)
nodalRoute.get('/get-recieved-fdms',controller.getRecievedFdms)
nodalRoute.post('/transfer-recieved-fdm',controller.transferRecievedFdm)
nodalRoute.post('/search-by-pincode',controller.searchCpByPin)
nodalRoute.get('/tracking/:awb',controller.consignmentTracking)
nodalRoute.get('/return-sending-fdms',controller.getReturnSendingFdms)
nodalRoute.post('/return-sending-fdm',controller.transferReturnSendingFdms)
nodalRoute.get('/return-recieved-fdms',controller.getReturnRecievedFdms)
nodalRoute.post('/return-recieved-fdms',controller.transferReturnRecievedFdm)







export default nodalRoute

