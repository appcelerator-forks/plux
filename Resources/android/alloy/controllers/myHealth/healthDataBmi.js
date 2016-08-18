function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function hideKeyboard() {
        $.field1.blur();
        $.field2.blur();
    }
    function showDatePicker() {
        var datePicker = Ti.UI.createPicker({
            type: Ti.UI.PICKER_TYPE_DATE,
            minDate: new Date(1930, 0, 1),
            maxDate: new Date(yyyy, mm, dd),
            id: "datePicker",
            visible: false
        });
        datePicker.showDatePickerDialog({
            value: new Date(yyyy, parseInt(mm), dd),
            callback: function(e) {
                e.cancel || changeDate(e);
            }
        });
        hideKeyboard();
    }
    function showTimePicker() {
        var timePicker = Ti.UI.createPicker({
            type: Ti.UI.PICKER_TYPE_TIME,
            id: "timePicker",
            visible: false
        });
        timePicker.showTimePickerDialog({
            callback: function(e) {
                e.cancel || changeTime(e);
            }
        });
        hideKeyboard();
    }
    function changeDate(e) {
        hd.changeDate({
            date: e.value
        });
    }
    function changeTime(e) {
        console.log(e.value);
        hd.changeTime({
            time: e.value
        });
    }
    function doSaveRecords() {
        var date = $.date_value.text;
        var time = $.time_value.text;
        var field1 = $.field1.value;
        var field2 = $.field2.value;
        var s_date = date.split("/");
        var newDate = s_date[2] + "-" + s_date[1] + "-" + s_date[0];
        var amount = field1 / (field2 / 100 * (field2 / 100));
        var s_time = time.split(" ");
        var newTime = s_time[0];
        if ("PM" == s_time[1]) {
            hm = newTime.split(":");
            newTime = parseInt(hm[0]) + 12 + ":" + hm[1];
        }
        lib_health.addHealthData({
            date: newDate,
            time: newTime,
            field1: field1,
            field2: field2 / 100,
            amount: amount.toFixed(2),
            type: formType
        });
        hd.loadInfo(formType);
        nav.closeWindow($.healthBmiWin);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "myHealth/healthDataBmi";
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
    $.__views.healthBmiWin = Ti.UI.createWindow({
        backgroundColor: "#ffffff",
        fullscreen: true,
        title: "Add Data",
        backButtonTitle: "",
        id: "healthBmiWin",
        navTintColor: "#CE1D1C"
    });
    $.__views.healthBmiWin && $.addTopLevelView($.__views.healthBmiWin);
<<<<<<< HEAD
    $.__views.__alloyId621 = Ti.UI.createView({
        id: "__alloyId621"
=======
    $.__views.__alloyId625 = Ti.UI.createView({
        id: "__alloyId625"
>>>>>>> origin/master
    });
    $.__views.saveButton = Ti.UI.createButton({
        touchEnabled: false,
        id: "saveButton",
        color: "#ADADAD",
        title: "Save",
        right: 0
    });
<<<<<<< HEAD
    $.__views.__alloyId621.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, "touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthBmiWin.rightNavButton = $.__views.__alloyId621;
=======
    $.__views.__alloyId625.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, "touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.healthBmiWin.rightNavButton = $.__views.__alloyId625;
>>>>>>> origin/master
    $.__views.loadingBar = Ti.UI.createView({
        layout: "vertical",
        id: "loadingBar",
        height: 120,
        width: 120,
        borderRadius: 15,
        backgroundColor: "#2E2E2E"
    });
    $.__views.healthBmiWin.add($.__views.loadingBar);
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
    $.__views.__alloyId622 = Ti.UI.createLabel({
=======
    $.__views.__alloyId626 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#ffffff",
        top: 5,
<<<<<<< HEAD
        text: "Loading",
        id: "__alloyId622"
    });
    $.__views.loadingBar.add($.__views.__alloyId622);
=======
        bottom: 10,
        text: "Loading",
        id: "__alloyId626"
    });
    $.__views.loadingBar.add($.__views.__alloyId626);
>>>>>>> origin/master
    $.__views.main = Ti.UI.createView({
        id: "main",
        layout: "vertical",
        backgroundColor: "#F6F6F6",
        height: "100%"
    });
    $.__views.healthBmiWin.add($.__views.main);
<<<<<<< HEAD
    $.__views.__alloyId623 = Ti.UI.createView({
=======
    $.__views.__alloyId627 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 50,
        width: "100%",
        backgroundColor: "#DEDEDE",
<<<<<<< HEAD
        id: "__alloyId623"
    });
    $.__views.main.add($.__views.__alloyId623);
    $.__views.__alloyId624 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId624"
    });
    $.__views.__alloyId623.add($.__views.__alloyId624);
