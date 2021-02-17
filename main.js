/// DECLARATIONS

let express = require('express')
let app = express()

let cors = require('cors')

const bodyParser = require('body-parser')


/// MIDDLEWAREs

app.use(bodyParser.json())

app.use(cors())


        /// Routes
app.use(require('./routes/fetching'))
app.use(require('./routes/searching'))
app.use(require('./routes/authenticating'))
app.use(require('./routes/posting'))



/// MAIN ROUTE 

app.get('/', (req, res) => {

    res.redirect('https://www.google.com') // gotta change later

})



app.listen(5690)