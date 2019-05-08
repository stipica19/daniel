const express = require('express');
const sendMail = require('./mail');
const log = console.log;
var bodyParser       = require("body-parser");
const app = express();
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}));

const PORT = 8000;


// Data parsing
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());




app.use(express.static('views'));
app.set("view engine", "ejs");

// email, subject, text
app.post('/email', (req, res) => {
    const { subject, email, text,first_name} = req.body;
    console.log('Data: ', req.body);

    sendMail(email, subject, text,first_name ,function(err, data) {
        if (err) {
            res.status(500).json({ message: 'Internal Error :(' });
        } else {
            res.json({ message: 'Email sent :D' });
        }
    });
});



app.get('/', (req, res) => {
    res.render("index"); 
});


app.listen(PORT, () => log('Server is starting on PORT, ', 8000));