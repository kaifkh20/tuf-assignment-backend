import express from "express"
import { PrismaClient } from "@prisma/client"
import {createClient} from "redis"

export const page2 = express.Router()

const prisma = new PrismaClient()

// const client = createClient()

// client.on('error', err => console.log('Redis Client Error', err));

// await client.connect();


function convertToString(data){
    return data.toString()
}




page2.get("/data",async(req,res)=>{
    const submissions = await prisma.submission.findMany({
        include : {
            sourceCode : true
        }
    })
    submissions.map((submission)=>{
        submission.sourceCode = convertToString(submission.sourceCode[0].sourceCode)
        submission.submissionTimeStamp = submission.submissionTimeStamp.toLocaleString()
    })

    // submission.sourceCode = submission.sourceCode[0].sourceCode

    // await client.set("data_array",JSON.stringify(submissions)) 

    // console.log( JSON.parse( await client.get("data_array")));

    res.json(submissions)
})