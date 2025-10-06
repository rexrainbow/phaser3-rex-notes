export default GetBoundsConfig;

declare namespace GetBoundsConfig {
    type PaddingConfigType = number |
    {
        left?: number,
        right?: number,
        top?: number,
        bottom?: number
    };
}