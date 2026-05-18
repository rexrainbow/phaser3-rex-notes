import TypingSpeedMethods from './TypingSpeedMethods';
import FadeOutPage from './FadeOutPage';
import Start from './Start';
import Typing from './Typing';
import Pause from './Pause';
import Resume from './Resume';
import PauseTyping from './PauseTyping';
import ResumeTyping from './ResumeTyping';
import Wait from './Wait';
import SetIgnoreWait from './SetIgnoreWait';
import SetSkipSpaceEnable from './SetSkipSpaceEnable';
import SetSkipTypingAnimation from './SetSkipTypingAnimation';
import SetSkipSoundEffect from './SetSkipSoundEffect';
import SkipCurrentTypingDelay from './SkipCurrentTypingDelay';

var Methods = {
    fadeOutPage: FadeOutPage,
    start: Start,
    typing: Typing,
    pause: Pause,
    resume: Resume,
    pauseTyping: PauseTyping,
    resumeTyping: ResumeTyping,
    wait: Wait,
    setIgnoreWait: SetIgnoreWait,
    setSkipSpaceEnable: SetSkipSpaceEnable,
    setSkipTypingAnimation: SetSkipTypingAnimation,
    setSkipSoundEffect: SetSkipSoundEffect,
    skipCurrentTypingDelay: SkipCurrentTypingDelay,
}

Object.assign(
    Methods,
    TypingSpeedMethods
);

export default Methods;