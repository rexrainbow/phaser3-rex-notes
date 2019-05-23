import InputText from '../../gameobjects/inputtext/InputText.js';

var CreateInputText = function (text) {
    var scene = text.scene;
    var inputText = new InputText(scene, text.x, text.y, text.width, text.height, {
        text: text.text,
        fontSize: text.style.fontSize,
        color: text.style.color,
        backgroundColor: text.style.backgroundColor,
    });
    inputText.setOrigin(text.originX, text.originY);
    scene.add.existing(inputText);
    return inputText;
}

export default CreateInputText;