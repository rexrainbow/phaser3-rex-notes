import IsSingleBob from './IsSingleBob.js';

export default {
    hasProperty(name, property) {
        var bob = IsSingleBob(name) ? this.get(name) : this.getFitst(name);
        if (!bob) {
            return false;
        }

        return bob.hasProperty(property);
    },

    getProperty(name, property) {
        var bob = IsSingleBob(name) ? this.get(name) : this.getFitst(name);
        if (!bob) {
            return undefined;
        }

        return bob.getProperty(property);
    },

    isNumberProperty(name, property) {
        var value = this.getProperty(name, property);
        return typeof (value) === 'number';
    },

    setProperty(name, property, value) {
        var bobs = this.get(name);
        if (!bobs) {
            return this;
        } else if (!Array.isArray(bobs)) {
            bobs = [bobs];
        }

        if (this.symbols &&
            (typeof (value) === 'string') &&
            this.isNumberProperty(name, property)
        ) {
            if (value in this.symbols) {
                value = this.symbols[value];
            } else {
                console.warn(`Can't find symbol ${value}`)
            }
        }

        bobs.forEach(function (bob) {
            bob.setProperty(property, value);
        });

        return this;
    },

    easeProperty(name, config) {
        var bobs = this.get(name);
        if (!bobs) {
            return this;
        } else if (!Array.isArray(bobs)) {
            bobs = [bobs];
        }

        var value = config.value;
        var property = config.property;

        if (this.symbols &&
            (typeof (value) === 'string') &&
            this.isNumberProperty(name, property) &&
            (value in this.symbols)
        ) {
            config.value = this.symbols[value];
        }

        bobs.forEach(function (bob) {
            bob.easeProperty(config);
        });

        return this;
    },

    hasTweenTask(name, property) {
        var bob = IsSingleBob(name) ? this.get(name) : this.getFitst(name);
        if (!bob) {
            return false;
        }

        return bob.tweens.hasOwnProperty(property);
    },

    getTweenTask(name, property) {
        var bob = IsSingleBob(name) ? this.get(name) : this.getFitst(name);
        if (!bob) {
            return null;
        }

        return bob.tweens[property] || null;
    }
}