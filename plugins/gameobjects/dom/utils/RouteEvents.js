var RouteEvents = function (gameObject, element, elementEvents) {
    for (let eventName in elementEvents) { // Note: Don't use `var` here
        element[elementEvents[eventName]] = function (e) {
            gameObject.emit(eventName, gameObject, e);
        };
    }
}

export default RouteEvents;