=======
        id: "__alloyId627"
    });
    $.__views.main.add($.__views.__alloyId627);
    $.__views.__alloyId628 = Ti.UI.createView({
        left: 0,
        width: "20%",
        id: "__alloyId628"
    });
    $.__views.__alloyId627.add($.__views.__alloyId628);
>>>>>>> origin/master
    $.__views.btnBack = Ti.UI.createImageView({
        left: 10,
        id: "btnBack",
        width: 25,
        height: 25,
        image: "/images/btn-back.png"
    });
<<<<<<< HEAD
    $.__views.__alloyId624.add($.__views.btnBack);
=======
    $.__views.__alloyId628.add($.__views.btnBack);
>>>>>>> origin/master
    $.__views.pageTitle = Ti.UI.createView({
        id: "pageTitle",
        width: "60%"
    });
<<<<<<< HEAD
    $.__views.__alloyId623.add($.__views.pageTitle);
    $.__views.__alloyId625 = Ti.UI.createLabel({
=======
    $.__views.__alloyId627.add($.__views.pageTitle);
    $.__views.__alloyId629 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#606060",
        font: {
            fontSize: "16dp"
        },
        text: "Add Data",
        textAlign: "center",
<<<<<<< HEAD
        id: "__alloyId625"
    });
    $.__views.pageTitle.add($.__views.__alloyId625);
    $.__views.__alloyId626 = Ti.UI.createView({
        width: "20%",
        id: "__alloyId626"
    });
    $.__views.__alloyId623.add($.__views.__alloyId626);
=======
        id: "__alloyId629"
    });
    $.__views.pageTitle.add($.__views.__alloyId629);
    $.__views.__alloyId630 = Ti.UI.createView({
        width: "20%",
        id: "__alloyId630"
    });
    $.__views.__alloyId627.add($.__views.__alloyId630);
>>>>>>> origin/master
    $.__views.saveButton = Ti.UI.createButton({
        font: {
            fontSize: "10dp"
        },
        color: "#000",
        touchEnabled: false,
        id: "saveButton",
        title: "Save",
        right: 0
    });
<<<<<<< HEAD
    $.__views.__alloyId626.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, "touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.__alloyId627 = Ti.UI.createView({
        layout: "vertical",
        height: 30,
        top: 10,
        id: "__alloyId627"
    });
    $.__views.main.add($.__views.__alloyId627);
=======
    $.__views.__alloyId630.add($.__views.saveButton);
    doSaveRecords ? $.addListener($.__views.saveButton, "touchend", doSaveRecords) : __defers["$.__views.saveButton!touchend!doSaveRecords"] = true;
    $.__views.__alloyId631 = Ti.UI.createView({
        layout: "vertical",
        height: 30,
        top: 10,
        id: "__alloyId631"
    });
    $.__views.main.add($.__views.__alloyId631);
>>>>>>> origin/master
    $.__views.description = Ti.UI.createLabel({
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#878686",
        text: "Please fill in your information below",
        id: "description"
    });
<<<<<<< HEAD
    $.__views.__alloyId627.add($.__views.description);
