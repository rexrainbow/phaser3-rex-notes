import { Utils as PhaserUtils } from 'phaser';
import {
    ElementProperties,
    StyleProperties,
} from './InputTextProperties';
import SetPrpoerties from '../../../gameobjects/dom/utils/SetProperties';
import StopPropagationTouchEvents from '../../../gameobjects/dom/utils/StopPropagationTouchEvents';
import OnOpen from './OnOpen';
import OnClose from './OnClose';

const GetValue = PhaserUtils.Objects.GetValue;

var CreateElement = function(parent?: any, config?: any) {
    var element;
    var textType = GetValue(config, 'inputType', undefined);
    if (textType === undefined) {
        textType = GetValue(config, 'type', 'text');
    }
    if (textType === 'textarea') {
        element = document.createElement('textarea');
        element.style.resize = 'none';
    } else {
        element = document.createElement('input');
        element.type = textType;
    }

    var style = GetValue(config, 'style', undefined);
    // Apply other style properties
    var elementStyle = element.style;
    SetPrpoerties(StyleProperties, style, elementStyle);
    // Set style
    elementStyle.position = 'absolute';
    elementStyle.opacity = 0;
    elementStyle.pointerEvents = 'none';
    elementStyle.zIndex = 0;
    // hide native blue text cursor on iOS
    elementStyle.transform = 'scale(0)';

    SetPrpoerties(ElementProperties, config, element);

    // Don't propagate touch/mouse events to parent(game canvas)
    StopPropagationTouchEvents(element);

    // Attach element to fullscreenTarget in full screen mode
    var scaleManager = parent.scene.sys.scale;
    var parentElement = (scaleManager.isFullscreen) ? scaleManager.fullscreenTarget : document.body;
    parentElement.appendChild(element);

    // open() -> 'focus' -> OnOpen
    element.addEventListener('focus', function(e?: any) {
        OnOpen.call(parent);
    });

    // close() -> 'blur' -> OnClose
    element.addEventListener('blur', function(e?: any) {
        OnClose.call(parent);
    });

    return element;
}

export default CreateElement;