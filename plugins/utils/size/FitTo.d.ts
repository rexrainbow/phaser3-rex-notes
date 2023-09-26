export default FitTo;

declare namespace FitTo {
    type SizeType = { width: number, height: number };
}

declare function FitTo(
    source: FitTo.SizeType,
    target: FitTo.SizeType,
    scaleUp?: boolean,
    out?: FitTo.SizeType | true
): FitTo.SizeType;
