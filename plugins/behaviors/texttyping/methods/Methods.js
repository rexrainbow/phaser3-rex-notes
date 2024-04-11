import StartTyping from './StartTyping.js';
import StartTypingFromLine from './StartTypingFromLine.js';
import StopTyping from './StopTyping.js';
import PauseTyping from './PauseTyping.js';
import ResumeTyping from './ResumeTyping.js';
import AppendText from './AppendText.js';

var methods = {
    start: StartTyping,
    startFromLine: StartTypingFromLine,
    stop: StopTyping,
    pause: PauseTyping,
    resumeTyping: ResumeTyping,
    appendText: AppendText,
}

export default methods;