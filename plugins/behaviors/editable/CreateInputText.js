import InputText from '../../gameobjects/inputtext/InputText.js';

var CreateInputText = function (text) {
    var scene = text.scene;
    var inputText = new InputText(scene, text.x, text.y, text.width, text.height, {
        text: text.text,
        fontSize: text.style.fontSize,
        color: text.style.color,        
    });
    inputText.setOrigin(text.originX, text.originY);
    scene.displayList.add(inputText);
    return inputText;
}

export default CreateInputText;