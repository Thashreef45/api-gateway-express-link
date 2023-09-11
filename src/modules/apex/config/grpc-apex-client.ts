//gRPC Dialer
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { config } from 'dotenv'
config()

const packageDef = protoLoader.loadSync('./src/modules/apex/config/apex.proto')
const grpcObject = grpc.loadPackageDefinition(packageDef)
const apexPackage: any = grpcObject.apexPackage;
const apexClient = new apexPackage.apexService(process.env.APEX_PORT,grpc.credentials.createInsecure())

export default apexClient