=======
    $.__views.__alloyId631.add($.__views.description);
>>>>>>> origin/master
    $.__views.table = Ti.UI.createView({
        id: "table",
        height: Ti.UI.SIZE,
        top: 10,
        backgroundColor: "#ffffff",
        layout: "vertical",
        scrollable: false
    });
    $.__views.main.add($.__views.table);
<<<<<<< HEAD
    $.__views.__alloyId628 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId628"
    });
    $.__views.table.add($.__views.__alloyId628);
    $.__views.__alloyId629 = Ti.UI.createView({
        selectedBackgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        id: "__alloyId629"
    });
    $.__views.table.add($.__views.__alloyId629);
    showDatePicker ? $.addListener($.__views.__alloyId629, "click", showDatePicker) : __defers["$.__views.__alloyId629!click!showDatePicker"] = true;
    $.__views.__alloyId630 = Ti.UI.createView({
=======
    $.__views.__alloyId632 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId632"
    });
    $.__views.table.add($.__views.__alloyId632);
    $.__views.__alloyId633 = Ti.UI.createView({
        selectedBackgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        id: "__alloyId633"
    });
    $.__views.table.add($.__views.__alloyId633);
    showDatePicker ? $.addListener($.__views.__alloyId633, "click", showDatePicker) : __defers["$.__views.__alloyId633!click!showDatePicker"] = true;
    $.__views.__alloyId634 = Ti.UI.createView({
>>>>>>> origin/master
        layout: "horizontal",
        height: 45,
        width: "100%",
        textAlign: "right",
<<<<<<< HEAD
        id: "__alloyId630"
    });
    $.__views.__alloyId629.add($.__views.__alloyId630);
    $.__views.__alloyId631 = Ti.UI.createLabel({
=======
        id: "__alloyId634"
    });
    $.__views.__alloyId633.add($.__views.__alloyId634);
    $.__views.__alloyId635 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#A8A8A8",
        left: 20,
        font: {
            fontSize: "16dp"
        },
        text: "Date",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId631"
    });
    $.__views.__alloyId630.add($.__views.__alloyId631);
=======
        id: "__alloyId635"
    });
    $.__views.__alloyId634.add($.__views.__alloyId635);
>>>>>>> origin/master
    $.__views.date_value = Ti.UI.createLabel({
        width: "80%",
        height: Titanium.UI.SIZE,
        color: "#707070",
        text: "",
        top: 12,
        id: "date_value",
        textAlign: "right"
    });
<<<<<<< HEAD
    $.__views.__alloyId630.add($.__views.date_value);
    $.__views.__alloyId632 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId632"
    });
    $.__views.table.add($.__views.__alloyId632);
    $.__views.__alloyId633 = Ti.UI.createView({
        selectedBackgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        id: "__alloyId633"
    });
    $.__views.table.add($.__views.__alloyId633);
    showTimePicker ? $.addListener($.__views.__alloyId633, "click", showTimePicker) : __defers["$.__views.__alloyId633!click!showTimePicker"] = true;
    $.__views.__alloyId634 = Ti.UI.createView({
        layout: "horizontal",
        height: 45,
        width: "100%",
        id: "__alloyId634"
    });
    $.__views.__alloyId633.add($.__views.__alloyId634);
    $.__views.__alloyId635 = Ti.UI.createLabel({
=======
    $.__views.__alloyId634.add($.__views.date_value);
    $.__views.__alloyId636 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId636"
    });
    $.__views.table.add($.__views.__alloyId636);
    $.__views.__alloyId637 = Ti.UI.createView({
        selectedBackgroundColor: "#ffffff",
        height: Ti.UI.SIZE,
        id: "__alloyId637"
    });
    $.__views.table.add($.__views.__alloyId637);
    showTimePicker ? $.addListener($.__views.__alloyId637, "click", showTimePicker) : __defers["$.__views.__alloyId637!click!showTimePicker"] = true;
    $.__views.__alloyId638 = Ti.UI.createView({
        layout: "horizontal",
        height: 45,
        width: "100%",
        id: "__alloyId638"
    });
    $.__views.__alloyId637.add($.__views.__alloyId638);
    $.__views.__alloyId639 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#A8A8A8",
        left: 20,
        font: {
            fontSize: "16dp"
        },
        text: "Time",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId635"
    });
    $.__views.__alloyId634.add($.__views.__alloyId635);
