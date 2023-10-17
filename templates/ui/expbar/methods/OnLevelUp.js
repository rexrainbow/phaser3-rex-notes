import NOOP from '../../../../plugins/utils/object/NOOP.js';

var OnLevelUp = function (level, fromExp, toExp, levelStartExp, levelEndExp) {
    var time = ((toExp - fromExp) / (levelEndExp - levelStartExp)) * this.totalEaseDuration;
    var levelEnd = (toExp === levelEndExp) ? (level + 1) : level;

    this.player
        //.append(0, this.setValue, fromExp, levelStartExp, levelEndExp)
        .append(0, this.setEaseValueDuration, time)
        .append(0, this.easeValueTo, toExp, levelStartExp, levelEndExp)
        .append(0, this.emit, 'levelup.start', level, fromExp, toExp, this)
        .append(time, NOOP)
        .append(0, this.emit, 'levelup.end', levelEnd, fromExp, toExp, this)

    if (!this.player.isPlaying) {
        this.player.start();
    }
}

export default OnLevelUp;