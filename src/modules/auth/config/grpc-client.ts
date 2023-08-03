import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'

const packageDef = protoLoader.loadSync('auth.proto',{})
const grpcObject = grpc.loadPackageDefinition(packageDef)
const authPackage:any = grpcObject.authPackage;

const client = new authPackage.authService(process.env.AUTH_PORT,
    grpc.credentials.createInsecure())
export default client