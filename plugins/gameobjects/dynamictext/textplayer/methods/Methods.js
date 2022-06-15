import SetClickTarget from './SetClickTarget.js';
import SetTargetCamera from './SetTargetCamera.js';
import SetNextPageInput from './SetNextPageInput.js';
import AddImage from './AddImage.js';
import Play from './Play.js';
import PlayPromise from './PlayPromise.js';
import TypingNextPage from './TypingNextPage.js';
import Pause from './Pause.js';
import PauseTyping from './PauseTyping.js';
import Resume from './Resume.js';
import TypingSpeedMethods from './TypingSpeedMethods.js';
import SetTimeScale from './SetTimeScale.js';
import SetIgnoreWait from './SetIgnoreWait.js';
import SetIgnoreNextPageInput from './SetIgnoreNextPageInput.js';
import ShowPage from './ShowPage.js';

var Methods = {
    setClickTarget: SetClickTarget,
    setTargetCamera: SetTargetCamera,
    setNextPageInput: SetNextPageInput,
    addImage: AddImage,
    play: Play,
    playPromise: PlayPromise,
    typingNextPage: TypingNextPage,
    pause: Pause,
    pauseTyping: PauseTyping,
    resume: Resume,
    setTimeScale: SetTimeScale,
    setIgnoreWait: SetIgnoreWait,
    setIgnoreNextPageInput: SetIgnoreNextPageInput,
    showPage: ShowPage,
}

Object.assign(
    Methods,
    TypingSpeedMethods
);

export default Methods;