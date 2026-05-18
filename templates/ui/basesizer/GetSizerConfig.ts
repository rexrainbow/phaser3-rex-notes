import GetSizerConfig from '../utils/GetSizerConfig';

export default function(gameObject?: any) {
    if (gameObject === undefined) {
        gameObject = this;
    }
    return GetSizerConfig(gameObject);
}