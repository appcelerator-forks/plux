function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function submitPassword() {
        common.showLoading();
        var password = $.password.value;
        var confirm = $.password2.value;
        if ("" == password.trim()) {
            common.hideLoading();
            common.createAlert("Error", "Please fill in your password");
            return false;
        }
        if (confirm.trim() != password.trim()) {
            common.hideLoading();
            common.createAlert("Error", "Your password are not match");
            return false;
        }
        var params = {
            username: loginId,
            password: password
        };
        API.doChangePassword(params, $);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/changePassword";
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
    $.__views.changePasswordWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        width: Ti.UI.FILL,
        height: Titanium.UI.FILL,
        navTintColor: "#CE1D1C",
        id: "changePasswordWin",
        title: "Login",
        layout: "vertical"
    });
    $.__views.changePasswordWin && $.addTopLevelView($.__views.changePasswordWin);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 0,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#2E2E2E"
    });
    $.__views.changePasswordWin.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
<<<<<<< HEAD
        top: 30,
=======
        top: 10,
>>>>>>> origin/master
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId414 = Ti.UI.createLabel({
=======
    $.__views.__alloyId416 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 5,
<<<<<<< HEAD
        text: "Loading",
        id: "__alloyId414"
    });
    $.__views.loadingBar.add($.__views.__alloyId414);
    $.__views.__alloyId415 = Ti.UI.createView({
        layout: "vertical",
        height: "100%",
        id: "__alloyId415"
    });
    $.__views.changePasswordWin.add($.__views.__alloyId415);
    $.__views.__alloyId416 = Ti.UI.createView({
=======
        bottom: 10,
        text: "Loading",
        id: "__alloyId416"
    });
    $.__views.loadingBar.add($.__views.__alloyId416);
    $.__views.__alloyId417 = Ti.UI.createView({
        layout: "vertical",
        height: "100%",
        id: "__alloyId417"
    });
    $.__views.changePasswordWin.add($.__views.__alloyId417);
    $.__views.__alloyId418 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId416"
    });
    $.__views.__alloyId415.add($.__views.__alloyId416);
    $.__views.__alloyId417 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId417"
    });
    $.__views.__alloyId416.add($.__views.__alloyId417);
=======
        id: "__alloyId418"
    });
    $.__views.__alloyId417.add($.__views.__alloyId418);
    $.__views.__alloyId419 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId419"
    });
    $.__views.__alloyId418.add($.__views.__alloyId419);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId417.add($.__views.btnBack);
=======
    $.__views.__alloyId419.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "60%"
    });
<<<<<<< HEAD
    $.__views.__alloyId416.add($.__views.pageTitle);
    $.__views.__alloyId418 = Ti.UI.createLabel({
=======
    $.__views.__alloyId418.add($.__views.pageTitle);
    $.__views.__alloyId420 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Change Password",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId418"
    });
    $.__views.pageTitle.add($.__views.__alloyId418);
=======
        id: "__alloyId420"
    });
    $.__views.pageTitle.add($.__views.__alloyId420);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createScrollView({
        id: "main",
        layout: "vertical",
        height: "100%",
        contentHeight: Ti.UI.SIZE
    });
<<<<<<< HEAD
    $.__views.__alloyId415.add($.__views.main);
    $.__views.__alloyId419 = Ti.UI.createImageView({
=======
    $.__views.__alloyId417.add($.__views.main);
    $.__views.__alloyId421 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: 120,
        borderRadius: 10,
        height: 120,
        backgroundColor: "#ff0000",
        bottom: "30dp",
        top: "30dp",
        image: "/images/asp_logo.png",
<<<<<<< HEAD
        id: "__alloyId419"
    });
    $.__views.main.add($.__views.__alloyId419);
=======
        id: "__alloyId421"
    });
    $.__views.main.add($.__views.__alloyId421);
>>>>>>> origin/master
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.FILL,
        height: "40dp",
        color: "#6E6E6E",
        bottom: "10dp",
        textAlign: "center",
        font: {
            fontSize: "12dp"
        },
        id: "description"
    });
    $.__views.main.add($.__views.description);
    $.__views.password = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "50dp",
        font: {
            fontSize: "14dp"
        },
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "90%",
        backgroundColor: "#fff",
        passwordMask: true,
        color: "#000000",
        borderColor: "#cccccc",
        paddingLeft: "20dp",
        paddingRight: "20dp",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "password",
        hintText: "Enter Password",
        value: ""
    });
    $.__views.main.add($.__views.password);
    $.__views.password2 = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "50dp",
        font: {
            fontSize: "14dp"
        },
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "90%",
        backgroundColor: "#fff",
        passwordMask: true,
        color: "#000000",
        borderColor: "#cccccc",
        paddingLeft: "20dp",
        paddingRight: "20dp",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "password2",
        hintText: "Enter Confirm Password",
        top: 10,
        value: ""
    });
    $.__views.main.add($.__views.password2);
<<<<<<< HEAD
    $.__views.__alloyId420 = Ti.UI.createButton({
=======
    $.__views.__alloyId422 = Ti.UI.createButton({
>>>>>>> origin/master
        borderRadius: 5,
        backgroundColor: "#7B7B7B",
        title: "Change Password",
        width: "70%",
        top: 10,
        height: 40,
        color: "#ffffff",
<<<<<<< HEAD
        id: "__alloyId420"
    });
    $.__views.main.add($.__views.__alloyId420);
    submitPassword ? $.addListener($.__views.__alloyId420, "touchend", submitPassword) : __defers["$.__views.__alloyId420!touchend!submitPassword"] = true;
=======
        id: "__alloyId422"
    });
    $.__views.main.add($.__views.__alloyId422);
    submitPassword ? $.addListener($.__views.__alloyId422, "touchend", submitPassword) : __defers["$.__views.__alloyId422!touchend!submitPassword"] = true;
>>>>>>> origin/master
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var loginId = Ti.App.Properties.getString("asp_email");
    $.description.text = "You are about to change password for " + loginId;
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.changePasswordWin);
    });
<<<<<<< HEAD
    __defers["$.__views.__alloyId420!touchend!submitPassword"] && $.addListener($.__views.__alloyId420, "touchend", submitPassword);
=======
    __defers["$.__views.__alloyId422!touchend!submitPassword"] && $.addListener($.__views.__alloyId422, "touchend", submitPassword);
>>>>>>> origin/master
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;