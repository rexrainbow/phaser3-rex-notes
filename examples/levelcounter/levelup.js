import LevelCounter from '../../plugins/levelcounter.js';

var levelCounter = new LevelCounter({
    table: function (level) {
        return level * 100;
    },
    maxLevel: 10,

    exp: 330,
})

console.log(levelCounter.exp)
console.log(levelCounter.level)

levelCounter
    .on('levelup', function (level, fromExp, toExp, levelStartExp, levelEndExp) {
        // var t0 = Phaser.Math.Percent(fromExp, levelStartExp, levelEndExp);
        // var t1 = Phaser.Math.Percent(toExp, levelStartExp, levelEndExp);
        console.log(`LevelUp : ${level} ${fromExp} -> ${toExp}`);
    })

console.log('Exp += 200')
levelCounter.gainExp(200)
console.log(levelCounter.level)

console.log('Exp += 30')
levelCounter.gainExp(30)
console.log(levelCounter.level)

console.log('Exp += 80')
levelCounter.exp += 80;  // Equal to `levelCounter.gainExp(80)`
console.log(levelCounter.level)

console.log('Exp += 60')
levelCounter.exp += 60;
console.log(levelCounter.level)

console.log('Exp = 230')
levelCounter.exp = 230;  // Reset exp if new exp is less then current exp
console.log(levelCounter.exp)
console.log(levelCounter.level)

console.log('Level = 8')
levelCounter.level = 8;  // Level up directly
console.log(levelCounter.exp)
console.log(levelCounter.level)

console.log('Level = 5')
levelCounter.level = 5;  // Reset exp if new exp is less then current exp
console.log(levelCounter.exp)
console.log(levelCounter.level)

console.log('Level = 6')
levelCounter.setLevel(6);
console.log(levelCounter.exp)
console.log(levelCounter.level)

console.log(`Level = 11 (maxLevel = ${levelCounter.maxLevel})`)
levelCounter.setLevel(11);
console.log(levelCounter.exp)
console.log(levelCounter.level)
