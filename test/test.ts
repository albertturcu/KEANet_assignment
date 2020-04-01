const assert = require("chai").assert;
const expect = require("chai").expect;
const { Purchase } = require("../src/purchase.ts");
const sinon = require("sinon");

describe("#purchase", () => {
  let purchase = new Purchase();
  let internetCProvider: any = [
    { input: true, result: 200 },
    { input: false, result: 0 }
  ];
  let phoneLinesIncreaseProvider: any = [
    { incremental: 0, result: 0 },
    { incremental: 1, result: 150 },
    { incremental: 4, result: 600 },
    { incremental: 7, result: 1050 },
    { incremental: 8, result: 1200 },
    { incremental: 9, result: 1200 }
  ];
  let cellPhonePricesProvider: any = [
    { model: "moto", price: 800 },
    { model: "iphone", price: 6000 },
    { model: "samsung", price: 1000 },
    { model: "sony", price: 900 },
    { model: "huawei", price: 900 }
  ];

  describe("Including the Internet connection", () => {
    internetCProvider.forEach(({ input, result }) => {
      it(`should return price ${result}, when input is ${input}`, () => {
        assert.equal(purchase.setInternetConnection(input), result);
      });
    });
  });

  describe("Increase Phone Lines", () => {
    afterEach(() => {
      purchase._price = 0;
      purchase.phoneLines = 0;
    });

    phoneLinesIncreaseProvider.forEach(({ incremental, result }) => {
      it(`should return price ${result}, when ${incremental} phone line/s has/have been selected`, () => {
        for (let index = 0; index < incremental; index++) {
          purchase.increasePhoneLines();
        }
        assert.equal(purchase._price, result);
      });
    });
  });

  describe("Decrease Phone Lines", () => {
    it(`should return price 0, when 0 phone lines have been decreased`, () => {
      purchase.decreasePhoneLines();
      assert.equal(purchase._price, 0);
    });

    it(`should return price old price - 150, when 1 phone line have been decreased`, () => {
      purchase.increasePhoneLines();
      let oldPurchasePrice: number = purchase._price;
      purchase.decreasePhoneLines();
      assert.equal(purchase._price, oldPurchasePrice - 150);
    });
  });

  describe("Select Cell phones", () => {
    afterEach(() => {
      purchase._price = 0;
      purchase.cellPhones = [];
    });

    it("Should push new cell phone to cell phones list", () => {
      cellPhonePricesProvider.forEach(({ model }) => {
        purchase.selectCellPhone(model);
        assert.isTrue(purchase.cellPhones.includes(model));
      });
    });

    it("Throws unexpected cell phone model error ", () => {
      assert.throws(() => {
        purchase.selectCellPhone("Unkown model name");
      }, "Unexpected cell phone model");
    });

    cellPhonePricesProvider.forEach(({ model, price }) => {
      it(`should return price ${price}, when ${model} phone added`, () => {
        assert.equal(purchase.selectCellPhone(model), price);
      });
    });
  });

  describe("Deselect Cell phones", () => {
    afterEach(() => {
      purchase._price = 0;
      purchase.cellPhones = [];
    });

    it("Throws model name not found error", () => {
      cellPhonePricesProvider.forEach(({ model }) => {
        assert.throws(() => {
          purchase.deselectCellPhone(model);
        }, "Model name not found");
      });
    });

    cellPhonePricesProvider.forEach(({ model, price }) => {
      let oldPrice: number = 0;
      it(`should decrease price by ${price}, when ${model} phone removed`, () => {
        purchase.selectCellPhone(model);
        oldPrice = purchase._price;
        assert.equal(purchase.deselectCellPhone(model), oldPrice - price);
      });
    });
  });

  describe("Buy", () => {
    it('should return "Please select something" if price 0', () => {
      assert.equal(purchase.buy(), "Please select something!");
    });

    it("should return list of selected items", () => {
      purchase.setInternetConnection(true);
      purchase.increasePhoneLines();
      purchase.selectCellPhone('moto');

      assert.equal(
        purchase.buy(),
        "You have selected the following:\n\n             Internet connection: true \n\n             Phone lines: 1 \n\n             Cell phone: moto \n"
      );
    });
  });

  describe("Getter and setter price variable", () => {
    let spy = sinon.spy(purchase, "price", ["get", "set"]);;

    it('Should return correct price', () => {
      purchase.price = 150;
      assert(spy.set.calledOnce);
      assert.equal(purchase.price, 150);
      assert(spy.get.calledOnce);
    });
  });
});
