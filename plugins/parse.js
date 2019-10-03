import Parse from 'parse/dist/parse.min.js';
import ItemTable from './parse/itemtable/ItemTable.js';
import QuickLogin from './parse/quicklogin/QuickLogin.js';

import SetValue from './utils/object/SetValue.js';
SetValue(window, 'Parse', Parse);
SetValue(window, 'RexPlugins.Parse.ItemTable', ItemTable);
SetValue(window, 'RexPlugins.Parse.QuickLogin', QuickLogin);