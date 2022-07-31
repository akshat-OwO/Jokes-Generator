const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) =>{
    const query = req.body.jokeType;
    console.log(query);
    const url = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw&type=' + query;
    
    https.get(url, (response) =>{
        response.on('data', (data) =>{
            const jokeData = JSON.parse(data);
            console.log(jokeData);
            if(jokeData.type === 'twopart'){
                res.setHeader('Content-type', 'text/html');
                res.write(`<h1>${jokeData.setup}</h1>`)
                res.write(`<h2>${jokeData.delivery}</h2>`)
                res.send();
            } else{
                res.setHeader('Content-type', 'text/html');
                res.write(`<h1>${jokeData.joke}</h1>`);
                res.send();
            }
        });
    });
})

app.listen(3000, () =>{
    console.log('Server is up and running');
});