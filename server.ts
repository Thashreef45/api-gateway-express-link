import Server from "./app";

const port  = String(process.env.PORT)
new Server().start(port)