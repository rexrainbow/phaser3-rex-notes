import IsArray from '../../utils/object/IsArray.js';

export default {
    tweenChild(tweenConfig) {
        var targets = tweenConfig.targets;
        if (!IsArray(targets)) {
            targets = [targets];
        }

        var scene, localTargets = [];
        var child;
        for (var i = 0, cnt = targets.length; i < cnt; i++) {
            child = targets[i];
            if (!child.hasOwnProperty('rexContainer')) {
                continue;
            }
            scene = child.scene;
            localTargets.push(child.rexContainer);
        }

        if (!scene) {
            return;
        }

        tweenConfig.targets = localTargets;
        var tween = scene.tweens.add(tweenConfig);
        var tweenUpdateListener = function (tween, key, target) {
            if (!target.parent) {
                // target object was removed, so remove this tween too to avoid crashing
                scene.tweens.remove(tween);
                return;
            }
            var parent = target.parent;
            var child = target.self;
            switch (key) {
                case 'x':
                case 'y':
                    parent.updateChildPosition(child);
                    break;
                case 'angle':
                case 'rotation':
                    parent.updateChildRotation(child);
                    break;
                case 'scaleX':
                case 'scaleY':
                case 'displayWidth':
                case 'displayHeight':
                    parent.updateChildScale(child);
                    break;
                case 'alpha':
                    parent.updateChildAlpha(child);
                    break;
            }
        };
        tween.on('update', tweenUpdateListener);

        return tween;
    },

    tween(tweenConfig) {
        var scene = this.scene;
        if (!tweenConfig.targets) {
            tweenConfig.targets = this;
        }
        return scene.tweens.add(tweenConfig);
    }
}