var InjectProperties = function (table) {
    Object.defineProperty(table, 'childOY', {
        configurable: true,
        get: function () {
            return table.tableOY;
        },
        set: function (value) {
            table.tableOY = value;
        }
    });
    Object.defineProperty(table, 'childOX', {
        configurable: true,
        get: function () {
            return table.tableOX;
        },
        set: function (value) {
            table.tableOX = value;
        }
    });
    Object.defineProperty(table, 'topChildOY', {
        get: function () {
            return table.topTableOY;
        }
    });
    Object.defineProperty(table, 'bottomChildOY', {
        get: function () {
            return table.bottomTableOY;
        }
    });
    Object.defineProperty(table, 'leftChildOX', {
        get: function () {
            return table.leftTableOX;
        }
    });
    Object.defineProperty(table, 'rightChildOX', {
        get: function () {
            return table.rightTableOX;
        }
    });
    Object.defineProperty(table, 'childVisibleHeight', {
        get: function () {
            return table.instHeight;
        }
    });
    Object.defineProperty(table, 'childHeight', {
        get: function () {
            return table.tableHeight;
        }
    });
    Object.defineProperty(table, 'childVisibleWidth', {
        get: function () {
            return table.instWidth;
        }
    });
    Object.defineProperty(table, 'childWidth', {
        get: function () {
            return table.tableWidth;
        }
    });
};

export default InjectProperties;