import IsPlainObject from '../../../../utils/object/IsPlainObject.js';

export default {
    startGroupByEvent(eventName, groupName, once) {
        if (IsPlainObject(eventName)) {
            var config = eventName;
            eventName = config.eventName;
            groupName = config.groupName;
            once = config.once;
        }

        if (once === undefined) {
            once = false;
        }
        var callback = function () {
            this.startGroup(groupName);
        }

        if (!once) {
            this.on(eventName, callback, this);
        } else {
            this.once(eventName, callback, this);
        }

        return this;
    },


}