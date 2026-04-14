import Magician from './js/Magician';
import Daemon from './js/Daemon';

console.log('=== Math (log/trig) Demo ===\n');

const magician = new Magician('Gandalf');
const daemon = new Daemon('Diablo');

console.log('=== Magician Tests ===');
magician.distance = 2;
console.log(`Distance: ${magician.distance}, Attack: ${magician.attack}`);
console.log(`Stoned: ${magician.stoned}\n`);

magician.stoned = true;
console.log('With stoned effect:');
console.log(`Distance: ${magician.distance}, Attack: ${magician.attack}\n`);

magician.distance = 3;
console.log(`Distance: ${magician.distance}, Attack: ${magician.attack}\n`);

magician.distance = 5;
console.log(`Distance: ${magician.distance}, Attack: ${magician.attack}\n`);

console.log('=== Daemon Tests ===');
daemon.distance = 2;
console.log(`Distance: ${daemon.distance}, Attack: ${daemon.attack}`);
daemon.stoned = true;
console.log(`With stoned effect: ${daemon.attack}\n`);

daemon.distance = 4;
console.log(`Distance: ${daemon.distance}, Attack: ${daemon.attack}\n`);

console.log('=== Comparison Table ===');
console.log('Distance | No Stoned | With Stoned');
console.log('---------|-----------|------------');
for (let dist = 1; dist <= 5; dist++) {
  magician.stoned = false;
  magician.distance = dist;
  const noStoned = magician.attack;

  magician.stoned = true;
  magician.distance = dist;
  const withStoned = magician.attack;

  console.log(`    ${dist}    |    ${noStoned}     |     ${withStoned}`);
}

export { Magician, Daemon };
