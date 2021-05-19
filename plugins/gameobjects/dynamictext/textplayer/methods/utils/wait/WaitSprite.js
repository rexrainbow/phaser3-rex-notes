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
            // TODO
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
                wrapCallback();
                textPlayer.emit('wait.sprite', name);
            }
            break;

        case 3:  // sprite.name.prop: wait ease sprite.name.prop has been completed
            var name = tags[1];
            var propName = tags[2];
            if (spriteManager.has(name)) {
                var spriteData = textPlayer.spriteManager.get(name);
                var easeTask = spriteData.tweens[propName];
                if (easeTask) {
                    // Remove all wait events
                    textPlayer.once(RemoveWaitEvents, function () {
                        easeTask.off('complete', wrapCallback, textPlayer);
                    });

                    easeTask.once('complete', wrapCallback, textPlayer);
                    textPlayer.emit('wait.sprite', name, propName);
                } else {
                    textPlayer.emit('wait.sprite', name, propName);
                    wrapCallback();
                }
            } else {
                textPlayer.emit('wait.sprite', name, propName);
                wrapCallback();
            }
            break;
    }

}


export { IsWaitSprite, WaitSprite };