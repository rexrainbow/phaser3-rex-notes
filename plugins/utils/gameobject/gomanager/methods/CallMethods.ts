import IsSingleBob from './IsSingleBob';

export default {
    hasMethod(name?: any, methodName?: any) {
        var bob = IsSingleBob(name) ? this.get(name) : this.getFitst(name);
        if (!bob) {
            return false;
        }

        return bob.hasMethod(methodName);
    },


    call(name?: any, methodName?: any, ...parameters) {
        var bobs = this.get(name);
        if (!bobs) {
            return this;
        } else if (!Array.isArray(bobs)) {
            bobs = [bobs];
        }

        bobs.forEach(function(bob?: any) {
            bob.call(methodName, ...parameters);
        });

        return this;
    },
}