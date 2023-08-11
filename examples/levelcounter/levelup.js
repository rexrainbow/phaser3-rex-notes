import LevelCounter from '../../plugins/levelcounter.js';

var levelCounter = new LevelCounter({
    table: function (level) {
        return level * 100;
    },

    exp: 330,
})

levelCounter
    .on('levelup', function (level, fromExp, toExp, levelExp0, levelExp1) {
        // var t0 = Phaser.Math.Percent(fromExp, levelExp0, levelExp1);
        // var t1 = Phaser.Math.Percent(toExp, levelExp0, levelExp1);
        console.log(`LevelUp : ${level} ${fromExp} -> ${toExp}`);
    })

levelCounter.gainExp(200)
console.log('---')
levelCounter.gainExp(30)
console.log('---')
levelCounter.gainExp(80)