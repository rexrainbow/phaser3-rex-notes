import SpriteManager from '../../../../../utils/sprite/spritemanager/SpriteManager.js';
import OnParsePlayAnimationTag from './OnParsePlayAnimationTag.js';
import OnParsePauseAnimationTag from './OnParsePauseAnimationTag.js';
import OnParseChainAnimationTag from './OnParseChainAnimationTag.js';
import GetCreateGameObjectCallback from '../../../../../utils/sprite/spritemanager/methods/GetCreateGameObjectCallback.js';

const ParseCallbacks = [
    OnParsePlayAnimationTag,
    OnParsePauseAnimationTag,
    OnParseChainAnimationTag,
];

var AddSpriteManager = function (config) {
    if (config === undefined) {
        config = {};
    }

    config.name = 'sprite';
    config.parseCallbacks = ParseCallbacks;
    config.createGameObject = GetCreateGameObjectCallback(config.createGameObject);

    this.addGameObjectManager(config, SpriteManager);
}

export default AddSpriteManager;