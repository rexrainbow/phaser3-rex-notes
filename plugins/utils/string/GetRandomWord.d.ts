export default GetRandomWord;

/**
 * Generate a random word from candidate characters.
 *
 * @param min - Minimum word length.
 * @param max - Maximum word length.
 * @param candidates - Candidate character set.
 * @returns Randomly generated word.
 */
declare function GetRandomWord(
    min: number,
    max?: number,
    candidates?: string
): string;
