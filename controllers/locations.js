const locationRouter = require('express').Router()
const Location = require('../models/location')

locationRouter.get('/', async (request, response) => {
    const locations = await Location.find({}).populate('events', { eventName: 1, eventDate: 1 })
    response.json(locations.map(location => location.toJSON()))
})

locationRouter.post('/', async (request, response, next) => {
    const body = request.body

    const location = new Location({
        name: body.name,
        streetName: body.streetName,
        city: body.city,
        postalcode: body.postalcode,
        country: body.country
    })

    savedLocation = await location.save()
    response.json(savedLocation.toJSON())


})

locationRouter.delete('/locations/:id', async (request, response, next) => {
    await Location.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

locationRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const Location = {
        name: body.name,
        streetName: body.streetName,
        city: body.city,
        postalcode: body.postalcode,
        country: body.country
    }

    const updatedLocation = await Location.findByidAndUpdate(request.params.id, location, { new: true })
    response.json(updatedLocation.toJSON())
})

module.exports = locationRouter
