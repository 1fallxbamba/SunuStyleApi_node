let connection = require('../config/database')

class Authenticator {

    constructor(row) {

        this.row = row

    }


    static validateUsername(uname, callbackfn) {

        connection.query('SELECT username FROM user WHERE username = ?', [uname], (err, rows) => {

            if (err) {

                callbackfn(err)

            } else {

                callbackfn(null, new Authenticator(rows[0]))

            }

        })

    }

}

module.exports = Authenticator