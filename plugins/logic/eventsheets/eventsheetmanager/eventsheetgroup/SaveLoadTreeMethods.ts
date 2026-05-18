import CustomNodeMapping from '../nodes/CustomNodeMapping';
import { BehaviorTree, RUNNING } from '../../../behaviortree/index';
import DeepClone from '../../../../utils/object/DeepClone';

export default {
    dumpEventSheetGroup() {
        return this.trees.map(function(eventsheet?: any) {
            return eventsheet.dump()
        })
    },

    loadEventSheetGroup(data?: any) {
        data.forEach(function(treeData?: any) {
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