=======
        id: "__alloyId639"
    });
    $.__views.__alloyId638.add($.__views.__alloyId639);
>>>>>>> origin/master
    $.__views.time_value = Ti.UI.createLabel({
        width: "80%",
        height: Titanium.UI.SIZE,
        color: "#707070",
        text: "",
        top: 12,
        id: "time_value",
        textAlign: "right"
    });
<<<<<<< HEAD
    $.__views.__alloyId634.add($.__views.time_value);
    $.__views.__alloyId636 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId636"
    });
    $.__views.table.add($.__views.__alloyId636);
=======
    $.__views.__alloyId638.add($.__views.time_value);
    $.__views.__alloyId640 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId640"
    });
    $.__views.table.add($.__views.__alloyId640);
>>>>>>> origin/master
    $.__views.tvrField1 = Ti.UI.createView({
        id: "tvrField1",
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrField1);
<<<<<<< HEAD
    $.__views.__alloyId637 = Ti.UI.createView({
        layout: "horizontal",
        height: 45,
        width: "100%",
        id: "__alloyId637"
    });
    $.__views.tvrField1.add($.__views.__alloyId637);
    $.__views.__alloyId638 = Ti.UI.createLabel({
=======
    $.__views.__alloyId641 = Ti.UI.createView({
        layout: "horizontal",
        height: 45,
        width: "100%",
        id: "__alloyId641"
    });
    $.__views.tvrField1.add($.__views.__alloyId641);
    $.__views.__alloyId642 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "50%",
        height: Titanium.UI.SIZE,
        color: "#A8A8A8",
        left: 20,
        font: {
            fontSize: "16dp"
        },
        text: "KG",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId638"
    });
    $.__views.__alloyId637.add($.__views.__alloyId638);
=======
        id: "__alloyId642"
    });
    $.__views.__alloyId641.add($.__views.__alloyId642);
>>>>>>> origin/master
    $.__views.field1 = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: "14dp"
        },
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        id: "field1",
        top: 5,
        bottom: 5,
        right: 5,
        borderColor: "#ffffff",
        textAlign: "right",
        value: "",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    });
<<<<<<< HEAD
    $.__views.__alloyId637.add($.__views.field1);
    $.__views.__alloyId639 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId639"
    });
    $.__views.table.add($.__views.__alloyId639);
=======
    $.__views.__alloyId641.add($.__views.field1);
    $.__views.__alloyId643 = Ti.UI.createView({
        width: Titanium.UI.FILL,
        height: 1,
        backgroundColor: "#F6F6F6",
        id: "__alloyId643"
    });
    $.__views.table.add($.__views.__alloyId643);
>>>>>>> origin/master
    $.__views.tvrField2 = Ti.UI.createView({
        id: "tvrField2",
        height: Ti.UI.SIZE,
        selectedBackgroundColor: "#ffffff"
    });
    $.__views.table.add($.__views.tvrField2);
