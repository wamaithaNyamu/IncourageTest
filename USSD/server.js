const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const claimsURL = process.env.CLAIMS_URL

app.post('/ussd',async (req, res) => {
    // Read the variables sent via POST from our API
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;

    console.log(req.body);
    let response = '';

    if (text == '') {
        // This is the first request. Note how we start the response with CON
        response = `CON What would you like to check
        1. Check if you have a claim
        2. Initiate a claim`;
    } else if ( text == '1') {
        // Business logic for first level response
        // This is a second level response where the user selected 1 in the first instance

        const checkClaim = await axios.get(`${claimsURL}/ussd/${phoneNumber}`)
        if (checkClaim.data.length > 0) {
            response = `END You have a claim`;
        }else{
            response = `END You have no claim`;
        }

    } else if ( text == '2') {

         await axios.post(`${claimsURL}/ussd/${phoneNumber}`, {
            "claim_channel":"ussd"
        })
        // Business logic for first level response
        // This is a terminal request. Note how we start the response with END
        response = `END A claim has been initiated. An agent will contact you shortly`;
    } 
    // Send the response back to the API
    res.set('Content-Type: text/plain');
    res.send(response);
});


app.listen(8080, () => console.log('USSD app listening on port 8080!'));
