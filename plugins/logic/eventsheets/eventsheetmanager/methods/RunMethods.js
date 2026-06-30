import { EVT_GROUP_COMPLETE } from '../constants.js';
import GetStartGroupName from './GetStartGroupName.js';

var StartPromise = function (eventSheetManager, groupName, startCallback) {
    var eventSheetGroup = eventSheetManager.getTreeGroup(groupName);

    if (eventSheetGroup.isRunning) {
        return Promise.reject(new Error(`Event sheet group '${groupName}' is already running`));
    }

    return new Promise(function (resolve, reject) {
        var completeCallback = function (completedGroupName) {
            if (completedGroupName !== groupName) {
                return;
            }

            eventSheetManager.off(EVT_GROUP_COMPLETE, completeCallback);
            resolve(eventSheetManager);
        };

        eventSheetManager.on(EVT_GROUP_COMPLETE, completeCallback);

        try {
            startCallback();

            if (!eventSheetGroup.isRunning) {
                eventSheetManager.off(EVT_GROUP_COMPLETE, completeCallback);
                resolve(eventSheetManager);
            }
        } catch (error) {
            eventSheetManager.off(EVT_GROUP_COMPLETE, completeCallback);
            reject(error);
        }
    });
}

export default {

    /*
    A group owns exactly one running context at a time.
    
    Both start() and startTree() share the same pendingTrees/isRunning state.
    When a group is running, another group run or single-tree run in the same group
    must not start until the current run completes, pauses/resumes, or is stopped.
    */

    startGroup(groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName;
        }
        this.getTreeGroup(groupName).start();
        return this;
    },

    startGroupPromise(groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName;
        }

        var self = this;
        return StartPromise(this, groupName, function () {
            self.startGroup(groupName);
        });
    },

    start() {
        var argumentsCount = arguments.length;
        switch (argumentsCount) {
            case 0:
                // Run all event sheets in default group
                this.getTreeGroup(this.defaultTreeGroupName).start();
                break;

            case 1:
                // Start an event sheet by name (arg[0]), 
                // in default group,
                // will check condition
                var name = arguments[0];
                if (this.hasTreeGroup(name)) {
                    this.getTreeGroup(name).start();
                } else {
                    this.getTreeGroup(this.defaultTreeGroupName).startTree(name);
                }
                break;

            case 2:
                // Start an event sheet by name (arg[0]),
                // in a group by name (arg[1]), will check condition, or
                // in default group, ignore condition checking (arg[1])
                var title = arguments[0];
                var ignoreCondition, groupName;
                if (typeof (arguments[1]) === 'string') {
                    ignoreCondition = true;
                    groupName = arguments[1];
                } else {
                    ignoreCondition = arguments[1];
                    groupName = this.defaultTreeGroupName;
                }
                this.getTreeGroup(groupName).startTree(title, ignoreCondition);
                break;

            default:
                // Start an event sheet by name (arg[0]), 
                // in a group by name (arg[1]), 
                // can ignore condition checking (arg[2]),
                // with scoped data injection (arg[3])
                var title = arguments[0];
                var groupName = arguments[1];
                var ignoreCondition = arguments[2];
                var injectData = arguments[3];
                this.getTreeGroup(groupName).startTree(title, ignoreCondition, injectData);
                break;
        }
        return this;
    },

    startPromise() {
        var args = arguments;
        var groupName = GetStartGroupName(this, args);

        var self = this;
        return StartPromise(this, groupName, function () {
            self.start.apply(self, args);
        });
    },

    continue(groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName;
        }
        this.getTreeGroup(groupName).continue();
        return this;
    },

    evalCondition(title, groupName, data) {
        if (typeof (groupName) !== 'string') {
            data = groupName;
            groupName = this.defaultTreeGroupName;
        }
        return this.getTreeGroup(groupName).evalCondition(title, data)
    },

}
