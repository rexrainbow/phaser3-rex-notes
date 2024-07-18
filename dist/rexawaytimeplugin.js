(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexawaytimeplugin = factory());
})(this, (function () { 'use strict';

    const GetValue = Phaser.Utils.Objects.GetValue;

    class AwayTime {
        constructor(config) {
            this.state = IDLE;
            this.setKey(GetValue(config, 'key', 'away'));
            this.setPeriod(GetValue(config, 'period', 1000));
        }

        destroy() {
            this.stop();
        }

        get awayTime() {
            var prevTime = localStorage.getItem(this.key);
            this.start();
            if (prevTime == null) {
                return 0;
            }
            prevTime = parseInt(prevTime);
            var curTime = this.curTime;
            if ((prevTime < 0) || (prevTime > curTime)) {
                return 0;
            }
            // console.log(new Date(prevTime).toLocaleString());
            // console.log(new Date(curTime).toLocaleString());        
            return curTime - prevTime;
        }

        get curTime() {
            return new Date().getTime();
        }

        start() {
            this.stop();
            this.updateTime();
            this.timer = setInterval(this.updateTime.bind(this), this.period);
            this.state = UPDATING;
            return this;
        }

        stop() {
            if (this.state === IDLE) {
                return this;
            }
            clearTimeout(this.timer);
            this.timer = undefined;
            this.state = IDLE;
            return this;
        }

        updateTime() {
            localStorage.setItem(this.key, this.curTime);
            return this;
        }

        setKey(key) {
            this.key = key;
            return this;
        }

        setPeriod(time) {
            this.period = time;
            return this;
        }
    }

    const IDLE = 0;
    const UPDATING = 1;

    class AwayTimePlugin extends Phaser.Plugins.BasePlugin {
        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        destroy() {
            if (this._defaultAwayTimer) {
                this._defaultAwayTimer.destroy();
            }
            super.destroy();
        }

        add(config) {
            return new AwayTime(config);
        }

        get defaultAwayTimer() {
            if (!this._defaultAwayTimer) {
                this._defaultAwayTimer = this.add();
            }
            return this._defaultAwayTimer;
        }

        get awayTime() {
            return this.defaultAwayTimer.awayTime;
        }

        setKey(key) {
            this.defaultAwayTimer.setKey(key);
            return this;
        }

        setPeriod(time) {
            this.defaultAwayTimer.setPeriod(time);
            return this;
        }
    }

    return AwayTimePlugin;

}));
