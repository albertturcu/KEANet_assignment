export class Purchase {
   private internetConnection: boolean = false;
   private _price: number = 0;
   private phoneLines: number = 0;
   private cellPhones: string[] = [];

  public setInternetConnection(state: boolean) {
    this.internetConnection = state;
    this.internetConnection ? (this._price += 200) : (this._price -= 200);
    return this._price;
  }

  public increasePhoneLines() {
    if(this.phoneLines >= 8){ 
      return this._price;
    }
    
    this.phoneLines++;
    this._price += 150;
    return this._price;
  }

  public decreasePhoneLines() {
    if(this.phoneLines == 0) return this._price;
    
    this.phoneLines--;
    this._price -= 150;
    return this._price;
  }

  public selectCellPhone(modelName: string) {
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
  }

  public deselectCellPhone(modelName: string) {
    if(!this.cellPhones.includes(modelName) || !this.cellPhones.length) throw new Error('Model name not found');
    let index = this.cellPhones.indexOf(modelName);
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
  }

  public buy() {
    if (this._price === 0) {
      return "Please select something!";
    } else {
      return `You have selected the following:\n
             Internet connection: ${this.internetConnection} \n
             Phone lines: ${this.phoneLines} \n
             Cell phone: ${this.cellPhones} \n`;
    }
  }

  public get price(): number {
    return this._price;
  }
  public set price(value: number) {
    this._price = value;
  }
}
