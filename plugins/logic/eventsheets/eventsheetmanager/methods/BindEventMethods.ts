import IsPlainObject from '../../../../utils/object/IsPlainObject';

export default {
    startGroupByEvent(eventName?: any, groupName?: any, once?: any) {
        if (IsPlainObject(eventName)) {
            var config = eventName;
            eventName = config.eventName;
            groupName = config.groupName;
            once = config.once;
        }

        if (once === undefined) {
            once = false;
        }
        var callback = function() {
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