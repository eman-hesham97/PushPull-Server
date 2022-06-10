const express = require('express');
const cors = require('cors');
const { response } = require('express');


const app = express();
app.use(cors());
app.use(express.json())

const messages =[];
app.post('/messages', (req,res)=>{
    const {body} = req;
    const myDate = Date();
    console.log({...body, myDate});
    messages.push({...body, myDate});
    res.sendStatus(204);
})


app.get('/messages',(req,res)=>{
    const arrLength = req.query.arrlength;
    console.log(arrLength);
    res.json(messages.slice(arrLength))
})


// long polling
const subscribers = {};

app.get('/long-messages', (req,res)=>{
const ID = Math.ceil(Math.random()*10000);
subscribers[ID] = res;

});


app.post('/long-messages', (req,res)=>{
    const {body} = req;
    Object.entries(subscribers).forEach(([ID,response])=>{
        response.json(body);
        delete subscribers[ID]
    });
    res.sendStatus(204);
    })

// //////////////////////////////////////////////
app.listen(3000,()=>{
    console.log("Wohoooo, The app works on port 3000!");
})