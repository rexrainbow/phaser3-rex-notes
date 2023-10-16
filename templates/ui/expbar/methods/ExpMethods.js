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
        this.levelCounter.gainExp(exp);
        return this;
    },

    setExp(exp) {
        this.levelCounter.setExp(exp);
        return this;
    },

    setLevel(level) {
        this.levelCounter.setLevel(level);
        return this;
    }
}