let express = require('express')

let router = express.Router()

const Client = require('../models/client')
const Stylistes = require('../models/styliste')


router.post('/client/message', (req, res) => {

    Client.sendMessage(req.body, (err, result) => {

        if (err) {

            res.json({RequestResult: 'ERROR', Code: err['code'], Message: err['sqlMessage']})

        } else {

            res.json({RequestResult: 'SUCCESS' , Message: 'New message sent successfully'})

        }

    })

})


router.post('/styliste/register', (req, res) => {

    Stylistes.register(req.body, (err, result) => {

        if (err) {

            res.json({RequestResult: 'ERROR', Message: err['sqlMessage']})

        } else {

            res.json({RequestResult: 'SUCCESS' , Message: 'New stylist registered successfully'})

        }

    })

})


router.post('/client/order', (req, res) => {

    Client.order(req.body)
        .then( () => res.json({RequestResult: 'SUCCESS', Message: 'New order placed successfully'}) )
        .catch(err => res.json({RequestResult: 'ERROR', Message: err['sqlMessage']}))

})


// router.post('/client/order', (req, res) => {


//     Client.order(req.body, (err, result) => {

//         if (err) {

//             res.json({RequestResult: 'ERROR', Message: err['sqlMessage']})

//         } else {

//             res.json({RequestResult: 'SUCCESS', Message: 'New order placed successfully'})

//         } /// https://stackoverflow.com/questions/63927332/why-am-i-getting-this-unexpected-http-error-in-nodejs

//     })


// })


module.exports = router