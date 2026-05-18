var OnMotionComplete = function(gameObject?: any, group?: any, no?: any) {
    gameObject.emit(`motion.complete-${group}`, no);
    gameObject.emit('motion.complete', group, no);
}

export default OnMotionComplete;