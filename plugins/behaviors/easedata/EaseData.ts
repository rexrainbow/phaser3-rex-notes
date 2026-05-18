import { Utils as PhaserUtils } from 'phaser';
import ComponentBase from '../../utils/componentbase/ComponentBase';
import EaseValueTask from '../../utils/ease/EaseValueTask';

const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

class EaseData extends ComponentBase {
    easeTasks: any;
    emit: any;
    parent: any;

    constructor(parent?: any, config?: any) {
        super(parent, config);

        this.parent.setDataEnabled();
        this.easeTasks = {};
    }

    complete(key?: any) {
        this.emit(`complete-${key}`, this.parent, this);
        this.emit('complete', key, this.parent, this);
    }

    getEaseTask(key?: any) {
        var easeTask = this.easeTasks[key];
        if (easeTask === undefined) {
            easeTask = new EaseValueTask(this.parent);
            this.easeTasks[key] = easeTask;

            easeTask
                .setTarget(this.parent.data.values)
                .on('complete', function() {
                    this.complete(key);
                }, this);
        }
        return easeTask;
    }

    easeTo(key?: any, value?: any, duration?: any, ease?: any) {
        if (IsPlainObject(key)) {
            var config = key;
            key = config.key;
            value = config.value;
            duration = config.duration;
            ease = config.ease;

            var speed = config.speed;
            if ((duration === undefined) && (speed !== undefined)) {
                duration = (Math.abs(value - this.parent.data.values[key]) / speed) * 1000;
            }
        }

        if (duration === undefined) {
            duration = 1000;
        }
        if (ease === undefined) {
            ease = 'Linear';
        }

        var easeTask = this.getEaseTask(key);
        easeTask.restart({
            key: key,
            to: value,
            duration: duration,
            ease: ease
        });

        return this;
    }

    easeFrom(key?: any, value?: any, duration?: any, ease?: any) {
        if (IsPlainObject(key)) {
            var config = key;
            key = config.key;
            value = config.value;
            duration = config.duration;
            ease = config.ease;

            var speed = config.speed;
            if ((duration === undefined) && (speed !== undefined)) {
                duration = (Math.abs(value - this.parent.data.values[key]) / speed) * 1000;
            }
        }

        if (duration === undefined) {
            duration = 1000;
        }
        if (ease === undefined) {
            ease = 'Linear';
        }

        var easeTask = this.getEaseTask(key);
        easeTask.restart({
            key: key,
            from: value,
            duration: duration,
            ease: ease
        });

        return this;
    }

    stopEase(key?: any, toEnd?: any) {
        if (toEnd === undefined) {
            toEnd = true;
        }

        var easeTask = this.easeTasks[key];
        if (easeTask?: any) {
            easeTask.stop(toEnd);
        }

        return this;
    }

    stopAll(toEnd?: any) {
        if (toEnd === undefined) {
            toEnd = true;
        }

        for (var key in this.easeTasks) {
            this.stopEase(key, toEnd);
        }
        return this;
    }
}

export default EaseData;