var SetOwnerAccessMode = function(item?: any, ownerRead?: any, ownerWrite?: any) {
    if (!ownerRead && !ownerWrite) {
        return item;
    }
    var currentUser = Parse.User.current();
    if (!currentUser) {
        return item;
    }
    var acl = new Parse.ACL(currentUser);
    if (!ownerWrite) {
        acl.setPublicWriteAccess(true);
    }

    if (!ownerRead) {
        acl.setPublicReadAccess(true);
    }
    item.setACL(acl);
    return item;
}

export default SetOwnerAccessMode