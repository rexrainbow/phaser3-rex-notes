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
        tween.on('update', function (tween, key, target) {
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
                    parent.updateChildScale(child);
                    break;
                case 'alpha':
                    parent.updateChildAlpha(child);
                    break;
            }

        })

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