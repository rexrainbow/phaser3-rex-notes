import GetWrapCallback from './GetWrapCallback.js';
import { RemoveWaitEvents } from '../Events.js';

var IsWaitSprite = function (name) {
    // sprite, sprite.name, sprite.name.prop
    var names = name.split('.');
    return (names[0] === 'sprite') && (names.length <= 3);
}

var WaitSprite = function (textPlayer, tag, callback, args, scope) {
    var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope);
    var tags = tag.split('.');
    var spriteManager = textPlayer.spriteManager;
    switch (tags.length) {
        case 1:  // sprite: wait all sprites has beeen destroyed
            if (spriteManager.isEmpty) {
                textPlayer.emit('wait.sprite');
                wrapCallback();
            } else {
                // Remove all wait events
                textPlayer.once(RemoveWaitEvents, function (removeFrom) {
                    spriteManager.off('empty', wrapCallback, textPlayer);
                });
                spriteManager.once('empty', wrapCallback, textPlayer);
                textPlayer.emit('wait.sprite');
            }
            break;

        case 2:  // sprite.name: wait sprite.name has been destroyed
            var name = tags[1];
            if (spriteManager.has(name)) {
                var spriteData = textPlayer.spriteManager.get(name);
                var sprite = spriteData.sprite;
                // Remove all wait events
                textPlayer.once(RemoveWaitEvents, function () {
                    sprite.off('destroy', wrapCallback, textPlayer);
                });

                sprite.once('destroy', wrapCallback, textPlayer);
                textPlayer.emit('wait.sprite', name);
            } else {
                textPlayer.emit('wait.sprite', name);
                wrapCallback();
            }
            break;

        case 3:  // sprite.name.prop: wait ease sprite.name.prop has been completed
            var name = tags[1];
            var prop = tags[2];
            var task = textPlayer.spriteManager.getTweenTask(name, prop);
            if (task) {
                // Remove all wait events
                textPlayer.once(RemoveWaitEvents, function () {
                    task.off('complete', wrapCallback, textPlayer);
                });

                task.once('complete', wrapCallback, textPlayer);
                textPlayer.emit('wait.sprite', name, prop);
            } else {
                textPlayer.emit('wait.sprite', name, prop);
                wrapCallback();
            }
            break;
    }

}


export { IsWaitSprite, WaitSprite };