import ItemTable from './ItemTable';
import ObjectFactory from '../../ObjectFactory';
import SetValue from '../../../utils/object/SetValue';

ObjectFactory.register('itemTable', function(config?: any) {
    return new ItemTable(config);
});

SetValue(window, 'RexPlugins.Fire.ItemTable', ItemTable);

export default ItemTable;