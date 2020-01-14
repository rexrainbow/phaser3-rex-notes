import ItemTable from '../../itemtable/ItemTable.js';
import GetValue from '../../../../utils/object/GetValue.js';

var CreateItemTable = function (config) {
    var itemTableConfig = GetValue(config, 'itemTable', false);
    if (!itemTableConfig) {
        return null;
    }

    var itemTable = new ItemTable({
        eventEmitter: this.getEventEmitter(),
        root: this.getItemTablePath(),

        type: GetValue(itemTableConfig, 'type', 1),
        eventNames: GetValue(itemTableConfig, 'eventNames', {})
    });

    this
        .on('room.join', function () {
            itemTable
                .startUpdate()
        })
        .on('room.leave', function () {
            itemTable
                .clear()
                .stopUpdate()
        })

    return itemTable;
}

export default CreateItemTable;