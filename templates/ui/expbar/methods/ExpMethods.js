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

    console.log(`LevelUp : ${level} ${fromExp} -> ${toExp}`);
}

export default {
    setExpTable(table) {
        this.levelCounter.setTable(table);
        return this;
    },

    resetExp(exp) {
        this.levelCounter.resetExp(exp);
        this.setValue(this.exp, this.getExp(this.level), this.getExp(this.level + 1));
        return this;
    },

    getExp(level) {
        return this.levelCounter.getExp(level);
    },

    getLevel(exp, level) {
        return this.levelCounter.getLevel(exp, level);
    },

    getRequiredExpToNextLevel(level, exp) {
        return this.levelCounter.getRequiredExpToNextLevel(level, exp);
    },

    gainExp(exp) {
        this.levelCounter.gainExp(exp, OnLevelUp, this);
        return this;
    },

    setExp(exp) {
        this.levelCounter.setExp(exp, OnLevelUp, this);
        return this;
    },

    setLevel(level) {
        this.levelCounter.setLevel(level, OnLevelUp, this);
        return this;
    }
}