import HiddenInputText from './HiddenInputText.js';

export default function (textObject, config) {
    var gameObject = new HiddenInputText(textObject, config);
    // Note: Don't add this game object into scene
    return gameObject;
};