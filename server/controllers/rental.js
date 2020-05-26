const User = require('../models/user');
const Rental = require('../models/rental');
const { normalizeErrors } = require('../helpers/moongose');

exports.secret = function (req, res) {
  res.json({ Secret: true });
};

exports.getRentalsByUser = function (req, res) {
  const user = res.locals.user;

  Rental.where({ user })
    .populate('bookings')
    .exec(function (err, foundRentals) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      return res.json(foundRentals);
    });
};

exports.getRental = function (req, res) {
  const rentalId = req.params.rentalId;

  Rental.findById(rentalId)
    .populate('user', 'username -_id')
    .populate('bookings', 'startAt endAt -_id')
    .exec(function (err, foundRental) {
      if (err) {
        return res.status(442).send({
          errors: [
            {
              title: 'Rental Error',
              detail: 'Could not find the rental',
            },
          ],
        });
      }
      return res.json(foundRental);
    });
};

exports.updateRental = function (req, res) {
  const rentalData = req.body;
  const user = res.locals.user;

  Rental.findById(req.params.id)
    .populate('user')
    .exec(function (err, foundRental) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err) });
      }

      if (foundRental.user.id !== user.id) {
        return res.status(422).send({
          errors: [
            {
              title: 'Invalid user',
              detail: 'You are not the rental owner',
            },
          ],
        });
      }

      foundRental.set(rentalData);
      foundRental.save(function (err) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        return res.status(200).send(foundRental);
      });
    });
};

exports.deleteRental = function (req, res) {
  const user = res.locals.user;

  Rental.findById(req.params.id)
    .populate('user', '_id')
    .populate({
      path: 'bookings',
      select: 'startAt',
      match: { startAt: { $gt: new Date() } },
    })
    .exec(function (err, foundRental) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err) });
      }

      if (user.id !== foundRental.user.id) {
        return res.status(422).send({
          errors: [
            {
              title: 'Invalid user',
              detail: 'You cannot delete others rental',
            },
          ],
        });
      }

      if (foundRental.bookings.length > 0) {
        return res.status(422).send({
          errors: [
            {
              title: 'Active bookings',
              detail: 'You cannot delete a rental with active bookings',
            },
          ],
        });
      }

      foundRental.remove(function (err) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        return res.json({ status: 'deleted' });
      });
    });
};

exports.crateRental = function (req, res) {
  const {
    title,
    city,
    street,
    category,
    image,
    shared,
    bedrooms,
    description,
    dailyRate,
  } = req.body;

  const user = res.locals.user;

  const rental = new Rental({
    title,
    city,
    street,
    category,
    image,
    shared,
    bedrooms,
    description,
    dailyRate,
  });
  rental.user = user;

  Rental.create(rental, function (err, newRental) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    User.update(
      { _id: user._id },
      { $push: { rentals: newRental } },
      function () {}
    );

    return res.json(newRental);
  });
};

exports.getRentals = function (req, res) {
  const city = req.query.city;
  const query = city ? { city: city.toLowerCase() } : {};

  Rental.find(query)
    .select('-bookings')
    .exec(function (err, foundRentals) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (city && foundRentals.length === 0) {
        return res.status(422).send({
          errors: [
            {
              title: 'Rental not found',
              detail: 'None of our rentals match the city ' + city,
            },
          ],
        });
      }

      res.json(foundRentals);
    });
};

exports.verifyUser = function (req, res) {
  const user = res.locals.user;

  Rental.findById(req.params.id)
    .populate('user')
    .exec(function (err, foundRental) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (foundRental.user.id !== user.id) {
        return res
          .status(422)
          .send({
            errors: [
              { title: 'Invalid User!', detail: 'You are not rental owner!' },
            ],
          });
      }

      return res.json({ status: 'verified' });
    });
};
