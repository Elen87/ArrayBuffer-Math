export default class Character {
  constructor(name, attack) {
    this.name = name;
    this._attack = attack;
    this._stoned = false;
    this._distance = 1;
  }

  get stoned() {
    return this._stoned;
  }

  set stoned(value) {
    this._stoned = Boolean(value);
  }

  get attack() {
    let power = this._attack * (1 - (this._distance - 1) * 0.1);
    power = Math.max(0, power);

    if (this._stoned) {
      const logModifier = Math.log2(this._distance) * 5;
      power -= logModifier;
      power = Math.max(0, power);
    }

    return Math.round(power);
  }

  set attack(value) {
    this._attack = value;
  }

  get distance() {
    return this._distance;
  }

  set distance(value) {
    if (typeof value !== 'number' || value < 1) {
      throw new Error('Distance must be a positive number');
    }
    this._distance = value;
  }

  get baseAttack() {
    return this._attack;
  }
}
