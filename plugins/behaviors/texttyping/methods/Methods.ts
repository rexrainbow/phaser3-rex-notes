import SetTextMethods from './SetTextMethods';
import StartTyping from './StartTyping';
import StartTypingFromLine from './StartTypingFromLine';
import StopTyping from './StopTyping';
import PauseTyping from './PauseTyping';
import ResumeTyping from './ResumeTyping';

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