import AllEvents from './AllEvents.js';

var NormalizeEvents = function (events) {
    if ((events === undefined) || (events === 'all')) {
        return AllEvents.slice();
    }

    if (typeof (events) === 'string') {
        return [events];
    }

    return events.slice();
}

export default NormalizeEvents;
