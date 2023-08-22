import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { config } from 'dotenv'
config()

const packageDef = protoLoader.loadSync('src/modules/cp/config/cp.proto')
const grpcObject = grpc.loadPackageDefinition(packageDef)
const cpPackage:any = grpcObject.cpPackage;

const cpClient = new cpPackage.cpService(process.env.CP_PORT,grpc.credentials.createInsecure())

export default cpClient
