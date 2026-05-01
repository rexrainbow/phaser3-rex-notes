import { Utils as PhaserUtils } from 'phaser';
const GetFirst = PhaserUtils.Array.GetFirst;
const Remove = PhaserUtils.Array.Remove;

var RemoveInputHandler = function (name) {
    var handler = GetFirst(this.inputHandlers, 'name', name);
    if (handler) {
        Remove(this.inputHandlers, handler);
    }

    return this;
}

export default RemoveInputHandler;