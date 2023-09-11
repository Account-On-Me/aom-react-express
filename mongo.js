import mongoose from "mongoose";
import { config } from "./config.js";

console.log("Connecting to database..."+config.mongodb.uri);
mongoose.connect(config.mongodb.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected.");
}).catch(e => {
    console.log("Cannot connect to database.", e);
});

export default mongoose;