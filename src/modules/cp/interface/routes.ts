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
cpRoute.post('/create-employee',controller.createEmployee)
cpRoute.get('/get-consignment-types',controller.getConsignmentTypes)
cpRoute.get('/get-my-bookings/:pincode',controller.getMyBookings)
cpRoute.delete('/delete-booking/:id',controller.deleteBookedConsignment)
cpRoute.post('/get-booking-history',controller.getBookingHistory)
cpRoute.get('/tracking/:awb',controller.consignmentTracking)
cpRoute.get('/get-recieved-fdm',controller.getRecievedFdm)
cpRoute.post('/assign-fdm',controller.assignFdmToEmployee)
cpRoute.get('/assigned-fdms/:id',controller.getEmployeeAssignedFdms)
cpRoute.get('/delivery-status',controller.getDeliveryStatus)
cpRoute.post('/update-delivery-status',controller.updateDeliveryStatus)
cpRoute.get('/employee/:id',controller.getEmployeeDetail)





export default cpRoute