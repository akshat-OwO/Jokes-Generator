const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.render('index');
});

app.post('/', (req, res) =>{
    const query = req.body.jokeType;
    console.log(req.body);
    const url = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw&type=' + query;
    
    https.get(url, (response) =>{
        response.on('data', (data) =>{
            const jokeData = JSON.parse(data);
            console.log(jokeData);
            if(jokeData.type === 'twopart'){
                res.render('twopart', {setup: jokeData.setup, delivery: jokeData.delivery});
            } else{
                res.render('single', {joke: jokeData.joke});
            }
        });
    });
})

app.listen(3000, () =>{
    console.log('Server is up and running');
});