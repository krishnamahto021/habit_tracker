const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  habit: {
    type: String,
    required: true
  },
  dates:[{
    date:{
    type: Date,
    required: true
    }
  }]
});

const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);

module.exports = CalendarEvent;
