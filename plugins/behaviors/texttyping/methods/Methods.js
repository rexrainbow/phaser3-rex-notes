import SetTextMethods from './SetTextMethods.js';
import StartTyping from './StartTyping.js';
import StartTypingFromLine from './StartTypingFromLine.js';
import StopTyping from './StopTyping.js';
import PauseTyping from './PauseTyping.js';
import ResumeTyping from './ResumeTyping.js';

var methods = {
    start: StartTyping,
    startFromLine: StartTypingFromLine,
    stop: StopTyping,
    pause: PauseTyping,
    resumeTyping: ResumeTyping,
}

Object.assign(
    methods,
    SetTextMethods
)

export default methods;