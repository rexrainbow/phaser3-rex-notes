export default GetBoundsConfig;

declare namespace GetBoundsConfig {
    type BoundsType = {
        left?: number,
        right?: number,
        top?: number,
        bottom?: number
    }
    type PaddingConfigType = number | BoundsType;
}

declare function GetBoundsConfig(
    config: GetBoundsConfig.PaddingConfigType,
    out?: GetBoundsConfig.BoundsType
): GetBoundsConfig.BoundsType;