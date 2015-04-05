function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "m_rx";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.m_rx = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "RX",
        backButtonTitle: "",
        navTintColor: "#CE1D1C",
        id: "m_rx"
    });
    $.__views.m_rx && $.addTopLevelView($.__views.m_rx);
    $.__views.main = Ti.UI.createView({
        id: "main"
    });
    $.__views.m_rx.add($.__views.main);
    $.__views.__alloyId215 = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        image: "/dummy/dummy-home.jpg",
        id: "__alloyId215"
    });
    $.__views.main.add($.__views.__alloyId215);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;