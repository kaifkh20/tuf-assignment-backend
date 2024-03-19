import express from "express"
import { PrismaClient } from "@prisma/client"
import cors from "cors"


import { page1 } from "./routers/page1.js"
import { page2 } from "./routers/page2.js"

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

app.use(page1)
app.use(page2)

prisma.$connect()

app.listen("3000",()=>{
    console.log("Listening at 3000");
})