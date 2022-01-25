import IsPlainObject from '../../../../utils/object/IsPlainObject.js';
import {
    CreateCompositeHandlers,
    CreateActionHandlers,
    CreateDecoratorHandles
} from './Handlers.js';


var CreateNode = function (data, customNodeHandlers) {
    // SingleValue : data is not an object
    var handlerName = data.__handlerName__,
        isSingleValue = data.__isSingleValue__;
    if (isSingleValue) {
        // Get origin data
        data = data[handlerName];
    }

    // 1. Create children
    var children;
    if (!isSingleValue && data.hasOwnProperty('children')) {
        children = data.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var childObj = children[i];
            for (var key in childObj) {
                var childData = childObj[key];

                if (!IsPlainObject(childData)) {
                    // childData is a single value, wrap to an object
                    childData = childObj;
                    childData.__isSingleValue__ = true;
                }

                childData.__handlerName__ = key;
                children[i] = CreateNode(childData, customNodeHandlers);

                break;
            }

        }
    }

    // 2. Create (composite/action) node
    var retNode;
    if (handlerName in CreateCompositeHandlers) {
        retNode = CreateCompositeHandlers[handlerName](data, children);
    } else if (handlerName in CreateActionHandlers) {
        retNode = CreateActionHandlers[handlerName](data);
    } else if (handlerName in customNodeHandlers) {
        retNode = customNodeHandlers[handlerName](data, children);
    } else {
        throw `Can't create '${handlerName}' node`
    }

    // 3. Create decorators
    if (!isSingleValue) {
        var decorators = (data.decorators) ? data.decorators : data;
        var handlerNames = [];

        for (var handlerName in decorators) {
            if (
                (handlerName in CreateDecoratorHandles) ||
                (handlerName in customNodeHandlers)
            ) {
                handlerNames.push(handlerName);
            }
        }
        // Create decorators from last to first
        for (var i = handlerNames.length - 1; i >= 0; i--) {
            var handlerName = handlerNames[i];
            var handler;
            if (handlerName in CreateDecoratorHandles) {
                handler = CreateDecoratorHandles[handlerName];
            } else {
                handler = customNodeHandlers[handlerName];
            }
            retNode = handler(decorators[handlerName], retNode);
        }
    }

    return retNode;
}

export default CreateNode;