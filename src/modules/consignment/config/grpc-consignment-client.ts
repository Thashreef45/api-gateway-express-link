import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { config } from 'dotenv'
config()

const packageDef = protoLoader.loadSync('./src/modules/consignment/config/consignment.proto')
const grpcObject = grpc.loadPackageDefinition(packageDef)
const consignmentPackage:any = grpcObject.consignmentPackage;
const consignmentClient = new consignmentPackage.consignmentService(process.env.CONSIGNMENT_PORT,grpc.credentials.createInsecure());

export default consignmentClient


