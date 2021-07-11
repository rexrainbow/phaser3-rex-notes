import Text from '../textbase/Text';

export default BBCodeText;

declare namespace BBCodeText {

    interface TextStyle extends Text.TextStyle { }
}

declare class BBCodeText extends Text { }