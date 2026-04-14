import Magician from '../src/js/Magician';

describe('Magician class', () => {
  let magician;

  beforeEach(() => {
    magician = new Magician('Gandalf');
  });

  describe('constructor', () => {
    test('should create Magician with correct properties', () => {
      expect(magician.name).toBe('Gandalf');
      expect(magician.type).toBe('Magician');
      expect(magician.baseAttack).toBe(100);
      expect(magician.stoned).toBe(false);
      expect(magician.distance).toBe(1);
    });
  });

  describe('attack calculation without stoned effect', () => {
    test('should return 100% at distance 1', () => {
      magician.distance = 1;
      expect(magician.attack).toBe(100);
    });

    test('should return 90% at distance 2', () => {
      magician.distance = 2;
      expect(magician.attack).toBe(90);
    });

    test('should return 80% at distance 3', () => {
      magician.distance = 3;
      expect(magician.attack).toBe(80);
    });

    test('should return 70% at distance 4', () => {
      magician.distance = 4;
      expect(magician.attack).toBe(70);
    });

    test('should return 60% at distance 5', () => {
      magician.distance = 5;
      expect(magician.attack).toBe(60);
    });

    test('should return 0% at distance 11', () => {
      magician.distance = 11;
      expect(magician.attack).toBe(0);
    });
  });

  describe('attack calculation with stoned effect', () => {
    beforeEach(() => {
      magician.stoned = true;
    });

    test('should calculate correct attack at distance 1', () => {
      magician.distance = 1;
      // 100 - (Math.log2(1) * 5) = 100 - 0 = 100
      expect(magician.attack).toBe(100);
    });

    test('should calculate correct attack at distance 2', () => {
      magician.distance = 2;
      // 90 - (Math.log2(2) * 5) = 90 - 5 = 85
      expect(magician.attack).toBe(85);
    });

    test('should calculate correct attack at distance 3', () => {
      magician.distance = 3;
      // 80 - (Math.log2(3) * 5) ≈ 80 - 7.92 = 72.08 → 72
      expect(magician.attack).toBe(72);
    });

    test('should calculate correct attack at distance 4', () => {
      magician.distance = 4;
      // 70 - (Math.log2(4) * 5) = 70 - 10 = 60
      expect(magician.attack).toBe(60);
    });

    test('should calculate correct attack at distance 5', () => {
      magician.distance = 5;
      // 60 - (Math.log2(5) * 5) ≈ 60 - 11.61 = 48.39 → 48
      expect(magician.attack).toBe(48);
    });

    test('should not go below 0', () => {
      magician.distance = 20;
      expect(magician.attack).toBe(0);
    });
  });

  describe('stoned getter/setter', () => {
    test('should set stoned to true', () => {
      magician.stoned = true;
      expect(magician.stoned).toBe(true);
    });

    test('should set stoned to false', () => {
      magician.stoned = true;
      magician.stoned = false;
      expect(magician.stoned).toBe(false);
    });

    test('should handle truthy/falsy values', () => {
      magician.stoned = 1;
      expect(magician.stoned).toBe(true);

      magician.stoned = 0;
      expect(magician.stoned).toBe(false);

      magician.stoned = 'true';
      expect(magician.stoned).toBe(true);
    });
  });

  describe('distance getter/setter', () => {
    test('should set distance correctly', () => {
      magician.distance = 5;
      expect(magician.distance).toBe(5);
    });

    test('should throw error for invalid distance', () => {
      expect(() => magician.distance = 0).toThrow('Distance must be a positive number');
      expect(() => magician.distance = -1).toThrow('Distance must be a positive number');
      expect(() => magician.distance = '2').toThrow('Distance must be a positive number');
      expect(() => magician.distance = null).toThrow('Distance must be a positive number');
    });
  });

  describe('attack setter', () => {
    test('should change base attack', () => {
      magician.attack = 150;
      expect(magician.baseAttack).toBe(150);
      expect(magician.attack).toBe(150);
    });

    test('should recalculate attack after changing base attack', () => {
      magician.attack = 200;
      magician.distance = 2;
      expect(magician.attack).toBe(180); // 200 * 0.9 = 180

      magician.stoned = true;
      // 180 - (Math.log2(2) * 5) = 180 - 5 = 175
      expect(magician.attack).toBe(175);
    });
  });

  describe('edge cases', () => {
    test('should handle distance 1 with stoned correctly', () => {
      magician.distance = 1;
      magician.stoned = true;
      expect(magician.attack).toBe(100);
    });

    test('should handle very large distance', () => {
      magician.distance = 100;
      expect(magician.attack).toBe(0);

      magician.stoned = true;
      expect(magician.attack).toBe(0);
    });

    test('should handle base attack of 0', () => {
      magician.attack = 0;
      magician.distance = 2;
      expect(magician.attack).toBe(0);

      magician.stoned = true;
      expect(magician.attack).toBe(0);
    });
  });
});
