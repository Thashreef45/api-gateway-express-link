import express,{Application} from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import logger from 'morgan'
import nocache from 'nocache'
import env from 'dotenv'
import authRoute from './src/modules/auth/interface/routes'
// import 


class Server{
    public app : Application
    constructor(){
        this.app = express()
        this.initializeMiddlewares()
        this.initializeRoutes()
        env.config()
    }

    private initializeMiddlewares(){
        this.app.use(cors())
        this.app.use(helmet())
        this.app.use(compression())
        this.app.use(logger('dev'))
        this.app.use(express.json())
        this.app.use(nocache())
    }

    private initializeRoutes(){
        // this.app.get('/',(req,res)=>res.json({mes:"api gateway"}))
        this.app.use('/',authRoute)
        // this.app.use('/apex',apexRoute)
    }

    public start(port:string){
        this.app.listen(port,()=>console.log(`api-gateway is running at port:${port}`))
    }
}

export default Server

