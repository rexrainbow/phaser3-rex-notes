import MiniBoard from './MiniBoard';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../utils/object/SetValue';

ObjectFactory.register('miniBoard', function(x?: any, y?: any, config?: any) {
    var gameObject = new MiniBoard(this.scene, x, y, config);
    this.scene.add.existing(gameObject);  
    return gameObject;
});

SetValue(window, 'RexPlugins.Board.MiniBoard', MiniBoard);

export default MiniBoard;