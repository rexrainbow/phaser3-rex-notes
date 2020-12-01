var AddPostFxPipeline = function (PostPipelineClass, gameObject) {
    var postPipelines = gameObject.postPipelines;
    if (postPipelines) {
        var postPipeline;
        for (var i = 0, cnt = postPipelines.length; i < cnt; i++) {
            postPipeline = postPipelines[i];
            if (postPipeline instanceof PostPipelineClass) {
                return postPipeline;
            }
        }
    }

    gameObject.setPostPipeline(PostPipelineClass);
    return gameObject.postPipelines[gameObject.postPipelines.length - 1];
}

export default AddPostFxPipeline;