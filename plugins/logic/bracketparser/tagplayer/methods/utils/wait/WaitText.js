import GetWrapCallback from './GetWrapCallback.js';
import { RemoveWaitEvents } from '../Events.js';

var IsWaitText = function (name) {
    // text, text.name, text.name.prop, text.name.typing
    var names = name.split('.');
    return (names[0] === 'text') && (names.length <= 3);
}

var WaitText = function (tagPlayer, tag, callback, args, scope) {
    var wrapCallback = GetWrapCallback(tagPlayer, callback, args, scope);
    var tags = tag.split('.');
    var textManager = tagPlayer.textManager;
    switch (tags.length) {
        case 1:  // text: wait all texts has beeen destroyed
            if (textManager.isEmpty) {
                tagPlayer.emit('wait.text');
                wrapCallback();
            } else {
                // Remove all wait events
                tagPlayer.once(RemoveWaitEvents, function (removeFrom) {
                    textManager.off('empty', wrapCallback, tagPlayer);
                });
                textManager.once('empty', wrapCallback, tagPlayer);
                tagPlayer.emit('wait.text');
            }
            break;

        case 2:  // text.name: wait text.name has been destroyed
            var name = tags[1];
            if (textManager.has(name)) {
                var textData = tagPlayer.textManager.get(name);
                var text = textData.text;
                // Remove all wait events
                tagPlayer.once(RemoveWaitEvents, function () {
                    text.off('destroy', wrapCallback, tagPlayer);
                });

                text.once('destroy', wrapCallback, tagPlayer);
                tagPlayer.emit('wait.text', name);
            } else {
                tagPlayer.emit('wait.text', name);
                wrapCallback();
            }
            break;

        case 3:  // text.name.prop: wait ease text.name.prop has been completed
            var name = tags[1];
            var prop = tags[2];
            var task;
            switch (prop) {
                case 'typing':
                    task = tagPlayer.textManager.getTypingTask(name);
                    break;
                default:
                    task = tagPlayer.textManager.getTweenTask(name, prop);
                    break;
            }

            if (task) {
                // Remove all wait events
                tagPlayer.once(RemoveWaitEvents, function () {
                    task.off('complete', wrapCallback, tagPlayer);
                });

                task.once('complete', wrapCallback, tagPlayer);
                tagPlayer.emit('wait.text', name, prop);
            } else {
                tagPlayer.emit('wait.text', name, prop);
                wrapCallback();
            }
            break;
    }

}


export { IsWaitText, WaitText };