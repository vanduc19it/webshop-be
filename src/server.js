import  express  from "express";
// import bodyParser from "body-parser";
import cors from "cors";
import multer from 'multer';
import bb from "express-busboy";

import initRoutes  from "./routes/web"; 
import connectDB from "./config/connectDB";
const app = express();
// bb.extend(app);

// const upload = multer();
// app.use(upload.array);

// hello js 
connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

app.listen(5000);

