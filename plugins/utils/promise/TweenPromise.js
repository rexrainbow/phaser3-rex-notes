var TweenPromise = function (scene, tweenConfig) {
    return new Promise(function (resolve, reject) {
        var tween = scene.tweens.add(tweenConfig);
        tween.on('complete', function (tween, targets) {
            resolve(targets);
        });
    });
}

export default TweenPromise;