function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function saveRecord() {
        var title = $.titleRecord.value;
        var message = $.recordsTextArea.value;
        "" == title.trim() && (title = "Untitled - " + currentDateTime());
        medicalRecordsModel.addRecord({
            title: title,
            message: message,
            created: currentDateTime(),
            updated: currentDateTime()
        });
        Ti.App.fireEvent("displayRecords");
        nav.closeWindow($.newRecWin);
    }
    function hideKeyboard() {
        MRECORDS.hideKeyboard();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "newMedical";
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
    $.__views.newRecWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        id: "newRecWin",
        title: "New Medical Record",
        backButtonTitle: "",
        navTintColor: "#CE1D1C"
    });
    $.__views.newRecWin && $.addTopLevelView($.__views.newRecWin);
    $.__views.__alloyId318 = Ti.UI.createView({
        id: "__alloyId318"
    });
    $.__views.saveRecord = Ti.UI.createButton({
        id: "saveRecord",
        title: "Save"
    });
    $.__views.__alloyId318.add($.__views.saveRecord);
    $.__views.newRecWin.rightNavButton = $.__views.__alloyId318;
    $.__views.aView = Ti.UI.createScrollView({
        id: "aView",
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
    $.__views.newRecWin.add($.__views.aView);
    $.__views.titleRecord = Ti.UI.createTextField({
        top: "5",
        bottom: "5",
        id: "titleRecord",
        height: "25",
        hintText: "Records title...",
        width: "95%"
    });
    $.__views.aView.add($.__views.titleRecord);
    $.__views.__alloyId319 = Ti.UI.createView({
        height: "1",
        width: "100%",
        backgroundColor: "#000000",
        top: "5",
        bottom: "5",
        id: "__alloyId319"
    });
    $.__views.aView.add($.__views.__alloyId319);
    var __alloyId323 = [];
    $.__views.__alloyId324 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId323.push($.__views.__alloyId324);
    $.__views.__alloyId325 = Ti.UI.createButton({
        backgroundImage: "/images/btn-down.png",
        textAlign: "right",
        right: "5",
        width: "20",
        height: "20",
        id: "__alloyId325"
    });
    __alloyId323.push($.__views.__alloyId325);
    hideKeyboard ? $.__views.__alloyId325.addEventListener("click", hideKeyboard) : __defers["$.__views.__alloyId325!click!hideKeyboard"] = true;
    $.__views.__alloyId321 = Ti.UI.iOS.createToolbar({
        items: __alloyId323,
        id: "__alloyId321"
    });
    $.__views.recordsTextArea = Ti.UI.createTextArea({
        keyboardToolbar: $.__views.__alloyId321,
        id: "recordsTextArea",
        color: "#888",
        textAlign: "left",
        value: "",
        width: "95%",
        height: "100%",
        suppressReturn: "false"
    });
    $.__views.aView.add($.__views.recordsTextArea);
    $.__views.__alloyId321 = Ti.UI.iOS.createToolbar({
        keyboardToolbar: $.__views.__alloyId321,
        id: "recordsTextArea",
        color: "#888",
        textAlign: "left",
        value: "",
        width: "95%",
        height: "100%",
        suppressReturn: "false"
    });
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var MRECORDS = require("medicalRecords");
    MRECORDS.construct($);
    var medicalRecordsModel = Alloy.createCollection("medicalRecords");
    $.saveRecord.addEventListener("click", saveRecord);
    __defers["$.__views.__alloyId325!click!hideKeyboard"] && $.__views.__alloyId325.addEventListener("click", hideKeyboard);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;