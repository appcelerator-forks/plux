function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function navProfile(e) {
        var target = e.source.mod;
        "asp" == target ? nav.navigationWindow(target + "/profile", 1) : nav.navigateWithArgs("plux_profile", {});
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "profile";
    this.args = arguments[0] || {};
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
    var __defers = {};
    $.__views.myProfile = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        navTintColor: "#CE1D1C",
        title: "My Profile",
        id: "myProfile",
        layout: "vertical"
    });
    $.__views.myProfile && $.addTopLevelView($.__views.myProfile);
    $.__views.__alloyId164 = Ti.UI.createView({
        layout: "vertical",
        height: "100%",
        id: "__alloyId164"
    });
    $.__views.myProfile.add($.__views.__alloyId164);
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        color: "#6E6E6E",
        top: "10dp",
        textAlign: "center",
        font: {
            fontSize: "14dp"
        },
        id: "description",
        text: "Please choose profile of the below services"
    });
    $.__views.__alloyId164.add($.__views.description);
    $.__views.scrollboard = Ti.UI.createScrollView({
        id: "scrollboard",
        width: Titanium.UI.FILL,
        height: Ti.UI.FILL,
        zIndex: "3"
    });
    $.__views.__alloyId164.add($.__views.scrollboard);
    $.__views.__alloyId165 = Ti.UI.createView({
        layout: "horizontal",
        width: "293",
        top: "20",
        id: "__alloyId165"
    });
    $.__views.scrollboard.add($.__views.__alloyId165);
    $.__views.__alloyId166 = Ti.UI.createImageView({
        top: "30dp",
        borderRadius: "10",
        width: "120",
        left: "15",
        height: "120",
        mod: "plux",
        backgroundColor: "#ff0000",
        bottom: "30dp",
        image: "/images/logo_plux.png",
        id: "__alloyId166"
    });
<<<<<<< HEAD
    $.__views.__alloyId142.add($.__views.__alloyId143);
    navProfile ? $.addListener($.__views.__alloyId143, "click", navProfile) : __defers["$.__views.__alloyId143!click!navProfile"] = true;
    $.__views.__alloyId144 = Ti.UI.createImageView({
=======
    $.__views.__alloyId165.add($.__views.__alloyId166);
    navProfile ? $.addListener($.__views.__alloyId166, "click", navProfile) : __defers["$.__views.__alloyId166!click!navProfile"] = true;
    $.__views.__alloyId167 = Ti.UI.createImageView({
>>>>>>> origin/master
        top: "30dp",
        borderRadius: "10",
        width: "120",
        left: "15",
        height: "120",
        mod: "asp",
        backgroundColor: "#ff0000",
        bottom: "30dp",
        image: "/images/asp_logo.png",
        id: "__alloyId167"
    });
<<<<<<< HEAD
    $.__views.__alloyId142.add($.__views.__alloyId144);
    navProfile ? $.addListener($.__views.__alloyId144, "click", navProfile) : __defers["$.__views.__alloyId144!click!navProfile"] = true;
=======
    $.__views.__alloyId165.add($.__views.__alloyId167);
    navProfile ? $.addListener($.__views.__alloyId167, "click", navProfile) : __defers["$.__views.__alloyId167!click!navProfile"] = true;
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    "android" == Ti.Platform.osname && $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.myProfile);
    });
<<<<<<< HEAD
    __defers["$.__views.__alloyId143!click!navProfile"] && $.addListener($.__views.__alloyId143, "click", navProfile);
    __defers["$.__views.__alloyId144!click!navProfile"] && $.addListener($.__views.__alloyId144, "click", navProfile);
=======
    __defers["$.__views.__alloyId166!click!navProfile"] && $.addListener($.__views.__alloyId166, "click", navProfile);
    __defers["$.__views.__alloyId167!click!navProfile"] && $.addListener($.__views.__alloyId167, "click", navProfile);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;