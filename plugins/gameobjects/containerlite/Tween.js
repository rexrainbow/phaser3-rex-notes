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
        tween.on('update', function (tween, key, targets) {
            var parent, child;
            for (var i = 0, cnt = targets.length; i < cnt; i++) {
                parent = targets.parent;
                child = targets.self;
                switch (key) {
                    case 'x':
                    case 'y':
                    case 'angle':
                    case 'rotation':
                    case 'scaleX':
                    case 'scaleY':
                    case 'flipX':
                    case 'flipY':
                        parent.updateChildPosition(child);
                        break;
                    case 'alpha':
                        parent.updateChildAlpha(child);
                        break;
                }
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