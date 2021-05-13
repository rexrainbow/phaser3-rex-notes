import WaitCallback from './WaitCallback.js';
import WaitTime from './WaitTime.js';
import WaitClick from './WaitClick.js';
import WaitMusic from './WaitMusic.js';
import WaitKey from './WaitKey.js';

var WaitMultiple = function (textPlayer, names, callback, args, scope) {
    if ((typeof (names) === 'string') && (names.length > 1) && (names.indexOf('|') !== -1)) {
        names = names.split('|');
    } else {
        names = [names];
    }

    for (var i = 0, cnt = names.length; i < cnt; i++) {
        var name = names[i];

        if ((name == null) || (name === 'wait')) {  // Wait event
            WaitCallback(textPlayer, callback, args, scope);

        } else if ((typeof (name) === 'number') || !isNaN(name)) { // A number, or a number string
            WaitTime(textPlayer, parseFloat(name), callback, args, scope);

        } else if (name === 'click') {  // 'click'
            WaitClick(textPlayer, callback, args, scope);

        } else if (name === 'se') {
            var music = textPlayer.soundManager.getSoundEffect();
            WaitMusic(textPlayer, music, callback, args, scope);

        } else {  // Any key
            WaitKey(textPlayer, name, callback, args, scope);
        }
    }
}

export default WaitMultiple;