var RemoveItem = Phaser.Utils.Array.Remove;

var OnInitDelayCallTimers = function (gameObject) {
    gameObject._delayCallTimers = [];
    gameObject.once('destroy', function () {
        var timers = gameObject._delayCallTimers;
        for (var i = 0, cnt = timers.length; i < cnt; i++) {
            timers[i].remove();
        }
        gameObject._delayCallTimers = undefined;
    })
}

export default {
    delayCall(delay, callback, scope) {
        var timers = this._delayCallTimers;

        if (timers === undefined) {
            OnInitDelayCallTimers(this);
        }


        var timer;
        var self = this;
        var OnTimeOut = function () {
            RemoveItem(self._delayCallTimers, timer);
            if (scope) {
                callback.call(scope);
            } else {
                callback()
            }
        }

        timer = this.scene.time.delayedCall(delay, OnTimeOut);
        this._delayCallTimers.push(timer);

        return this;
    },
}