import Server from "./src/app";

new Server().start(String(process.env.PORT))