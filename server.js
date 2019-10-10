const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const public = '/public';
const img = '/rec/img/';
app.use(express.static('public'));


app.get('/', function(req, res) {
    save("imdex", Date.now());
    res.sendFile(path.join(__dirname, public, 'index.html'));
});

app.get('/me', function(req, res) {
    save("me", Date.now());
    res.sendFile(path.join(__dirname, public, 'me.html'));
});



//TooDo
app.get('/TooDo', function(req, res) {
    save("TooDos", Date.now());
    res.sendFile(path.join(__dirname, img, 'TooDo.png'));
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));


// do write json
const fs = require('fs');

function save(name, timeStamp) {
    var nodesJsonName = "./nodes.json";


    let jsonData = require(nodesJsonName);
    //console.log( new Date().getTime());
    if (jsonData[name]) {
        jsonData[name].push(timeStamp);
    } else {
        jsonData[name] = [timeStamp]
    }


    let data = JSON.stringify(jsonData, null, 2);

    fs.writeFile(nodesJsonName, data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });


    console.log('This is after the write call');

    console.log(jsonData);
}