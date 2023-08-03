import Server from "./app";

new Server().start(String(process.env.PORT))