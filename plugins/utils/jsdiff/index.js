/* See LICENSE file for terms of use */

/*
 * Text diff implementation.
 *
 * This library supports the following APIS:
 * JsDiff.diffChars: Character by character diff
 * JsDiff.diffWords: Word (as defined by \b regex) diff which ignores whitespace
 * JsDiff.diffLines: Line based diff
 *
 * JsDiff.diffCss: Diff targeted at CSS content
 *
 * These methods are based on the implementation proposed in
 * "An O(ND) Difference Algorithm and its Variations" (Myers, 1986).
 * http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.4.6927
 */
import Diff from './diff/base.js';
import {diffChars} from './diff/character.js';
import {diffWords, diffWordsWithSpace} from './diff/word.js';
import {diffLines, diffTrimmedLines} from './diff/line.js';
import {diffSentences} from './diff/sentence.js';

import {diffCss} from './diff/css.js';
import {diffJson, canonicalize} from './diff/json.js';

import {diffArrays} from './diff/array.js';

import {applyPatch, applyPatches} from './patch/apply.js';
import {parsePatch} from './patch/parse.js';
import {merge} from './patch/merge.js';
import {structuredPatch, createTwoFilesPatch, createPatch} from './patch/create.js';

import {convertChangesToDMP} from './convert/dmp.js';
import {convertChangesToXML} from './convert/xml.js';

export {
  Diff,

  diffChars,
  diffWords,
  diffWordsWithSpace,
  diffLines,
  diffTrimmedLines,
  diffSentences,

  diffCss,
  diffJson,

  diffArrays,

  structuredPatch,
  createTwoFilesPatch,
  createPatch,
  applyPatch,
  applyPatches,
  parsePatch,
  merge,
  convertChangesToDMP,
  convertChangesToXML,
  canonicalize
};
