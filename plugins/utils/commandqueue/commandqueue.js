'use strict'

import Phaser from 'phaser';
const GetValue = Phaser.Utils.Objects.GetValue;

var runCmd = function (cmd, scope) {
    var fnName = cmd[0];
    var args = cmd.slice(1);
    var fn = scope[fnName];
    if (fn == null) {
        fn = GetValue(scope, fnName, null);
    }
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