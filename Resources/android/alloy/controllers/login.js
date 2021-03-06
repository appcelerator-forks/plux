function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doLogin() {
        loading.start();
        var email = $.email.value;
        var password = $.password.value;
        if ("" == email || "" == password) {
            common.createAlert("Authentication warning", "Please fill in email and password");
            loading.finish();
            return;
        }
        if (singleton) {
            singleton = false;
            var params = {
                email: email,
                password: password
            };
            API.do_pluxLogin(params, function(success) {
                console.log(success + " success");
                if (success) {
                    Alloy.createController("home").getView();
                    $.win.close();
                }
                singleton = true;
                loading.finish();
            });
        }
    }
    function hideProductFormKeyboard(e) {
        if ("TextField" != e.source.id) {
            if ("email" == e.source.id) return false;
            if ("password" == e.source.id) return false;
            $.email.blur();
            $.password.blur();
        }
    }
    function doSignup() {
        var win = Alloy.createController("signup").getView();
        win.open();
    }
    function doASPSignup() {
        var win = Alloy.createController("asp/signup").getView();
        win.open();
    }
    function showForgetPassword() {
        $.forgetPasswordBox.show();
    }
    function doForgotPassword() {
        if ("" == $.box_value.value) {
            closeBox();
            $.box_value.value = "";
            return;
        }
        loading.start();
        params = {
            email: $.box_value.value
        };
        API.callByPost({
            url: "doforgotPassword",
            params: params
        }, function(responseText) {
            console.log(responseText);
            var res = JSON.parse(responseText);
            alert(res.data);
            closeBox();
            $.box_value.value = "";
            loading.finish();
        });
    }
    function closeBox() {
        $.forgetPasswordBox.hide();
    }
    function loginFacebook(e) {
        if (e.success) {
            loading.start();
            FACEBOOK.requestWithGraphPath("me", {
                fields: "id, email,name,link"
            }, "GET", function(e) {
                if (e.success) {
                    var fbRes = JSON.parse(e.result);
                    Ti.App.Properties.setString("plux_email", fbRes.email);
                    API.updateUserFromFB({
                        email: fbRes.email,
                        fbid: fbRes.id,
                        link: fbRes.link,
                        name: fbRes.name,
                        gender: fbRes.gender
                    }, $);
                }
            });
            FACEBOOK.removeEventListener("login", loginFacebook);
        } else e.error ? loading.finish() : e.cancelled && loading.finish();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        windowSoftInputMode: Ti.UI.Android.SOFT_INPUT_STATE_HIDDEN,
        width: Ti.UI.FILL,
        height: Titanium.UI.FILL,
        navTintColor: "#CE1D1C",
        title: "Login",
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.__alloyId187 = Ti.UI.createView({
        left: 0,
        id: "__alloyId187"
    });
    $.__views.win.leftNavButton = $.__views.__alloyId187;
    $.__views.forgetPasswordBox = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        borderColor: "#dfe0e4",
        backgroundColor: "#FFFFFF",
        id: "forgetPasswordBox",
        zIndex: 10,
        left: 10,
        right: 10
    });
    $.__views.win.add($.__views.forgetPasswordBox);
    $.__views.__alloyId188 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "__alloyId188"
    });
    $.__views.forgetPasswordBox.add($.__views.__alloyId188);
    $.__views.addbox_title = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#606060",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        text: "Forgot Password",
        id: "addbox_title",
        verticalAlign: "center"
    });
    $.__views.__alloyId188.add($.__views.addbox_title);
    $.__views.__alloyId189 = Ti.UI.createImageView({
        height: 40,
        image: "/images/cross.png",
        right: 0,
        id: "__alloyId189"
    });
    $.__views.__alloyId188.add($.__views.__alloyId189);
    closeBox ? $.addListener($.__views.__alloyId189, "click", closeBox) : __defers["$.__views.__alloyId189!click!closeBox"] = true;
    $.__views.box_value = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: "14dp"
        },
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        id: "box_value",
        hintText: "Email"
    });
    $.__views.forgetPasswordBox.add($.__views.box_value);
    $.__views.__alloyId190 = Ti.UI.createButton({
        height: 40,
        borderColor: "#C6C8CA",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        backgroundColor: "#ED1C24",
        borderRadius: 6,
        color: "#ffffff",
        width: Titanium.UI.FILL,
        left: 10,
        right: 10,
        top: 10,
        font: {
            fontFamily: "Lato-Regular"
        },
        title: "Send",
        bottom: 10,
        id: "__alloyId190"
    });
    $.__views.forgetPasswordBox.add($.__views.__alloyId190);
    doForgotPassword ? $.addListener($.__views.__alloyId190, "click", doForgotPassword) : __defers["$.__views.__alloyId190!click!doForgotPassword"] = true;
    $.__views.__alloyId191 = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        id: "__alloyId191"
    });
    $.__views.win.add($.__views.__alloyId191);
    $.__views.__alloyId192 = Ti.UI.createView({
        layout: "horizontal",
        height: 50,
        width: Ti.UI.FILL,
        backgroundColor: "#DEDEDE",
        id: "__alloyId192"
    });
    $.__views.__alloyId191.add($.__views.__alloyId192);
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "90%"
    });
    $.__views.__alloyId192.add($.__views.pageTitle);
    $.__views.__alloyId193 = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Login",
        textAlign: "center",
        id: "__alloyId193"
    });
    $.__views.pageTitle.add($.__views.__alloyId193);
    $.__views.main = Ti.UI.createScrollView({
        id: "main",
        layout: "vertical",
        height: "100%",
        contentHeight: Ti.UI.SIZE
    });
    $.__views.__alloyId191.add($.__views.main);
    $.__views.__alloyId194 = Ti.UI.createImageView({
        width: 120,
        borderRadius: 10,
        height: 120,
        backgroundColor: "#ff0000",
        bottom: "20dp",
        top: "20dp",
        image: "/images/logo_plux.png",
        id: "__alloyId194"
    });
    $.__views.main.add($.__views.__alloyId194);
    $.__views.email = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "50dp",
        font: {
            fontSize: "14dp"
        },
        borderWidth: "1px",
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
    $.__views.loginAccountButton = Ti.UI.createButton({
        id: "loginAccountButton",
        borderRadius: 5,
        backgroundColor: "#CC2228",
        title: "Login",
        width: "70%",
        top: 20,
        height: 40,
        color: "#ffffff"
    });
    $.__views.main.add($.__views.loginAccountButton);
    doLogin ? $.addListener($.__views.loginAccountButton, "touchend", doLogin) : __defers["$.__views.loginAccountButton!touchend!doLogin"] = true;
    $.__views.fbloginView = Ti.UI.createView({
        height: 60,
        id: "fbloginView",
        width: "70%"
    });
    $.__views.main.add($.__views.fbloginView);
    $.__views.registerAccountButton = Ti.UI.createButton({
        id: "registerAccountButton",
        borderRadius: 5,
        backgroundColor: "#7B7B7B",
        title: "Register for PLUX",
        width: "70%",
        top: 5,
        height: 40,
        color: "#ffffff"
    });
    $.__views.main.add($.__views.registerAccountButton);
    doSignup ? $.addListener($.__views.registerAccountButton, "touchend", doSignup) : __defers["$.__views.registerAccountButton!touchend!doSignup"] = true;
    $.__views.registerAccountButton = Ti.UI.createButton({
        id: "registerAccountButton",
        borderRadius: 5,
        backgroundColor: "#7B7B7B",
        title: "Register for ASP",
        width: "70%",
        top: 5,
        height: 40,
        color: "#ffffff"
    });
    $.__views.main.add($.__views.registerAccountButton);
    doASPSignup ? $.addListener($.__views.registerAccountButton, "touchend", doASPSignup) : __defers["$.__views.registerAccountButton!touchend!doASPSignup"] = true;
    $.__views.__alloyId195 = Ti.UI.createButton({
        borderRadius: 5,
        backgroundColor: "#7B7B7B",
        title: "Forget Password",
        width: "70%",
        top: 5,
        height: 40,
        color: "#ffffff",
        id: "__alloyId195"
    });
    $.__views.main.add($.__views.__alloyId195);
    showForgetPassword ? $.addListener($.__views.__alloyId195, "touchend", showForgetPassword) : __defers["$.__views.__alloyId195!touchend!showForgetPassword"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var singleton = true;
    common.construct($);
    var usersPluxModel = Alloy.createCollection("users_plux");
    var preset_email = Ti.App.Properties.getString("plux_email") || "";
    var loading = Alloy.createController("loading");
    $.win.add(loading.getView());
    console.log("login open");
    closeBox();
    $.email.value = preset_email;
    var isKeyboardFocus = 0;
    $.win.addEventListener("click", hideProductFormKeyboard);
    $.email.addEventListener("touchend", function(e) {
        $.email.focus();
        isKeyboardFocus = 1;
    });
    $.password.addEventListener("touchend", function(e) {
        $.password.focus();
        isKeyboardFocus = 1;
    });
    $.email.addEventListener("return", function() {
        $.password.focus();
    });
    $.password.addEventListener("return", function() {
        doLogin();
    });
    $.win.fbProxy = FACEBOOK.createActivityWorker({
        lifecycleContainer: $.win
    });
    $.fbloginView.add(FACEBOOK.createLoginButton({
        top: 10,
        readPermissions: [ "email", "public_profile", "user_friends" ],
        style: FACEBOOK.BUTTON_STYLE_WIDE
    }));
    FACEBOOK.addEventListener("login", loginFacebook);
    var touchLogin = function() {
        var email = $.email.value;
        var userData = usersPluxModel.getUserByEmail(email);
        if (userData && "" != email) {
            Ti.App.removeEventListener("touchLogin", touchLogin);
            API.getUserService({
                u_id: userData.id
            });
            Ti.App.Properties.setString("u_id", userData.id);
            Ti.App.Properties.setString("plux_email", userData.email);
            Ti.App.fireEvent("updateHeader");
            $.win.close();
            var win = Alloy.createController("home").getView();
            win.open();
        }
    };
    var loginAfterRegister = function(e) {
        var email = e.params.email;
        var password = e.params.password;
        var params = {
            email: email,
            password: password
        };
        API.do_pluxLogin(params, function() {
            $.win.close();
            console.log("loginAfterRegister");
            common.createAlert("Success", "Plux account registration successful!");
            var win = Alloy.createController("home").getView();
            win.open();
            Ti.App.removeEventListener("loginAfterRegister", loginAfterRegister);
        });
    };
    Ti.App.addEventListener("touchLogin", touchLogin);
    Ti.App.addEventListener("loginAfterRegister", loginAfterRegister);
    $.win.addEventListener("android:back", function(e) {
        var dialog = Ti.UI.createAlertDialog({
            cancel: 1,
            buttonNames: [ "Cancel", "Confirm" ],
            message: "Would you like to exit Plux?",
            title: "Exit app"
        });
        dialog.addEventListener("click", function(e) {
            e.index === e.source.cancel;
            if (1 === e.index) {
                var activity = Titanium.Android.currentActivity;
                activity.finish();
            }
        });
        dialog.show();
    });
    $.win.addEventListener("close", function() {
        console.log("window login close");
        Ti.App.removeEventListener("touchLogin", touchLogin);
        Ti.App.removeEventListener("loginAfterRegister", loginAfterRegister);
        $.destroy();
    });
    __defers["$.__views.__alloyId189!click!closeBox"] && $.addListener($.__views.__alloyId189, "click", closeBox);
    __defers["$.__views.__alloyId190!click!doForgotPassword"] && $.addListener($.__views.__alloyId190, "click", doForgotPassword);
    __defers["$.__views.loginAccountButton!touchend!doLogin"] && $.addListener($.__views.loginAccountButton, "touchend", doLogin);
    __defers["$.__views.registerAccountButton!touchend!doSignup"] && $.addListener($.__views.registerAccountButton, "touchend", doSignup);
    __defers["$.__views.registerAccountButton!touchend!doASPSignup"] && $.addListener($.__views.registerAccountButton, "touchend", doASPSignup);
    __defers["$.__views.__alloyId195!touchend!showForgetPassword"] && $.addListener($.__views.__alloyId195, "touchend", showForgetPassword);
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;