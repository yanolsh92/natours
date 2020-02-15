const mongoose = require('mongoose');
const AppError = require('./../utils/appError');
const Tour = require('./tourModel');

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Booking must belong to a Tour!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!']
  },
  price: {
    type: Number,
    require: [true, 'Booking must have a price.']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    default: true
  },
  date: mongoose.Schema.ObjectId,
  ref: 'date'
});

bookingSchema.pre(/^find/, function(next) {
  this.populate('user').populate({
    path: 'tour',
    select: 'name'
  });
  next();
});

bookingSchema.pre('save', async function(next) {
  const tour = await Tour.findById(this.tour);
  console.log(tour.startDates);
  console.log(this.date);
  const startDate = tour.startDates.id(this.date);

  // If there is a maximum number of participants, throw an error.
  if (startDate.participants >= startDate.maxParticipants)
    return next(
      new AppError(
        'Sorry, but this tour has a maximum number of participants already. Please book another date.'
      )
    );

  startDate.participants += 1;
  await tour.save();
  next();
});
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
