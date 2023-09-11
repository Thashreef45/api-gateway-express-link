import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import {config} from 'dotenv'
config()


const packageDef = protoLoader.loadSync('./src/modules/nodal/config/nodal.proto')
const grpcObject = grpc.loadPackageDefinition(packageDef)
const nodalPackage:any = grpcObject.nodalPackage;

const nodalClient = new nodalPackage.nodalService(process.env.NODAL_PORT,grpc.credentials.createInsecure())
export default nodalClient