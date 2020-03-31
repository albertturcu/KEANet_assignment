const assert = require("chai").assert;
const expect = require("chai").expect;
const { Purchase } = require("../src/purchase.ts");

// Unit tests
describe("Including the Internet connection ", () => {
  var purchase = new Purchase();
  it("should return price 200, when input is true", () => {
    assert.equal(purchase.setInternetConnection(true), 200);
  });
  it("should return price 0, when input is true false", () => {
    assert.equal(purchase.setInternetConnection(false), 0);
  });
});
describe("Increase Phone Lines", () => {
  it("should return price 150, when 1 phone line has been selected", () => {
    var purchase = new Purchase();
    assert.equal(purchase.increasePhoneLines(), 150);
  });
  it("should return price 1200, when 8 phone lines has been selected", () => {
    var purchase = new Purchase();
    for (let index = 0; index < 7; index++) {
      purchase.increasePhoneLines();
    }
    assert.equal(purchase.increasePhoneLines(), 1200);
  });
});
