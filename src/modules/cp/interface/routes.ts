import express,{Application} from 'express'
import controller from './controller'

const cpRoute:Application = express()

cpRoute.get('/home',controller.cpHome)
cpRoute.post('/search-by-pincode',controller.searchCpByPin)


export default cpRoute