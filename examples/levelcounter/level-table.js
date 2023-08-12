import LevelCounter from '../../plugins/levelcounter.js';

var levelCounter = new LevelCounter({
    table: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900],

    exp: 330,
})

levelCounter
    .on('levelup', function (level, fromExp, toExp, levelStartExp, levelEndExp) {
        // var t0 = Phaser.Math.Percent(fromExp, levelStartExp, levelEndExp);
        // var t1 = Phaser.Math.Percent(toExp, levelStartExp, levelEndExp);
        console.log(`LevelUp : ${level} ${fromExp} -> ${toExp}`);
    })

console.log('Exp += 200')
levelCounter.gainExp(200)
console.log(levelCounter.level)