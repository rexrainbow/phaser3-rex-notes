import { EVT_GROUP_COMPLETE } from '../constants.js';
import UUID from '../../../../utils/string/UUID.js';

export default {
    runEventSheetOnce(data, config, injectData) {
        if (config === undefined) {
            config = {};
        }

        var {
            groupName = `__run_once_${UUID()}__`,
            title = `__run_once_${UUID()}__`,
            ignoreCondition = true,
            injectData: configInjectData
        } = config;

        if (injectData !== undefined) {
            configInjectData = injectData;
        }

        var eventsheet = this.buildEventSheet(data, groupName, {
            ...config,
            groupName,
            title,
            once: true
        });
        eventsheet.setTreeGroup(groupName);

        title = eventsheet.title;
        groupName = eventsheet.groupName;

        this.addTree(eventsheet, groupName);

        var eventSheetManager = this;
        var completeCallback = function (completedGroupName) {
            if (completedGroupName !== groupName) {
                return;
            }

            eventSheetManager.off(EVT_GROUP_COMPLETE, completeCallback);
            eventSheetManager.removeTreeGroup(groupName);
        };

        this.on(EVT_GROUP_COMPLETE, completeCallback);

        try {
            this.start(title, groupName, ignoreCondition, configInjectData);
        } catch (error) {
            this.off(EVT_GROUP_COMPLETE, completeCallback);
            this.removeTreeGroup(groupName);
            throw error;
        }

        return this;
    },

    runEventSheetOncePromise(data, config, injectData) {
        if (config === undefined) {
            config = {};
        }

        var {
            groupName = `__run_once_${UUID()}__`,
            title = `__run_once_${UUID()}__`,
        } = config;

        var eventSheetGroup = this.getTreeGroup(groupName);
        if (eventSheetGroup.isRunning) {
            return Promise.reject(new Error(`Event sheet group '${groupName}' is already running`));
        }

        config = {
            ...config,
            groupName,
            title
        };

        var eventSheetManager = this;
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
                eventSheetManager.runEventSheetOnce(data, config, injectData);

                if (!eventSheetGroup.isRunning) {
                    eventSheetManager.off(EVT_GROUP_COMPLETE, completeCallback);
                    resolve(eventSheetManager);
                }
            } catch (error) {
                eventSheetManager.off(EVT_GROUP_COMPLETE, completeCallback);
                eventSheetManager.removeTreeGroup(groupName);
                reject(error);
            }
        });
    },
};
