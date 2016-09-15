function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function doAspSignup() {
        common.showLoading();
        var email = $.email.value;
        var password = $.password.value;
        var repassword = $.repassword.value;
        var name = $.email.value;
        var memno = $.memno.value;
        var empno = $.empno.value;
        var mobileno = $.mobileno.value;
        if (password != repassword) {
            common.createAlert("Error", "Password does not match the confirm password.");
            common.hideLoading();
            return false;
        }
        var view_agreement = view_agreement_box.children[0].children[0].checked;
        if ("1" != view_agreement) {
            common.createAlert("Error", "You must agree to the Privacy Policy to register as ASP Plux member.");
            common.hideLoading();
            return false;
        }
        var params = {
            email: email,
            password: password,
            name: name,
            memno: memno,
            empno: empno,
            mobileno: mobileno,
            agreets: view_agreement
        };
        API.do_asp_signup(params, $);
    }
    function hideProductFormKeyboard(e) {
        var exception = [ "email", "password", "name", "memno", "empno", "mobileno" ];
        if (exception.indexOf(e.source.id) >= 0) {
            console.log(e.source.id);
            return false;
        }
        $.email.blur();
        $.password.blur();
        $.name.blur();
        $.memno.blur();
        $.empno.blur();
        $.mobileno.blur();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "asp/signup2";
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
    $.__views.aspSignUpWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        width: Ti.UI.FILL,
        height: Titanium.UI.FILL,
        navTintColor: "#CE1D1C",
        title: "Profile Setup",
        id: "aspSignUpWin",
        layout: "vertical"
    });
    $.__views.aspSignUpWin && $.addTopLevelView($.__views.aspSignUpWin);
<<<<<<< HEAD
    $.__views.__alloyId557 = Ti.UI.createView({
        top: 0,
        height: 50,
        backgroundColor: "#DEDEDE",
        id: "__alloyId557"
    });
    $.__views.aspSignUpWin.add($.__views.__alloyId557);
=======
    $.__views.__alloyId555 = Ti.UI.createView({
        top: 0,
        height: 50,
        backgroundColor: "#DEDEDE",
        id: "__alloyId555"
    });
    $.__views.aspSignUpWin.add($.__views.__alloyId555);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createView({
        left: 0,
        zIndex: 9,
        id: "btnBack",
        width: "20%"
    });
<<<<<<< HEAD
    $.__views.__alloyId557.add($.__views.btnBack);
    $.__views.__alloyId558 = Ti.UI.createImageView({
=======
    $.__views.__alloyId555.add($.__views.btnBack);
    $.__views.__alloyId556 = Ti.UI.createImageView({
>>>>>>> origin/master
        left: 10,
        width: 25,
        height: 25,
        image: "/images/btn-back.png",
<<<<<<< HEAD
        id: "__alloyId558"
    });
    $.__views.btnBack.add($.__views.__alloyId558);
    $.__views.__alloyId559 = Ti.UI.createView({
        id: "__alloyId559"
    });
    $.__views.__alloyId557.add($.__views.__alloyId559);
=======
        id: "__alloyId556"
    });
    $.__views.btnBack.add($.__views.__alloyId556);
    $.__views.__alloyId557 = Ti.UI.createView({
        id: "__alloyId557"
    });
    $.__views.__alloyId555.add($.__views.__alloyId557);
>>>>>>> origin/master
    $.__views.titleLbl = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#CE1D1C",
        text: "Profile Setup",
        id: "titleLbl",
        textAlign: "center"
    });
<<<<<<< HEAD
    $.__views.__alloyId559.add($.__views.titleLbl);
    $.__views.__alloyId560 = Ti.UI.createView({
        id: "__alloyId560"
    });
    $.__views.aspSignUpWin.add($.__views.__alloyId560);
=======
    $.__views.__alloyId557.add($.__views.titleLbl);
    $.__views.__alloyId558 = Ti.UI.createView({
        id: "__alloyId558"
    });
    $.__views.aspSignUpWin.add($.__views.__alloyId558);
>>>>>>> origin/master
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 0,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#2E2E2E"
    });
<<<<<<< HEAD
    $.__views.__alloyId560.add($.__views.loadingBar);
