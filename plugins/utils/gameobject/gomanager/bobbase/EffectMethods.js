const UppercaseFirst = Phaser.Utils.String.UppercaseFirst;

export default {
    hasEffect(name) {
        return this.effects.hasOwnProperty(name);
    },

    getEffect(name) {
        return this.effects[name];
    },

    setEffect(name, effectName, ...args) {
        var preFX = this.gameObject.preFX;
        if (!preFX) {
            return this;
        }

        if (this.hasEffect(name)) {
            return this;
        }

        this.effects[name] = preFX[`add${UppercaseFirst(effectName)}`].call(preFX, ...args);

        return this;
    },

    removeEffect(name) {
        var effect = this.getEffect(name);
        if (!effect) {
            return this;
        }

        var preFX = this.gameObject.preFX;
        preFX.remove(effect);
        this.effects[name] = null;
        return this;
    },

    freeEffects() {
        var preFX = this.gameObject.preFX;
        var effects = this.effects;
        for (var name in effects) {
            var effect = effects[name];
            preFX.remove(effect);
            effects[name] = null;
        }
        return this;
    }
}