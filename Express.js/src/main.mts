import express from "express";
import { objectValid } from "./logic/objectValid.mjs";

// using localhost as default or any other if specified (e.g. in docker)
export const springDomain = (process.argv[2]) ? `http://${process.argv[2]}:4002` : "http://localhost:4002";


const app = express();
const port = 4001;


app.use(express.json());


// assuming that every post request has a request body
app.post("/**", (req, res, next) => {

    if (!objectValid(req.body)) {
        res.send("Invalid request body.");
        return;
    }
    
    next();
});


// handling unknown URLs
app.use("*", (req, res, next) => {

    res.send(`Something wrong with this url.`);
});


app.listen(port, () => console.log(`Listening on port ${port}.`));