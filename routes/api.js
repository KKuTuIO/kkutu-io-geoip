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

router.get('/lookup', (req, res, next) => {
    if(!req) return res.error(400)
    if(!req.headers || !req.params) return res.json(invalidMsg)
    if(req.params.key != config.API_KEY) return res.json(invalidMsg)
    if(!req.headers["True-Client-IP"]) return res.json(invalidMsg)

    const geoLocation = geoip.get(req.headers["True-Client-IP"])
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

module.exports = router