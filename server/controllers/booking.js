const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/moongose');
const moment = require('moment');

exports.createBooking = function(req, res) {
  const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
  const user = res.locals.user;

  const booking = new Booking({
    startAt,
    endAt,
    totalPrice,
    guests,
    days
  });

  Rental.findById(rental._id)
    .populate('bookings')
    .populate('user')
    .exec(function(err, foundRental) {
      if (err) {
        return res
          .status(422)
          .send({ errors: [{ errors: normalizeErrors(err.errors) }] });
      }

      if (foundRental.user.id === user.id) {
        return res.status(422).send({
          errors: [
            {
              title: 'Woops',
              detail: "You can't reserve your own rental"
            }
          ]
        });
      }

      if (isValidBooking(booking, foundRental)) {
        booking.user = user;
        booking.rental = rental;

        foundRental.bookings.push(booking);

        booking.save(function(err) {
          if (err) {
            return res.status(422).send({
              errors: [
                {
                  title: 'Invalid',
                  detail: 'Choosen dates have been already taken'
                }
              ]
            });
          }
        });

        foundRental.save();

        User.update(
          {
            _id: user.id
          },
          {
            $push: {
              bookings: booking
            }
          },
          function() {}
        );

        return res.json({ startAt: booking.startAt, endAt: booking.endAt });
      } else {
        return res.status(422).send({
          errors: [
            {
              title: 'Invalid',
              detail: 'Choosen dates have been already taken'
            }
          ]
        });
      }
    });
};

function isValidBooking(proposedBooking, rental) {
  let isValid = true;

  if (rental.bookings && rental.bookings.length > 0) {
    isValid = rental.bookings.every(function(booking) {
      const proposedStart = moment(proposedBooking.startAt);
      const proposedEnd = moment(proposedBooking.endAt);
      const actualStart = moment(booking.startAt);
      const actualdEnd = moment(booking.endAt);

      return (
        (actualStart < proposedStart && actualdEnd < proposedStart) ||
        (proposedEnd < actualdEnd && proposedEnd < actualStart)
      );
    });
  }
  return isValid;
}
