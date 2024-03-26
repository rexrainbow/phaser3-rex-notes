import CustomNodeMapping from '../nodes/CustomNodeMapping.js';
import { BehaviorTree, RUNNING } from '../../../behaviortree/index.js';
import DeepClone from '../../../../utils/object/DeepClone.js';

export default {
    dumpEventSheetGroup() {
        return this.trees.map(function (eventsheet) {
            return eventsheet.dump()
        })
    },

    loadEventSheetGroup(data) {
        data.forEach(function (treeData) {
            var eventsheet = new BehaviorTree({
                id: treeData.id,
                title: treeData.title,
                properties: DeepClone(treeData.properties),
            });
            eventsheet.load(treeData, CustomNodeMapping);
            this.trees.push(eventsheet);
        }, this);
        return this;
    },
}