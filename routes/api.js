const geoip = require('geoip-country')
const express = require('express')
const router = express.Router()
const config = require('../config.json')
const invalidMsg = {
    "status": 400,
    "message": "Invalid",
    "geoLocation": {
        "country": "INVALID",
        "country_registered": "INVALID",
        "continent": "INVALID"
    }
}

router.get('/:ip/:key', (req, res, next) => {
    try {
        if(!req) return res.error(400)
        if(!req.params) return res.json(invalidMsg)
        if(req.params.key != config.API_KEY) return res.json(invalidMsg)
        if(!req.params.ip) return res.json(invalidMsg)

        const geoLocation = geoip.lookup(req.params.ip)
        res.json({
            "status": 200,
            "message": "OK",
            "geoLocation": {
                "country": geoLocation.country.iso_code,
                "country_registered": geoLocation.registered_country.iso_code,
                "continent": geoLocation.country.continent
            }
        })
        console.log(`GET /lookup from ${req.params.ip}, ${geoLocation.country.iso_code}`)

    } catch (e) {
        console.error(`[ERROR] ${e}`)
    }
})

module.exports = router