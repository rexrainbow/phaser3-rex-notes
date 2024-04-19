import InputText from '../../../gameobjects/dom/inputtext/InputText.js';
import IsTextGameObject from '../../../utils/text/IsTextGameObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Clone = Phaser.Utils.Objects.Clone;

var CreateInputText = function (text, config) {
    if (config === undefined) {
        config = {};
    }
    config = Clone(config);

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
    config.direction = GetValue(config, 'rtl', style.rtl) ? 'rtl' : 'ltr';
    config.align = GetValue(config, 'align', GetHAlign(style));

    // Built-in text game object with RTL only has 'right' align
    if ((config.direction === 'rtl') && (IsTextGameObject(text))) {
        config.align = 'right';
    }

    var padding = text.padding;
    if (padding.left > 0) {
        config.paddingLeft = `${padding.left}px`;
    }
    if (padding.right > 0) {
        config.paddingRight = `${padding.right}px`;
    }
    // config.paddingTop = 0;
    // config.paddingBottom = 0;
    // var valign = GetVAlign(style);
    // switch (valign) {
    //     case 'top':
    //         break;
    //     case 'bottom':
    //         break;
    // }

    if (style.backgroundCornerRadius) {
        config.borderRadius = GetValue(config, 'borderRadius', `${style.backgroundCornerRadius}px`);
    }


    var inputText = new InputText(scene,
        text.x, text.y,
        GetValue(config, 'width', text.width),
        GetValue(config, 'height', text.height),
        config
    );

    inputText
        // Sync scale
        .setScale(text.scaleX, text.scaleY)
        // Sync origin
        .setOrigin(text.originX, text.originY)
        // Sync scrollFactor
        .setScrollFactor(text.scrollFactorX, text.scrollFactorY)

    var textParentContainer = text.parentContainer;
    if (!textParentContainer) {
        scene.add.existing(inputText);
    } else {
        textParentContainer.add(inputText);
    }

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