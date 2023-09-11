//gRPC Dialer
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import env from 'dotenv'
env.config()

const packageDef = protoLoader.loadSync('./src/modules/auth/config/auth.proto', {})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const authPackage: any = grpcObject.authPackage;
const client = new authPackage.authService(process.env.AUTH_PORT,grpc.credentials.createInsecure())


export default client
