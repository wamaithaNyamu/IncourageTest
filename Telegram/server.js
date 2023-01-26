import dotenv from 'dotenv'
import path from 'path'
import axios from 'axios'
import { Configuration, OpenAIApi } from "openai";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') })


import express from 'express'

const token = process.env.TELEGRAM_API;
const callbackUrl = process.env.CALLBACK_URL;
const claimsURL = process.env.CLAIMS_URL
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const app = express()
app.use(express.json())

const port = process.env.TELEGRAM_SERVICE_PORT 

const TELEGRAM_API = `https://api.telegram.org/bot${token}`
const webhookURI = `/webhook/${token}`
const webhookURL = `${callbackUrl}${webhookURI}`
const usersURL = "http://backend:7000/api/users/"

function extractPhoneNumber(sentence) {
  console.log(sentence);
  const phoneRegex = /^(254)[7-9][0-9]{8}$/;
  const match = sentence.match(phoneRegex);
  console.log(match);
  return match ? match[0] : null;
}


const telegramWebhook = async () => {
  try {
    console.log('Setting up webhook')
    await axios.get(`${TELEGRAM_API}/setWebhook?url=${webhookURL}&drop_pending_updates=true`)
  } catch (error) {
    console.log(error)
    return error
  }
}

const AIResponse = async (prompt, id) => {
  try {
    // console.log('AIResponse', prompt, id,openai)
    // let userInput = await openai.createCompletion({
    //   model: 'text-davinci-002',
    //   prompt: prompt,
    //   max_tokens: 2048,
    // });

    // console.log(userInput.data.choices[0].text)
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: id,
      // text: userInput.data.choices[0].text
      text: prompt
    })


  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    return error
  }

}


app.post(webhookURI, async (req, res) => {
  try {
    const { message: { chat: { id }, photo } } = req.body
    console.log('req.body', req.body)
    const messageFromUser = req.body.message.text && req.body.message.text.toString().toLowerCase();
    // check if the user had started a claim already 
    const checkClaim = await axios.get(`${claimsURL}?telegram_chat_id=${id}`)
    let claimID = null;
    if (checkClaim.data.length > 0) {
      // claim exists
      claimID = checkClaim.data[0]._id;
    }
    else {
      // start claim
      const saveNewClaim = await axios.post(claimsURL, {
        claim_channel: 'telegram',
        telegram_chat_id: id,
      })
      claimID = saveNewClaim._id;
    }
    console.log('claimID', claimID)

    // check if the message contains the word claim
    let word = "claim";
    if (messageFromUser && messageFromUser.includes(word)) {
      // prompt for phone number
      let prompt = 'Can you please provide your phone number in the format 2547xxxxxxxx so that I can assist you better?';
      AIResponse(prompt, id);
      return res.status(200).send('ok')
    } else {


      // check phone number in db
      const phoneNumber = messageFromUser && extractPhoneNumber(messageFromUser);
      if ( phoneNumber) {
        // if phone number is in db      
        const isUser = await axios.get(`${usersURL}?phone=${phoneNumber}`)
        if (isUser.data.length > 0) {
          // update claim with user id
          await axios.put(`${claimsURL}${claimID}`, {
            User_ID: isUser.data._id
          });
          let prompt = 'Based on the information you provided, I can confirm that you are eligible for a claim. Please upload photos of the damage to your vehicle as well as scans of the duly filled claim forms. An agent will be intouch soon.';
          
          
          AIResponse(prompt, id);
          res.status(200).send('ok')
        } else {
          // if phone number is not in db
          let prompt = 'Based on the information you provided, I can confirm that you are not eligible for a claim. Please contact our insurance agent for further assistance on 07XXXXXXXX.';
          AIResponse(prompt, id);
          return res.status(200).send('ok')
        }
      }else if (photo) {
        console.log('photo', photo)
        const  {file_id}  = photo[0]
        const file = await axios.get(`${TELEGRAM_API}/getFile?file_id=${file_id}`)
        const { data: { result: { file_path } } } = file
        const fileUrl = `https://api.telegram.org/file/bot${token}/${file_path}`
        console.log('fileUrl', fileUrl)
        await axios.put(`${claimsURL}attachment/${claimID}`, {
          attachments: [fileUrl]
        })
        AIResponse('Thank you for uploading the photos. An agent will be in touch soon.', id);
       return res.status(200).send('ok')
      }else if (messageFromUser === null) {
        AIResponse('Hello, welcome to Incourage! Please provide me with your phone number to initiate a claim', id);
        return res.status(200).send('ok')
      } else {
        AIResponse('Hello, welcome to Incourage! Please provide me with your phone number to initiate a claim', id);

        return res.status(200).send('ok')
      }


    }
  } catch (error) {
    console.log(error)
  }
})



app.listen(port, async () => {
  console.log(`Telegram Server running on port ${port}`)
  await telegramWebhook()
})

