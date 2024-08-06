import express from "express";
import Connection from "./config/database.js";
import dotenv from "dotenv";
import router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { errorController } from "./controller/error-controller.js";

const __dirname = path.resolve();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);
app.use(errorController);

app.use(express.static(path.join(__dirname,"./client/build")));
app.get('*',function(_,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"),function(error){
      res.status(500).send(error);
    })
})

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL = process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.1tu7ptb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.listen(PORT, (req, res) => {
  console.log(`server is running on port : ${PORT}`);
});

Connection(URL);
