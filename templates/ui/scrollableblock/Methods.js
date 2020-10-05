import SetChild from './SetChild.js';
import GetChildrenWidth from './GetChildrenWidth.js';
import GetChildrenHeight from './GetChildrenHeight.js';
import GetChildrenSizers from './GetChildrenSizers.js';
import ResetChildPosition from './ResetChildPosition.js';
import _layout from './Layout.js';
import ChildrenMaskMethods from '../utils/ChildrenMaskMethods.js';

var methods = {
    setChild: SetChild,
    getChildrenWidth: GetChildrenWidth,
    getChildrenHeight: GetChildrenHeight,
    getChildrenSizers: GetChildrenSizers,
    resetChildPosition: ResetChildPosition,
    _layout: _layout
};

Object.assign(
    methods,
    ChildrenMaskMethods
);

export default methods;