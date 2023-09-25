const GetFirst = Phaser.Utils.Array.GetFirst;
const Remove = Phaser.Utils.Array.Remove;

var RemoveInputHandler = function (name) {
    var handler = GetFirst(this.inputHandlers, 'name', name);
    if (handler) {
        Remove(this.inputHandlers, handler);
    }

    return this;
}

export default RemoveInputHandler;