import {
    ElementProperties,
    StyleProperties,
} from './InputTextProperties';
import CopyProperty from '../../../utils/object/CopyProperty';

var CopyElementConfig = function(from?: any) {
    if (from === undefined) {
        from = {};
    }
    var to = {};

    CopyProperty(from, to, 'inputType');
    CopyProperty(from, to, 'type');
    CopyProperty(from, to, 'style');
    CopyProperty(from, to, StyleProperties);
    CopyProperty(from, to, ElementProperties);

    return to;
}

export default CopyElementConfig;