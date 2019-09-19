const mongoose = require('mongoose')

const url = 'mongodb+srv://pakedi:1234@cluster0-aokec.mongodb.net/rajapinnat?retryWrites=true&w=majority'

const locationSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true
    },
     streetName:{
        type: String
    },
    city:{
        type: String,
        required: true
    },
    postalcode:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
        }

    ]
})

locationSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Location', locationSchema)