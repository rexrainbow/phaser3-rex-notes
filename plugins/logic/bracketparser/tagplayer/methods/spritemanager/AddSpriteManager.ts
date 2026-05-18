import SpriteManager from '../../../../../utils/sprite/spritemanager/SpriteManager';
import OnParsePlayAnimationTag from './OnParsePlayAnimationTag';
import OnParsePauseAnimationTag from './OnParsePauseAnimationTag';
import OnParseChainAnimationTag from './OnParseChainAnimationTag';
import GetCreateGameObjectCallback from '../../../../../utils/sprite/spritemanager/methods/GetCreateGameObjectCallback';

const ParseCallbacks = [
    OnParsePlayAnimationTag,
    OnParsePauseAnimationTag,
    OnParseChainAnimationTag,
];

var AddSpriteManager = function(config?: any) {
    if (config === undefined) {
        config = {};
    }

    config.name = 'sprite';
    config.parseCallbacks = ParseCallbacks;
    config.createGameObject = GetCreateGameObjectCallback(config.createGameObject);

    this.addGameObjectManager(config, SpriteManager);
}

export default AddSpriteManager;