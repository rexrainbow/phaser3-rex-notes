var RouteEvents = function (gameObject, element, elementEvents, preventDefault) {
    for (let elementEventName in elementEvents) {  // Note: Don't use `var` here
        element.addEventListener(elementEventName, function (e) {
            gameObject.emit(elementEvents[elementEventName], gameObject, e);

            if (preventDefault) {
                e.preventDefault();
            }
        });
    }
}

export default RouteEvents;