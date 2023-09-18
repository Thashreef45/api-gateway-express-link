import express,{Application} from 'express'
import controller from './controller'

const cpRoute:Application = express()

cpRoute.post('/login',controller.cpLogin)
cpRoute.get('/home',controller.cpHome)
cpRoute.post('/search-by-pincode',controller.searchCpByPin)
cpRoute.post('/buy-awb',controller.buyAwb)
cpRoute.post('/new-booking',controller.newBooking)
cpRoute.post('/validate-awb',controller.validateAwb)
cpRoute.post('/new-booking',controller.newBooking)
cpRoute.get('/get-employees',controller.getEmployees)
cpRoute.post('create-employee')




export default cpRoute