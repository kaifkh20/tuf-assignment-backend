import express from "express"
import { PrismaClient } from "@prisma/client"
import { createClient } from "redis"

export const page1 = express.Router()

const prisma = new PrismaClient()

// const client = createClient()
// await client.connect()

const languageId = {
    "C++" : 54,
    "Java" : 62,
    "JavaScript" : 63,
    "Python" : 71
}

const API_KEY = process.env.API_KEY

  
async function createSubmission(codeLanguage,sourceCode,stdInput){

    const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        body: JSON.stringify({
          language_id: languageId[codeLanguage],
          source_code: sourceCode,
          stdin: stdInput
        })
      }
      
      const url = 'https://judge0-ce.p.rapidapi.com/submissions';
      
      const params = {
        base64_encoded: 'true',
        fields: 'stdout,stderr'
      }

      try {
        const response = await fetch(url, {
          ...options,
          params,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        return data.token
      
    } 
      catch (error) {
        console.error(error)
      }
}

async function getSubmissionDetails(submissionToken){

    const submissionId = submissionToken; 

    const url = `https://judge0-ce.p.rapidapi.com/submissions/${submissionId}`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }, 
      }

    const params = {
        base64_encoded: 'true',
        fields: 'stdout,stderr'
    };


    try {
        const response = await fetch(url, {
            ...options,
            params
        
        });

        if (!response.ok) {
        throw new Error(`Judge0 error: ${response.statusText}`);
        }

        const data = await response.json();

        // console.log(data);

        if(data.stderr === null){
            return data.stdout
        }

        return data.stderr

    } catch (error) {
        return new Error(error)
        console.error(error);
    }

}

page1.post("/form",async(req,res)=>{
    // console.log(req.body);
    const {username,language,stdinput,sourceCode} = req.body
    
    const bufferedSourceCode = Buffer.from(Buffer.from(sourceCode,'utf-8').toString('base64'),'base64')

    const submissionTimeStamp = new Date()
    

    try{

        const sourceCodeSubmission = await prisma.sourceCode.create({
            data : {
                sourceCode : bufferedSourceCode
            }
        })

        const submissionToken = await createSubmission(language,sourceCode,stdinput)

        const sourceCodeId = sourceCodeSubmission.id

        const submissionOutput = await getSubmissionDetails(submissionToken)
        

        const submission = await prisma.submission.create({
            data : {
                username,
                codeLanguage : language,
                stdInput : stdinput,
                sourceCode : {
                    connect : {
                        id : sourceCodeId
                    }
                },
                submissionOutput : submissionOutput,
                submissionToken : submissionToken,
                submissionTimeStamp
            }
        })

        
        if(submissionOutput===null){

                const submissionOutput = await getSubmissionDetails(submissionToken)
    
                await prisma.submission.update({
                    data:{
                        submissionOutput
                    },
                    where:{
                        id : submission.id
                    }
                })
    
                // console.log(submissionOutput);
        }

        res.status(200).send(submission)

    }catch(e){
        console.error(e)
        res.status(400).send("Something Occured")
    }

})
