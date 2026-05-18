var OnMotionStart = function(gameObject?: any, group?: any, no?: any) {
    gameObject.emit(`motion.start-${group}`, no);
    gameObject.emit('motion.start', group, no);
}

export default OnMotionStart;