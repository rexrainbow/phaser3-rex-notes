import GameObjectManagerMethods from './gameobjectmanager/GameObjectManagerMethods';
import SetClickTarget from './SetClickTarget';
import SetCameraTarget from './SetCameraTarget';
import SetNextPageInput from './SetNextPageInput';
import AddImage from './AddImage';
import PlayMethods from './PlayMethods';
import TypingNextPage from './TypingNextPage';
import PauseMethods from './PauseMethods';
import ResumeMethods from './ResumeMethods';
import Wait from './Wait';
import TypingSpeedMethods from './TypingSpeedMethods';
import SetIgnoreWait from './SetIgnoreWait';
import SetIgnoreNextPageInput from './SetIgnoreNextPageInput';
import ShowPage from './ShowPage';
import SpriteMethods from './spritemanager/SpriteMethods';
import ContentMethods from './ContentMethods';

var Methods = {
    setClickTarget: SetClickTarget,
    setCameraTarget: SetCameraTarget,
    setNextPageInput: SetNextPageInput,
    addImage: AddImage,
    typingNextPage: TypingNextPage,
    wait: Wait,
    setIgnoreWait: SetIgnoreWait,
    setIgnoreNextPageInput: SetIgnoreNextPageInput,
    showPage: ShowPage,
}

Object.assign(
    Methods,
    GameObjectManagerMethods,
    PlayMethods,
    PauseMethods,
    ResumeMethods,
    TypingSpeedMethods,
    SpriteMethods,
    ContentMethods,
);

export default Methods;