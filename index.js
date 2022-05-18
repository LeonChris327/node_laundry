//initiate server
const express = require('express');
//implement
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//connect to database
const db = require('./db');
db.connect(error => {
          if(error) throw error
          console.log ('database connected')
})

//endpoint
app.get('/', (req, res) => {
          res.send({
                    message: 'Rumah Laundry',
                    data : {
                              description : 'this is a GET endpoint'
                    }
          })
})


app.use ("/user", require('./routes/user.router'));
app.use ("/paket", require('./routes/paket.router'));
app.use ("/login", require('./routes/authentication.router'));


const port = 8080;
app.listen(port, () => console.log (`Server port = ${port}`))

