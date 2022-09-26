import {
    ElementProperties,
    StyleProperties,
    ElementEvents
} from './InputTextProperties.js';
import SetPrpoerties from '../../../gameobjects/dom/utils/SetProperties.js';
import RouteEvents from '../../../gameobjects/dom/utils/RouteEvents.js';
import StopPropagationTouchEvents from '../../../gameobjects/dom/utils/StopPropagationTouchEvents.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateElement = function (parent, config) {
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
    style = SetPrpoerties(StyleProperties, config, style);
    // Apply other style properties
    var elementStyle = element.style;
    for (var key in config) {
        if ((key in ElementProperties) || (key in StyleProperties)) {
            continue;
        } else if (key in elementStyle) {
            style[key] = config[key];
        }
    }
    style['box-sizing'] = 'border-box';

    // Set style
    elementStyle.position = 'absolute';
    elementStyle.opacity = 0;
    elementStyle.pointerEvents = 'none';
    elementStyle.zIndex = 0;
    // hide native blue text cursor on iOS
    elementStyle.transform = 'scale(0)';

    SetPrpoerties(ElementProperties, config, element);

    // Apply events
    RouteEvents(parent, element, ElementEvents);

    // Don't propagate touch/mouse events to parent(game canvas)
    StopPropagationTouchEvents(element);

    document.body.appendChild(element);

    return element;
}

export default CreateElement;