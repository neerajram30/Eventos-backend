const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
  {
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  });
  
  module.exports = mongoose.model('Events', eventSchema)
  