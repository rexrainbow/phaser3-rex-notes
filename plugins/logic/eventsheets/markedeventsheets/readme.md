## markedString Format Description

`markedString` is an event script written in Markdown. During parsing, headings and paragraphs are used to build the event flow and convert it into an event tree. The main rules are as follows:

1. Overall Structure

   * The first-level `# Title` is the name of the event table. Subsequent text (e.g., `groupName`, `parallel`, `active=false`, `once`) can specify attributes of the event table.
   * The `## [Condition]` block describes the trigger conditions; multiple `[Condition]` headings are treated as OR, and each line within a single heading is treated as AND.
   * Content between `[Condition]` and `[Catch]` headings or paragraphs are actions when the condition is met; `## [Catch]` defines actions when the condition is not met.

2. Flow Control Headings

   * Subheadings may include commands such as `[If expression]`, `[Else if expression]`, `[Else]`, `[Repeat N]`, `[While expression]` for handling conditional branches and loops.

3. Action/Command Syntax

   * Actions are written as paragraphs (or code blocks). The first line is the command name, followed by lines in the form `parameter=value`.
   * Built-in actions such as `[break]`, `[exit]`, `[activate title]`, `[deactivate title]` are written directly in square brackets.
   * When wrapped in a code block with the first line containing `commandName,param0=value,...`, the block's content will become the `text` parameter. Multiple lines of content are automatically joined with line breaks.

4. Comments and Line Breaks

   * Content starting with `//` will be ignored.
   * A line ending with `\` represents a line break in Markdown; the backslash will be removed during parsing.

This format allows the event table to be easily arranged in Markdown with conditions, flow control, and custom commands, which can then be parsed into an executable event tree.
