import Daemon from '../src/js/Daemon';

describe('Daemon class', () => {
  let daemon;

  beforeEach(() => {
    daemon = new Daemon('Diablo');
  });

  describe('constructor', () => {
    test('should create Daemon with correct properties', () => {
      expect(daemon.name).toBe('Diablo');
      expect(daemon.type).toBe('Daemon');
      expect(daemon.baseAttack).toBe(100);
      expect(daemon.stoned).toBe(false);
      expect(daemon.distance).toBe(1);
    });
  });

  describe('attack calculation without stoned effect', () => {
    test('should return 100% at distance 1', () => {
      daemon.distance = 1;
      expect(daemon.attack).toBe(100);
    });

    test('should return 90% at distance 2', () => {
      daemon.distance = 2;
      expect(daemon.attack).toBe(90);
    });

    test('should return 80% at distance 3', () => {
      daemon.distance = 3;
      expect(daemon.attack).toBe(80);
    });

    test('should return 70% at distance 4', () => {
      daemon.distance = 4;
      expect(daemon.attack).toBe(70);
    });

    test('should return 60% at distance 5', () => {
      daemon.distance = 5;
      expect(daemon.attack).toBe(60);
    });
  });

  describe('attack calculation with stoned effect', () => {
    beforeEach(() => {
      daemon.stoned = true;
    });

    test('should calculate correct attack at distance 1', () => {
      daemon.distance = 1;
      expect(daemon.attack).toBe(100);
    });

    test('should calculate correct attack at distance 2', () => {
      daemon.distance = 2;
      expect(daemon.attack).toBe(85);
    });

    test('should calculate correct attack at distance 3', () => {
      daemon.distance = 3;
      expect(daemon.attack).toBe(72);
    });

    test('should calculate correct attack at distance 4', () => {
      daemon.distance = 4;
      expect(daemon.attack).toBe(60);
    });

    test('should calculate correct attack at distance 5', () => {
      daemon.distance = 5;
      expect(daemon.attack).toBe(48);
    });
  });

  describe('stoned getter/setter', () => {
    test('should set stoned to true', () => {
      daemon.stoned = true;
      expect(daemon.stoned).toBe(true);
    });

    test('should set stoned to false', () => {
      daemon.stoned = true;
      daemon.stoned = false;
      expect(daemon.stoned).toBe(false);
    });
  });

  describe('distance getter/setter', () => {
    test('should set distance correctly', () => {
      daemon.distance = 5;
      expect(daemon.distance).toBe(5);
    });

    test('should throw error for invalid distance', () => {
      expect(() => daemon.distance = 0).toThrow('Distance must be a positive number');
      expect(() => daemon.distance = -5).toThrow('Distance must be a positive number');
    });
  });

  describe('attack setter', () => {
    test('should change base attack', () => {
      daemon.attack = 150;
      expect(daemon.baseAttack).toBe(150);
      expect(daemon.attack).toBe(150);
    });

    test('should recalculate attack with new base value', () => {
      daemon.attack = 200;
      daemon.distance = 3;
      expect(daemon.attack).toBe(160); // 200 * 0.8 = 160

      daemon.stoned = true;
      // 160 - (Math.log2(3) * 5) ≈ 160 - 7.92 = 152.08 → 152
      expect(daemon.attack).toBe(152);
    });
  });

  describe('inheritance from Character', () => {
    test('should have same methods as Character', () => {
      expect(daemon).toHaveProperty('stoned');
      expect(daemon).toHaveProperty('attack');
      expect(daemon).toHaveProperty('distance');
      expect(daemon).toHaveProperty('baseAttack');
    });

    test('should behave same as Magician for same inputs', () => {
      const magician = new (require('../src/js/Magician').default)('Test');

      daemon.attack = 100;
      magician.attack = 100;

      daemon.distance = 3;
      magician.distance = 3;

      expect(daemon.attack).toBe(magician.attack);

      daemon.stoned = true;
      magician.stoned = true;

      expect(daemon.attack).toBe(magician.attack);
    });
  });

  describe('edge cases', () => {
    test('should handle rounding correctly', () => {
      daemon.attack = 100;
      daemon.distance = 3;
      daemon.stoned = true;
      // 80 - (Math.log2(3) * 5) = 80 - 7.9248125 = 72.0751875 → 72
      expect(daemon.attack).toBe(72);
    });

    test('should handle changing stoned multiple times', () => {
      daemon.distance = 3;
      daemon.stoned = true;
      const attackWithStoned = daemon.attack;

      daemon.stoned = false;
      const attackWithoutStoned = daemon.attack;

      expect(attackWithStoned).toBeLessThan(attackWithoutStoned);
    });
  });
});
