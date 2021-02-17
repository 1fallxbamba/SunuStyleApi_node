let express = require('express')

let router = express.Router()

const Modeles = require('../models/modele')
const Stylistes = require('../models/styliste')




/// MODELEs

router.get('/modeles', (req, res) => {

    Modeles.all((err, results) => {

        if (err) {

            res.json({RequestResult: 'ERROR', Code: err['code'], Message: err['sqlMessage']})

        } else {

            var modeles = results.map((result) => result['row'])

            res.json(modeles)

        }


    })

})


router.get('/modeles/best', (req, res) => {

    Modeles.bestSellers((err, results) => {

        if (err) {

            res.json({RequestResult: 'ERROR', Code: err['code'], Message: err['sqlMessage']})

        } else {

            var bestModeles = results.map((result) => result['row'])

            res.json(bestModeles)

        }

    })

})


router.get('/modele/:id', (req, res) => {

    Modeles.find(req.params.id, (err, result) => {

        if (err) {

            res.json({RequestResult: 'ERROR', Code: err['code'], Message: err['sqlMessage']})

        } else {

            if (result['row']) {

                res.json(result['row'])

            } else {

                res.json({RequestResult: 'NO-RESULT', Message: 'No Modele has been found'})

            }

        }

    })

})



router.get('/modeles/by/:stylist', (req, res) => {

    Modeles.byStylist(req.params.stylist, (err, modeles) => {

        if (err) {

            res.json(err)

        } else {

            if (Object.keys(modeles['row']).length === 0) {

                res.json({RequestResult: 'NO-RESULT', Message: 'This stylist has no Modeles'})

            } else {

                res.json(modeles['row'])

            }

        }

    })

})



/// STYLISTEs


router.get('/stylistes', (req, res) => {

    Stylistes.all((err, results) => {

        if (err) {

            res.json({RequestResult: 'ERROR', Code: err['code'], Message: err['sqlMessage']})

        } else {

            var stylistes = results.map((result) => result['row'])

            res.json(stylistes)

        }

    })

})


router.get('/styliste/:id', (req, res) => {

    Stylistes.find(req.params.id,(styliste) => {

        res.json(styliste['row'])

    })

})


module.exports = router


