export default FitTo;

declare namespace FitTo {
    type SizeType = { width: number, height: number };
}

declare function FitTo(
    source: FitTo.SizeType,
    target: FitTo.SizeType,
    fitMode?: 0 | 'fit' | 'FIT' | 1 | 'envelop' | 'ENVELOP',
    out?: FitTo.SizeType | true
): FitTo.SizeType;


declare function FitTo(
    source: FitTo.SizeType,
    target: FitTo.SizeType,
    out?: FitTo.SizeType | true
): FitTo.SizeType;
