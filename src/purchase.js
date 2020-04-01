var Purchase = /** @class */ (function () {
    function Purchase() {
        this.internetConnection = false;
        this._price = 0;
        this.phoneLines = 0;
        this.cellPhones = [];
    }
    Purchase.prototype.setInternetConnection = function (state) {
        this.internetConnection = state;
        this.internetConnection ? (this._price += 200) : (this._price -= 200);
        return this._price;
    };
    Purchase.prototype.increasePhoneLines = function () {
        if (this.phoneLines >= 8) {
            return this._price;
        }
        this.phoneLines++;
        this._price += 150;
        return this._price;
    };
    Purchase.prototype.decreasePhoneLines = function () {
        if (this.phoneLines == 0)
            return this._price;
        this.phoneLines--;
        this._price -= 150;
        return this._price;
    };
    Purchase.prototype.selectCellPhone = function (modelName) {
        this.cellPhones.push(modelName);
        switch (modelName) {
            case "moto":
                this._price += 800;
                break;
            case "iphone":
                this._price += 6000;
                break;
            case "samsung":
                this._price += 1000;
                break;
            case "sony":
                this._price += 900;
                break;
            case "huawei":
                this._price += 900;
                break;
            default:
                throw new Error('Unexpected cell phone model');
        }
        return this._price;
    };
    Purchase.prototype.deselectCellPhone = function (modelName) {
        if (!this.cellPhones.includes(modelName) || !this.cellPhones.length)
            throw new Error('Model name not found');
        var index = this.cellPhones.indexOf(modelName);
        this.cellPhones.splice(index, 1);
        switch (modelName) {
            case "moto":
                this._price -= 800;
                break;
            case "iphone":
                this._price -= 6000;
                break;
            case "samsung":
                this._price -= 1000;
                break;
            case "sony":
                this._price -= 900;
                break;
            case "huawei":
                this._price -= 900;
                break;
        }
        return this._price;
    };
    Purchase.prototype.buy = function () {
        if (this._price === 0) {
            return "Please select something!";
        }
        else {
            return "You have selected the following:\n\n             Internet connection: " + this.internetConnection + " \n\n             Phone lines: " + this.phoneLines + " \n\n             Cell phone: " + this.cellPhones + " \n";
        }
    };
    Object.defineProperty(Purchase.prototype, "price", {
        get: function () {
            return this._price;
        },
        set: function (value) {
            this._price = value;
        },
        enumerable: true,
        configurable: true
    });
    return Purchase;
}());
