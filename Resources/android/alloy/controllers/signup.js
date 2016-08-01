function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doSignup() {
        var fullname = $.fullname.value;
        var email = $.email.value;
        var password = $.password.value;
        var confirm = $.confirm.value;
        var view_agreement = view_agreement_box.children[0].children[0].checked;
        if ("" == fullname.trim()) {
            common.createAlert("Error", "Please fill in your full name");
            return false;
        }
        if ("" == email.trim()) {
            common.createAlert("Error", "Please fill in your email");
            return false;
        }
        if ("1" != validateEmail(email)) {
            common.createAlert("Error", "Please fill in an valid email");
            return false;
        }
        if ("" == password.trim()) {
            common.createAlert("Error", "Please fill in your password");
            return false;
        }
        if (confirm.trim() != password.trim()) {
            common.createAlert("Error", "Your password are not match");
            return false;
        }
        if ("1" != view_agreement) {
            common.createAlert("Error", "You must agree to all the terms and conditions to register as Plux member.");
            return false;
        }
        common.showLoading();
        var params = {
            fullname: fullname,
            email: email,
            password: password,
            agreets: view_agreement
        };
        API.do_signup(params, $);
    }
    function hideProductFormKeyboard(e) {
        var exception = [ "email", "password" ];
        if (exception.indexOf(e.source.id) >= 0) return false;
        $.email.blur();
        $.password.blur();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "signup";
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
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        width: Ti.UI.FILL,
        height: Titanium.UI.FILL,
        navTintColor: "#CE1D1C",
        id: "win",
        title: "Plux Signup",
        layout: "vertical"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId260 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
        id: "__alloyId260"
    });
    $.__views.win.add($.__views.__alloyId260);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId260.add($.__views.pageTitle);
    $.__views.__alloyId261 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Sign Up",
        textAlign: "center",
        id: "__alloyId261"
    });
    $.__views.pageTitle.add($.__views.__alloyId261);
    $.__views.__alloyId262 = Ti.UI.createView({
        id: "__alloyId262"
    });
    $.__views.win.add($.__views.__alloyId262);
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 0,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#2E2E2E"
    });
    $.__views.__alloyId262.add($.__views.loadingBar);
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 30,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
    $.__views.main = Ti.UI.createScrollView({
        id: "main",
        layout: "vertical",
        height: "100%",
        contentHeight: Ti.UI.SIZE
    });
    $.__views.__alloyId262.add($.__views.main);
    $.__views.__alloyId263 = Ti.UI.createImageView({
        width: 120,
        borderRadius: 10,
        height: 120,
        backgroundColor: "#ff0000",
        bottom: "10dp",
        top: "10dp",
        image: "/images/logo_plux.png",
        id: "__alloyId263"
    });
    $.__views.main.add($.__views.__alloyId263);
    $.__views.fullname = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "50dp",
        font: {
            fontSize: "14dp"
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "90%",
        backgroundColor: "#fff",
        color: "#000000",
        borderColor: "#cccccc",
        paddingLeft: "20dp",
        paddingRight: "20dp",
        bottom: "5dp",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_NEXT,
        id: "fullname",
        hintText: "Enter Full Name",
        value: ""
    });
    $.__views.main.add($.__views.fullname);
    $.__views.email = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "50dp",
        font: {
            fontSize: "14dp"
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "90%",
        backgroundColor: "#fff",
        color: "#000000",
        borderColor: "#cccccc",
        paddingLeft: "20dp",
        paddingRight: "20dp",
        bottom: "5dp",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_NEXT,
        id: "email",
        hintText: "Enter Email",
        value: ""
    });
    $.__views.main.add($.__views.email);
    $.__views.password = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "50dp",
        font: {
            fontSize: "14dp"
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "90%",
        backgroundColor: "#fff",
        passwordMask: true,
        color: "#000000",
        borderColor: "#cccccc",
        bottom: "5dp",
        paddingLeft: "20dp",
        paddingRight: "20dp",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "password",
        hintText: "Enter Password",
        value: ""
    });
    $.__views.main.add($.__views.password);
    $.__views.confirm = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "50dp",
        font: {
            fontSize: "14dp"
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: "90%",
        backgroundColor: "#fff",
        passwordMask: true,
        color: "#000000",
        borderColor: "#cccccc",
        bottom: "5dp",
        paddingLeft: "20dp",
        paddingRight: "20dp",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "confirm",
        hintText: "Enter Confirm Password",
        value: ""
    });
    $.__views.main.add($.__views.confirm);
    $.__views.tc_area = Ti.UI.createView({
        id: "tc_area",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.main.add($.__views.tc_area);
    $.__views.sign_btn = Ti.UI.createButton({
        id: "sign_btn",
        borderRadius: 5,
        backgroundColor: "#CC2228",
        title: "Sign Up",
        width: "60%",
        top: 20,
        height: 40,
        bottom: 20,
        color: "#ffffff"
    });
    $.__views.main.add($.__views.sign_btn);
    doSignup ? $.addListener($.__views.sign_btn, "click", doSignup) : __defers["$.__views.sign_btn!click!doSignup"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Alloy.Globals.navMenu;
    common.construct($);
    var view_agreement_box = common.CheckboxwithText("Agree to all the ", "terms and conditions", {
        name: "agreets"
    }, "tnc");
    $.tc_area.add(view_agreement_box);
    $.win.addEventListener("click", hideProductFormKeyboard);
    __defers["$.__views.sign_btn!click!doSignup"] && $.addListener($.__views.sign_btn, "click", doSignup);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;