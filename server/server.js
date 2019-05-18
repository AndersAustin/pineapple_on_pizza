const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json({urlencoded: true}));
app.use(cors());
app.use(express.static('dist'))


app.get('/api/pineapples', (req, res) => {
    let answer = req.query.answer
    if (answer === 'true') {
        res.send('I  ALSO think that pineapples belong on pizza');
    } else {
        res.send('I ALSO think that pineapples on pizza is bad');
    }
});

const port = process.env.PORT || 3005

app.listen(port, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`connected to server at ${port}`);
    }
});