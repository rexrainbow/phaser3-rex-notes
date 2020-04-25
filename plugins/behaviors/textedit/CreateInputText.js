import InputText from '../../gameobjects/dom/inputtext/InputText.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateInputText = function (text, config) {
    if (config === undefined) {
        config = {};
    }

    var scene = text.scene;
    var style = text.style;
    var backgroundColor = GetValue(config, 'backgroundColor', style.backgroundColor);
    if (backgroundColor === null) {
        backgroundColor = 'transparent';
    }

    config.text = GetValue(config, 'text', text.text);
    config.fontFamily = GetValue(config, 'fontFamily', style.fontFamily);
    config.fontSize = GetValue(config, 'fontSize', style.fontSize);
    config.color = GetValue(config, 'color', style.color);
    config.backgroundColor = backgroundColor;
    config.align = GetValue(config, 'align', GetHAlign(style));

    // config.paddingLeft = 0;
    // config.paddingRight = 0;
    // config.paddingTop = 0;
    // config.paddingBottom = 0;
    // var valign = GetVAlign(style);
    // switch (valign) {
    //     case 'top':
    //         break;
    //     case 'bottom':
    //         break;
    // }

    var inputText = new InputText(scene,
        text.x, text.y,
        GetValue(config, 'width', text.width),
        GetValue(config, 'height', text.height),
        config
    );
    inputText.setOrigin(text.originX, text.originY);
    scene.add.existing(inputText);
    return inputText;
}

var GetHAlign = function (style) {
    if (style.hasOwnProperty('align')) {
        return style.align;
    } else if (style.hasOwnProperty('halign')) {
        return style.halign;
    } else {
        return 'left';
    }
}

var GetVAlign = function (style) {
    if (style.hasOwnProperty('halign')) {
        return style.halign;
    } else {
        return 'top';
    }
}


export default CreateInputText;