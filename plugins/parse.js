import Parse from 'parse';
import ItemTable from './parse/itemtable/ItemTable.js';

import SetValue from './utils/object/SetValue.js';
SetValue(window, 'Parse', Parse);
SetValue(window, 'RexPlugins.Parse.ItemTable', ItemTable);