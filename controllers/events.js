const eventsRouter = require('express').Router()
const Event = require('../models/event')
const Location = require('../models/location')

eventsRouter.get('/', async (request, response) => {
    const events = await Event.find({}).populate('location', { name: 1, streetName: 1, city: 1, postalcode: 1, coutry: 1,})
    response.json(events.map(event => event.toJSON()))
})


eventsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const location = await Location.findById(body.location)

    const event = new Event({
        eventName: body.eventName,
        location: location,
        eventDate: body.eventDate
    })

    try {
        const savedEvent = await event.save()
        response.json(savedEvent.toJSON())
        location.events = location.events.concat(savedEvent._id)
        await location.save()

    } catch (exception) {
        console.log('VIRHE')
    }

})

eventsRouter.delete('/:id', async (request, response, next) => {
    await Event.findByIdAndRemove(request.params.id)
    response.status(204).end()

})

eventsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const Event = {
        eventName: body.eventName,
        location: body.location,
        eventDate: body.eventDate
    }

    const updatedEvent = await Event.findByidAndUpdate(request.params.id, event, { new: true })
    response.json(updatedEvent.toJSON())
       
})

module.exports = eventsRouter