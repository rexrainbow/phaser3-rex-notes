'use strict'

import Phaser from 'phaser';
import ArrCopy from './../utils/array/Copy.js';
const GetValue = Phaser.Utils.Objects.GetValue;

var ARGS = [];  // reuse this array
var runCommand = function (cmd, scope) {
    var fnName = cmd[0];
    ARGS = ArrCopy(ARGS, cmd, 1);
    var fn = scope[fnName];
    if (fn == null) {
        fn = GetValue(scope, fnName, null);
    }
    fn.apply(scope, ARGS);
}

var runCommands = function (queue, scope, reverse) {
    if (reverse === undefined) {
        reverse = false;
    }
    if (typeof (queue[0]) === 'string') {
        runCommand(queue, scope);
    } else {
        if (!reverse) {
            for (var i = 0, len = queue.length; i < len; i++) {
                runCommands(queue[i], scope, reverse);
            }
        } else {
            for (var len = queue.length, i = len - 1; i >= 0; i--) {
                runCommands(queue[i], scope, reverse);
            }
        }
    }

}
export default runCommands;