import IsSingleBob from './IsSingleBob';

export default {
    hasData(name?: any, dataKey?: any) {
        var bob = IsSingleBob(name) ? this.get(name) : this.getFitst(name);
        if (!bob) {
            return false;
        }

        return bob.hasData(dataKey);
    },

    getData(name?: any, dataKey?: any) {
        if (!this.has(name)) {
            return undefined;
        }
        return this.get(name).getData(dataKey);
    },

    setData(name?: any, dataKey?: any, value?: any) {
        var bobs = this.get(name);
        if (!bobs) {
            return this;
        } else if (!Array.isArray(bobs)) {
            bobs = [bobs];
        }

        bobs.forEach(function(bob?: any) {
            bob.setData(dataKey, value);
        });

        return this;
    },
}