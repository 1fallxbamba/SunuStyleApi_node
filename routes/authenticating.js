let express = require('express')

let router = express.Router()

const Auth = require('../models/authenticator')


router.get('/auth/isvalid/:uname', (req, res) => {

    Auth.validateUsername(req.params.uname, (err, result) => {

        if (err) {

            res.json({RequestResult: 'ERROR', Code: err['code'], Message: err['sqlMessage']})

        } else {

            if (result['row'] === undefined || result['row'] === null) {

                res.json({RequestResult : 'VALID', Description: 'This username is available'})
    
            } else {
    
                res.json({RequestResult : 'INVALID', Description: 'This username is not available'})
    
            }

        }

    })

})


module.exports = router