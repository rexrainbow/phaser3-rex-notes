import Factory from './gameobjects/gridtable/Factory.js';
import Creator from './gameobjects/gridtable/Creator.js';
import GridTable from './gameobjects/gridtable/GridTable.js';

Phaser.GameObjects.GameObjectFactory.register('rexGridTable', Factory);
Phaser.GameObjects.GameObjectCreator.register('rexGridTable', Creator);

export default GridTable;