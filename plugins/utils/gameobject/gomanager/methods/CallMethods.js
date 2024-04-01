import IsSingleBob from './IsSingleBob.js';

export default {
    hasMethod(name, methodName) {
        var bob = IsSingleBob(name) ? this.get(name) : this.getFitst(name);
        if (!bob) {
            return false;
        }

        return bob.hasMethod(methodName);
    },


    call(name, methodName, ...parameters) {
        var bobs = this.get(name);
        if (!bobs) {
            return this;
        } else if (!Array.isArray(bobs)) {
            bobs = [bobs];
        }

        bobs.forEach(function (bob) {
            bob.call(methodName, ...parameters);
        });

        return this;
    },
}