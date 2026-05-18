var AutoRemoveTween = function(gameObject?: any, config?: any) {
    var scene = gameObject.scene;
    config.targets = gameObject;
    var tween = scene.tweens.add(config);

    gameObject.once('destroy', tween.remove, tween);
    tween.once('complete', function() {
        gameObject.off('destroy', tween.remove, tween);
    })

    return tween;
}

export default AutoRemoveTween;