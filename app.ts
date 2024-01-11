import express,{Application} from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import logger from 'morgan'
import nocache from 'nocache'
import env from 'dotenv'
import cpRoute from './src/modules/cp/interface/routes'
import nodalRoute from './src/modules/nodal/interface/routes'
import apexRoute from './src/modules/apex/interface/routes'


class Server{
    public app : Application
    constructor(){
        this.app = express()
        this.initializeMiddlewares()
        this.initializeRoutes()
        env.config()
    }

    private initializeMiddlewares():void{
        this.app.use(cors())
        this.app.use(helmet())
        this.app.use(compression())
        this.app.use(logger('dev'))
        this.app.use(express.json())
        this.app.use(nocache())
    }

    private initializeRoutes():void{
        this.app.use('/cp',cpRoute)
        this.app.use('/nodal',nodalRoute)
        this.app.use('/apex',apexRoute)
    }

    public start(port:string):void{
        this.app.listen(port,()=>console.log(`api-gateway is running at port:${port}`))
    }
}

export default Server

