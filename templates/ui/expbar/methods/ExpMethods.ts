export default {
    setExpTable(table?: any) {
        this.levelCounter.setTable(table);
        return this;
    },

    resetExp(exp?: any) {
        this.levelCounter.resetExp(exp);
        this.setValue(this.exp, this.getExp(this.level), this.getExp(this.level + 1));
        return this;
    },

    getExp(level?: any) {
        return this.levelCounter.getExp(level);
    },

    getLevel(exp?: any, level?: any) {
        return this.levelCounter.getLevel(exp, level);
    },

    getRequiredExpToNextLevel(level?: any, exp?: any) {
        return this.levelCounter.getRequiredExpToNextLevel(level, exp);
    },

    gainExp(exp?: any) {
        this.levelCounter.gainExp(exp);
        return this;
    },

    setExp(exp?: any) {
        this.levelCounter.setExp(exp);
        return this;
    },

    setLevel(level?: any) {
        this.levelCounter.setLevel(level);
        return this;
    }
}