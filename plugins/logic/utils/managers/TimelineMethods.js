export default {
    delayCall(delay, callback, args, scope) {
        return this.timeline.delayCall(delay, callback, args, scope);
    }
}