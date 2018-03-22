'use strict'

import Clone from './../object/Clone.js';

var runCmd = function (cmd, scope) {
    cmd = Clone(cmd);
    var fnName = cmd.shift();
    var args = cmd;
    var fn = scope[fnName];
    fn.apply(scope, args);
}

var runQueue = function (queue, scope, reverse) {
    if (reverse === undefined) {
        reverse = false;
    }
    if (typeof (queue[0]) === 'string') {
        runCmd(queue, scope);
    } else {
        if (!reverse) {
            for (var i = 0, len = queue.length; i < len; i++) {
                runQueue(queue[i], scope, reverse);
            }
        } else {
            for (var len = queue.length, i = len - 1; i >= 0; i--) {
                runQueue(queue[i], scope, reverse);
            }
        }
    }

}
export default runQueue;