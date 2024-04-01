import IsSingleBob from './IsSingleBob.js';

export default {
    hasData(name, dataKey) {
        var bob = IsSingleBob(name) ? this.get(name) : this.getFitst(name);
        if (!bob) {
            return false;
        }

        return bob.hasData(dataKey);
    },

    getData(name, dataKey) {
        if (!this.has(name)) {
            return undefined;
        }
        return this.get(name).getData(dataKey);
    },

    setData(name, dataKey, value) {
        var bobs = this.get(name);
        if (!bobs) {
            return this;
        } else if (!Array.isArray(bobs)) {
            bobs = [bobs];
        }

        bobs.forEach(function (bob) {
            bob.setData(dataKey, value);
        });

        return this;
    },
}