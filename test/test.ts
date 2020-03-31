const assert = require("chai").assert;
const expect = require("chai").expect;
const { Purchase } = require("../src/purchase.ts");

var purchase = new Purchase();

describe("Including the Internet connection ", () => {
  it("should return price 200, when input is true", () => {
    assert.equal(purchase.setInternetConnection(true), 200);
  });
  it("should return price 0, when input is true false", () => {
    assert.equal(purchase.setInternetConnection(false), 0);
  });
});
