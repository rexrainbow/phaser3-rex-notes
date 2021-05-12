import WaitTime from './WaitTime.js';
import WaitClick from './WaitClick.js';
import WaitKey from './WaitKey.js';

var WaitMultiple = function (textPlayer, names, callback, args, scope) {
    names = names.split('|');
    for (var i = 0, cnt = names.length; i < cnt; i++) {
        var name = names[i];
        if (isNaN(name)) {
            if (name === 'click') {
                WaitClick(textPlayer, callback, args, scope);
            } else {
                WaitKey(textPlayer, name, callback, args, scope);
            }
        } else {
            WaitTime(textPlayer, parseFloat(name), callback, args, scope);
        }
    }
}

export default WaitMultiple;