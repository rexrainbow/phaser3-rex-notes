export default FitTo;

declare namespace FitTo {
    /**
     * Width and height pair.
     */
    type SizeType = { width: number, height: number };
}

/**
 * Fit source size to target size with fit mode.
 *
 * @param source - Source size.
 * @param target - Target size.
 * @param fitMode - Fit mode.
 * @param out - Output object or true to use an internal object.
 * @returns Fitted size.
 */
declare function FitTo(
    source: FitTo.SizeType,
    target: FitTo.SizeType,
    fitMode?: 0 | 'fit' | 'FIT' | 1 | 'envelop' | 'ENVELOP',
    out?: FitTo.SizeType | true
): FitTo.SizeType;


/**
 * Fit source size to target size using default fit mode.
 *
 * @param source - Source size.
 * @param target - Target size.
 * @param out - Output object or true to use an internal object.
 * @returns Fitted size.
 */
declare function FitTo(
    source: FitTo.SizeType,
    target: FitTo.SizeType,
    out?: FitTo.SizeType | true
): FitTo.SizeType;