=======
    $.__views.__alloyId558.add($.__views.loadingBar);
>>>>>>> origin/master
    $.__views.activityIndicator = Ti.UI.createActivityIndicator({
        top: 10,
        left: 30,
        width: 60,
        id: "activityIndicator"
    });
    $.__views.loadingBar.add($.__views.activityIndicator);
<<<<<<< HEAD
    $.__views.__alloyId561 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId561"
    });
    $.__views.__alloyId560.add($.__views.__alloyId561);
=======
    $.__views.__alloyId559 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId559"
    });
    $.__views.__alloyId558.add($.__views.__alloyId559);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createScrollView({
        id: "main",
        layout: "vertical",
        height: "100%",
        contentHeight: Ti.UI.SIZE
    });
<<<<<<< HEAD
    $.__views.__alloyId561.add($.__views.main);
    $.__views.__alloyId562 = Ti.UI.createImageView({
=======
    $.__views.__alloyId559.add($.__views.main);
    $.__views.__alloyId560 = Ti.UI.createImageView({
>>>>>>> origin/master
        width: 120,
        borderRadius: 10,
        height: 120,
        backgroundColor: "#ff0000",
        bottom: "20dp",
        top: "20dp",
        image: "/images/asp_logo.png",
<<<<<<< HEAD
        id: "__alloyId562"
    });
    $.__views.main.add($.__views.__alloyId562);
=======
        id: "__alloyId560"
    });
    $.__views.main.add($.__views.__alloyId560);
>>>>>>> origin/master
    $.__views.name = Ti.UI.createTextField({
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
        editable: false,
        id: "name",
        hintText: "Enter Name",
        value: ""
    });
    $.__views.main.add($.__views.name);
    $.__views.memno = Ti.UI.createTextField({
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
        editable: false,
        id: "memno",
        hintText: "Enter Member Number",
        value: ""
    });
    $.__views.main.add($.__views.memno);
    $.__views.empno = Ti.UI.createTextField({
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
        editable: false,
        id: "empno",
        hintText: "Enter Employee Number",
        value: ""
    });
    $.__views.main.add($.__views.empno);
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
    $.__views.repassword = Ti.UI.createTextField({
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
        bottom: "5dp",
        paddingLeft: "20dp",
        paddingRight: "20dp",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT,
        returnKeyType: Titanium.UI.RETURNKEY_DONE,
        id: "repassword",
        hintText: "Confirm Password",
        value: ""
    });
    $.__views.main.add($.__views.repassword);
    $.__views.mobileno = Ti.UI.createTextField({
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
        id: "mobileno",
        hintText: "Enter Mobile Number",
        value: ""
    });
    $.__views.main.add($.__views.mobileno);
    $.__views.tc_area = Ti.UI.createView({
        id: "tc_area",
        layout: "vertical",
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL
    });
    $.__views.main.add($.__views.tc_area);
    $.__views.asp_sign_btn = Ti.UI.createButton({
        id: "asp_sign_btn",
        borderRadius: 5,
        backgroundColor: "#CC2228",
        title: "Sign Up",
        width: "70%",
        top: 20,
        height: 40,
        bottom: 20,
        color: "#ffffff"
    });
    $.__views.main.add($.__views.asp_sign_btn);
    doAspSignup ? $.addListener($.__views.asp_sign_btn, "click", doAspSignup) : __defers["$.__views.asp_sign_btn!click!doAspSignup"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Alloy.Globals.navMenu;
    common.construct($);
    var view_agreement_box = common.CheckboxwithText("I have read and agree to the ", "Privacy Policy", {
        name: "agreets"
    }, "privacy");
    var memno = Ti.App.Properties.getString("memno");
    var empno = Ti.App.Properties.getString("empno");
    var name = Ti.App.Properties.getString("name");
    $.name.value = name;
    $.memno.value = memno;
    $.empno.value = empno;
    $.tc_area.add(view_agreement_box);
    $.aspSignUpWin.addEventListener("click", hideProductFormKeyboard);
    $.btnBack.addEventListener("click", function() {
        $.aspSignUpWin.close();
    });
    __defers["$.__views.asp_sign_btn!click!doAspSignup"] && $.addListener($.__views.asp_sign_btn, "click", doAspSignup);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;