<<<<<<< HEAD
    $.__views.__alloyId640 = Ti.UI.createView({
        layout: "horizontal",
        height: 45,
        width: "100%",
        id: "__alloyId640"
    });
    $.__views.tvrField2.add($.__views.__alloyId640);
    $.__views.__alloyId641 = Ti.UI.createLabel({
=======
    $.__views.__alloyId644 = Ti.UI.createView({
        layout: "horizontal",
        height: 45,
        width: "100%",
        id: "__alloyId644"
    });
    $.__views.tvrField2.add($.__views.__alloyId644);
    $.__views.__alloyId645 = Ti.UI.createLabel({
>>>>>>> origin/master
        width: "50%",
        height: Titanium.UI.SIZE,
        color: "#A8A8A8",
        left: 20,
        font: {
            fontSize: "16dp"
        },
        text: "Height(cm)",
        top: 12,
<<<<<<< HEAD
        id: "__alloyId641"
    });
    $.__views.__alloyId640.add($.__views.__alloyId641);
=======
        id: "__alloyId645"
    });
    $.__views.__alloyId644.add($.__views.__alloyId645);
>>>>>>> origin/master
    $.__views.field2 = Ti.UI.createTextField({
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        height: "45dp",
        font: {
            fontSize: "14dp"
        },
        borderWidth: "1px",
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        width: Ti.UI.FILL,
        backgroundColor: "#ffffff",
        id: "field2",
        top: 5,
        bottom: 5,
        right: 5,
        borderColor: "#ffffff",
        textAlign: "right",
        value: "",
        keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD
    });
<<<<<<< HEAD
    $.__views.__alloyId640.add($.__views.field2);
=======
    $.__views.__alloyId644.add($.__views.field2);
>>>>>>> origin/master
    $.__views.selectorView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "selectorView",
        bottom: 0
    });
    $.__views.main.add($.__views.selectorView);
    $.__views.datePicker = Ti.UI.createPicker({
        format24: false,
        calendarViewShown: false,
        id: "datePicker",
        type: Ti.UI.PICKER_TYPE_DATE,
        visible: false
    });
    $.__views.selectorView.add($.__views.datePicker);
    changeDate ? $.addListener($.__views.datePicker, "change", changeDate) : __defers["$.__views.datePicker!change!changeDate"] = true;
    $.__views.timePicker = Ti.UI.createPicker({
        format24: false,
        calendarViewShown: false,
        id: "timePicker",
        type: Ti.UI.PICKER_TYPE_TIME,
        visible: false
    });
    $.__views.selectorView.add($.__views.timePicker);
    changeTime ? $.addListener($.__views.timePicker, "change", changeTime) : __defers["$.__views.timePicker!change!changeTime"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var formType = 1;
    var lib_health = Alloy.createCollection("health");
    var hd = require("healthData");
    hd.construct($);
    hd.todayDate();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();
    $.field2.addEventListener("change", function(e) {
        var field2 = $.field2.value;
        "" != e.value && "" != field2 ? hd.enableSaveButton() : hd.disableSaveButton();
    });
    $.field1.addEventListener("change", function(e) {
        var field1 = $.field1.value;
        "" != e.value && "" != field1 ? hd.enableSaveButton() : hd.disableSaveButton();
    });
    $.btnBack.addEventListener("click", function() {
        nav.closeWindow($.healthBmiWin);
    });
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.addListener($.__views.saveButton, "touchend", doSaveRecords);
    __defers["$.__views.saveButton!touchend!doSaveRecords"] && $.addListener($.__views.saveButton, "touchend", doSaveRecords);
<<<<<<< HEAD
    __defers["$.__views.__alloyId629!click!showDatePicker"] && $.addListener($.__views.__alloyId629, "click", showDatePicker);
    __defers["$.__views.__alloyId633!click!showTimePicker"] && $.addListener($.__views.__alloyId633, "click", showTimePicker);
=======
    __defers["$.__views.__alloyId633!click!showDatePicker"] && $.addListener($.__views.__alloyId633, "click", showDatePicker);
    __defers["$.__views.__alloyId637!click!showTimePicker"] && $.addListener($.__views.__alloyId637, "click", showTimePicker);
>>>>>>> origin/master
    __defers["$.__views.datePicker!change!changeDate"] && $.addListener($.__views.datePicker, "change", changeDate);
    __defers["$.__views.timePicker!change!changeTime"] && $.addListener($.__views.timePicker, "change", changeTime);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;