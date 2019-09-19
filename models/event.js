const mongoose = require('mongoose')




const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
    },
    location:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }
})

eventSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


module.exports = mongoose.model('Event', eventSchema)