const mongoose = require('mongoose')

const Event = mongoose.model('Event',{
    title: {
      type: String,
      required: true
    },
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    venue: {
        type: String,
        required: true
      },
    description:{
        type: String,
        required:true
    },  
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  });
  
  module.exports = Event
  