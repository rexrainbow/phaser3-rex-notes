import GameObjectManagerMethods from './gameobjectmanager/GameObjectManagerMethods.js';
import SetClickTarget from './SetClickTarget.js';
import SetTargetCamera from './SetTargetCamera.js';
import SetNextPageInput from './SetNextPageInput.js';
import AddImage from './AddImage.js';
import PlayMethods from './PlayMethods.js';
import TypingNextPage from './TypingNextPage.js';
import PauseMethods from './PauseMethods.js';
import Resume from './Resume.js';
import Wait from './Wait.js';
import TypingSpeedMethods from './TypingSpeedMethods.js';
import SetTimeScale from './SetTimeScale.js';
import SetIgnoreWait from './SetIgnoreWait.js';
import SetIgnoreNextPageInput from './SetIgnoreNextPageInput.js';
import ShowPage from './ShowPage.js';
import GameObjectMethods from './gameobjectmanager/GameObjectMethods.js';
import SpriteMethods from './spritemanager/SpriteMethods.js';

var Methods = {
    setClickTarget: SetClickTarget,
    setTargetCamera: SetTargetCamera,
    setNextPageInput: SetNextPageInput,
    addImage: AddImage,
    typingNextPage: TypingNextPage,
    resume: Resume,
    wait: Wait,
    setTimeScale: SetTimeScale,
    setIgnoreWait: SetIgnoreWait,
    setIgnoreNextPageInput: SetIgnoreNextPageInput,
    showPage: ShowPage,
}

Object.assign(
    Methods,
    GameObjectManagerMethods,
    PlayMethods,
    PauseMethods,
    TypingSpeedMethods,
    GameObjectMethods,
    SpriteMethods,
);

export default Methods;