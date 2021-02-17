let express = require('express')

let router = express.Router()

const Modeles = require('../models/modele')
const Stylistes = require('../models/styliste')



router.get('/search/modele/:name', (req, res) => {

    Modeles.search(req.params.name, (err, results) => {

        if (err) {

            res.json(err)

        } else {

            if (Object.keys(results['row']).length === 0) {

                res.json({RequestResult: 'NO-RESULT', Message: 'No Modele matching that name has been found'})

            } else {

                res.json(results['row'])

            }

        }

    })

})


router.get('/search/styliste/:name', (req, res) => {

    Stylistes.search(req.params.name, (err ,results) => {

        if (err) {

            res.json(err)

        } else {

            if (Object.keys(results['row']).length === 0) {

                res.json({RequestResult: 'NO-RESULT', Message: 'No Styliste matching that name has been found'})

            } else {

                res.json(results['row'])

            }

        }

    })

})


module.exports = router