import { Input } from "phaser";
// KeyCodes : Key (string) to KeyCode (number)
const KeyCodes = Input.Keyboard.KeyCodes;

var KeyMap = {};
for (var key in KeyCodes) {
    KeyMap[KeyCodes[key]] = key;
}
// KeyMap : KeyCode (number) to Key (string)

export default KeyMap;