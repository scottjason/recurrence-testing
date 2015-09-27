var mongoose = require('mongoose');

var activitySchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  dates: {
    start: {
      type: Date
    },
    end: {
      type: Date
    }
  },
  isRecurring: {
    type: Boolean,
  },
  isFirstOccurence: {
    type: Boolean
  },
  recurringId: {
    type: String
  },
  recurring: {
    frequency: {
      type: String
    },
    interval: {
      type: Number
    },
    byDay: {
      type: String
    },
    numOccurrences: {
      type: Number
    },
    expires: {
      type: Date
    }
  }
});


module.exports = mongoose.model('Activity', activitySchema);
