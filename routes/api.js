const express = require('express')
const router = express.Router()
const maxmind = require('maxmind')
const config = require('../config.json')

maxmind.open(config.MAXMIND_MMDB_PATH).then((lookup) => {
    router.get('/lookup', (req, res, next) => {
        if(!req) return res.error(400)
        if(!req.headers || !req.params) return res.error(400)
        if(req.params.key != config.API_KEY) return res.error(400)
        if(!req.headers["True-Client-IP"]) return res.error(400)

        const geoLocation = lookup.get(req.headers["True-Client-IP"])
        res.json({
            "status": 200,
            "message": "OK",
            "geoLocation": {
                "country": geoLocation.country.iso_code,
                "country_registered": geoLocation.registered_country.iso_code,
                "continent": geoLocation.country.continent
            }
        })
        console.log(`GET /lookup from ${req.headers["True-Client-IP"]}, ${geoLocation.country.iso_code}`)
    })
})

module.exports = router