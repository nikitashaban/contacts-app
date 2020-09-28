module.exports = function () {
  const faker = require("faker");
  const _ = require("lodash");
  return {
    contacts: _.times(100, function (n) {
      return {
        id: n,
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
        creator: "fdsfdsfser23142sdffs"
      }
    })
  }
}