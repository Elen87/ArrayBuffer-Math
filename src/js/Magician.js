import Character from './Character';

export default class Magician extends Character {
  constructor(name) {
    super(name, 100);
    this.type = 'Magician';
  }
}
