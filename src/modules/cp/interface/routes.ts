import express,{Application} from 'express'
import controller from './controller'

const cpRoute:Application = express()

cpRoute.get('/home',controller.cpHome)
cpRoute.post('/search-by-pincode',controller.searchCpByPin)
cpRoute.post('/buy-awb',controller.buyAwb)
cpRoute.post('/new-booking',controller.newBooking)


export default cpRoute