import Start from './Start.js';
import Typing from './Typing.js';
import Pause from './Pause.js';
import Resume from './Resume.js';
import PauseTyping from './PauseTyping.js';
import ResumeTyping from './ResumeTyping.js';
import Wait from './Wait.js';
import SetTimeScale from './SetTimeScale.js';
import SetIgnoreWait from './SetIgnoreWait.js';
import SetSkipTypingAnimation from './SetSkipTypingAnimation.js';
import SkipCurrentTypingDelay from './SkipCurrentTypingDelay.js';

export default {
    start: Start,
    typing: Typing,
    pause: Pause,
    resume: Resume,
    pauseTyping: PauseTyping,
    resumeTyping: ResumeTyping,
    wait: Wait,
    setTimeScale: SetTimeScale,
    setIgnoreWait: SetIgnoreWait,
    setSkipTypingAnimation: SetSkipTypingAnimation,
    skipCurrentTypingDelay: SkipCurrentTypingDelay,
}