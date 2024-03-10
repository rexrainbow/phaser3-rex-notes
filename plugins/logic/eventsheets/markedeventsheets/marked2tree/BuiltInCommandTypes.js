export const StringType = 0;
export const RegexType = 1;

export const TopLevelCommandTypes = [
    { name: 'condition' },
    { name: 'catch' },
];

export const HeadingCommand = [
    { name: 'if' },
    { name: 'else' },
    { name: 'while' },
    {
        name: 'repeat',
        pattern: new RegExp('repeat\\s*(.+)', 'i')
    },
];

export const ActionCommandTypes = [
    { name: 'exit' },
    { name: 'break' },
    { name: 'next round' },
    { name: 'deactivate' },
];