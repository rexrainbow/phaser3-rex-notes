import NOOP from '../../../../plugins/utils/object/NOOP.js';

var OnLevelUp = function (level, fromExp, toExp, levelStartExp, levelEndExp) {
    var time = ((toExp - fromExp) / (levelEndExp - levelStartExp)) * this.totalEaseDuration;

    this.player
        //.append(0, this.setValue, fromExp, levelStartExp, levelEndExp)
        .append(0, this.setEaseValueDuration, time)
        .append(0, this.easeValueTo, toExp, levelStartExp, levelEndExp)
        .append(time, NOOP)

    if (toExp === levelEndExp) {
        this.player.append(0, this.emit, 'levelup', level + 1, this)
    }

    if (!this.player.isPlaying) {
        this.player.start();
    }
}

export default OnLevelUp;