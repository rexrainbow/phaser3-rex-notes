var RouteEvents = function (gameObject, element, elementEvents) {
    for (let eventName in elementEvents) { // Note: Don't use `var` here
        element[elementEvents[eventName]] = function () {
            gameObject.emit(eventName, gameObject);
        };
    }
}

export default RouteEvents;