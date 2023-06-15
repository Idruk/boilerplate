import express, { json, urlencoded } from 'express'
import http from "http";
import cors from 'cors';

import router from './router';
import errorMiddleware from './routes/middlewares/errorMiddleware'

import "./initializers/index"

const app = express()

app.use(cors)
app.use(json())
app.use(urlencoded())

app.use(router)

app.use(errorMiddleware)


const server = http.createServer(app);

export default server;