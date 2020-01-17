const Rental = require("./rental");
const User = require("./user");
const Booking = require("./booking");

const MockData = require("./data.json");

class FakeDb {
  constructor() {
    this.rentals = MockData.rentals;

    this.users = MockData.users;
  }

  pushDataToDb() {
    const user = new User(this.users[0]);
    // const user1 = new User(this.users[1]);

    this.rentals.forEach(rental => {
      const newRental = new Rental(rental);
      newRental.user = user;
      user.rentals.push(newRental);
      newRental.save();
    });

    user.save();
    // user1.save();
  }

  async cleanDb() {
    await User.remove({});
    await Rental.remove({});
    await Booking.remove({});
  }

  async seedDb() {
    await this.cleanDb();
    this.pushDataToDb();
  }
}
module.exports = FakeDb;
