function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getDates(startDate, stopDate) {
        var dateArray = new Array();
        var currentDate = startDate;
        while (stopDate >= currentDate) {
            dateArray.push(currentDate);
            currentDate = currentDate.addDays(1);
        }
        lastday = currentDate;
        return dateArray;
    }
    function convertMinuteToHour(minutes) {
        var date = new Date(1970, 0, 1);
        date.setMinutes(minutes);
        return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
    }
    function render_date_bar() {
        var dateArray = getDates(lastday, lastday.addDays(10));
        for (i = 0; i < dateArray.length; i++) {
            var active_view = selected_date == dateArray[i] ? "active_view" : "";
            var active_label = selected_date == dateArray[i] ? "active_label" : "";
            var day = days[dateArray[i].getDay()];
            var month = months[dateArray[i].getMonth()];
            var date = dateArray[i].getDate();
            var view_date_box = $.UI.create("View", {
                width: 80,
                height: 80,
                day: dateArray[i].getDay(),
                view_element: "view_date_box",
                date_s: dateArray[i],
                classes: [ "gap", active_view ]
            });
            var label_day_month = $.UI.create("Label", {
                classes: [ "wsize", "hsize", "h6", active_label ],
                text: day + ", " + month,
                top: 10
            });
            var label_date = $.UI.create("Label", {
                text: date,
                classes: [ "wsize", "hsize", "h5", "bold", active_label ]
            });
            view_date_box.add(label_day_month);
            view_date_box.add(label_date);
            $.date_bar.add(view_date_box);
            view_date_box.addEventListener("click", changeDate);
        }
    }
    function render_available_timeslot() {
        for (var i = 0; i < working_hour.length; i++) {
            if (working_hour[i].days == selected_date.getDay()) {
                var whb = working_hour[i].time_start.split(":");
                var whe = working_hour[i].time_end.split(":");
                Ti.App.Properties.setString("working_hour_begin", 60 * parseInt(whb[0]) + parseInt(whb[1]));
                Ti.App.Properties.setString("working_hour_end", 60 * parseInt(whe[0]) + parseInt(whe[1]));
                Ti.App.Properties.setString("timeblock", working_hour[i].duration);
                break;
            }
            Ti.App.Properties.setString("working_hour_begin", 0);
            Ti.App.Properties.setString("working_hour_end", 0);
            Ti.App.Properties.setString("timeblock", 0);
        }
        var pw = Ti.Platform.displayCaps.platformWidth;
        var ldf = Ti.Platform.displayCaps.logicalDensityFactor;
        var pwidth = parseInt(pw / (ldf || 1), 10);
        var cell_width = Math.floor((pwidth - 22) / 3);
        $.inner_box.width = pwidth - 18;
        $.timeslot.removeAllChildren();
        var workingHourArray = new Array();
        var working_hour_begin = parseInt(Ti.App.Properties.getString("working_hour_begin"));
        var working_hour_end = parseInt(Ti.App.Properties.getString("working_hour_end"));
        var timeblock = parseInt(Ti.App.Properties.getString("timeblock") || 0);
        var appointmentModel = Alloy.createCollection("appointment");
        var booked_time = new Array();
        if (working_hour_end) while (working_hour_end >= working_hour_begin + timeblock) {
            var time_key = Math.floor(working_hour_begin / timeblock);
            workingHourArray[time_key] = working_hour_begin;
            working_hour_begin += timeblock;
        }
        var start_date = selected_date.getFullYear() + "-" + ("0" + (parseInt(selected_date.getMonth()) + 1)).slice(-2) + "-" + ("0" + selected_date.getDate()).slice(-2) + " 00:00:00";
        var end_date = selected_date.getFullYear() + "-" + ("0" + (parseInt(selected_date.getMonth()) + 1)).slice(-2) + "-" + ("0" + selected_date.getDate()).slice(-2) + " 23:59:59";
        var appointmentList = appointmentModel.getAppointmentList({
            doctor_panel_id: doctor_panel_id,
            start_date: start_date,
            end_date: end_date
        });
        for (var i = 0; i < appointmentList.length; i++) {
            var datetime = appointmentList[i].start_date;
            var timeStamp = datetime.split(" ");
            var time = timeStamp[1].split(":");
            var booking_min = 60 * parseInt(time[0]) + parseInt(time[1]);
            var time_start_key = Math.floor(booking_min / timeblock);
            var time_end_key = Math.floor((booking_min + parseInt(appointmentList[i].duration)) / timeblock);
            for (;time_end_key > time_start_key; time_start_key++) booked_time.push(time_start_key.toString());
        }
        workingHourArray = _.omit(workingHourArray, booked_time);
        for (key in workingHourArray) {
            var view_time_box = $.UI.create("View", {
                width: cell_width,
                date_s: selected_date.getFullYear() + "-" + ("0" + (parseInt(selected_date.getMonth()) + 1)).slice(-2) + "-" + ("0" + selected_date.getDate()).slice(-2) + " " + convertMinuteToHour(workingHourArray[key]),
                classes: [ "hsize", "time_gap" ]
            });
            var label_time = $.UI.create("Label", {
                textAlign: "center",
                text: convertMinuteToHour(workingHourArray[key]),
                classes: [ "wfill", "hsize", "h5", "padding" ]
            });
            view_time_box.add(label_time);
            $.timeslot.add(view_time_box);
            view_time_box.addEventListener("click", navToForms);
        }
    }
    function navToForms(e) {
        var date = parent({
            name: "date_s"
        }, e.source);
        Ti.App.fireEvent("update_chooseDateTime", {
            date: timeFormat(date)
        });
        Ti.App.fireEvent("appointment_index:moveNext");
    }
    function changeDate(e) {
        Ti.App.fireEvent("appointment_index:loadingStart");
        var sdate = parent({
            name: "date_s"
        }, e.source);
        day_selected = parent({
            name: "day"
        }, e.source);
        var childrens = $.date_bar.getChildren();
        for (var i = 0; i < childrens.length; i++) {
            childrens[i].backgroundColor = "#FFFFFF";
            var child_child = childrens[i].getChildren();
            for (var j = 0; j < child_child.length; j++) child_child[j].color = "#000000";
        }
        var select_view = parent({
            name: "view_element",
            value: "view_date_box"
        }, e.source);
        select_view.backgroundColor = "#CE1D1C";
        var active_children = select_view.getChildren();
        for (var k = 0; k < active_children.length; k++) active_children[k].color = "#FFFFFF";
        selected_date = sdate;
        render_available_timeslot();
        Ti.App.fireEvent("appointment_index:loadingFinish");
    }
    function refresh() {
        console.log("doctor_panel_id: " + doctor_panel_id);
        API.callByPost({
            url: "getWorkingHoursByDoctorPanel",
            params: {
                doctor_panel_id: doctor_panel_id
            }
        }, function(responseText) {
            Alloy.createCollection("doctor_panel");
            var res = JSON.parse(responseText);
            working_hour = res.data || null;
            API.callByPost({
                url: "getAppointmentByDoctorPanel",
                params: {
                    doctor_panel_id: doctor_panel_id
                }
            }, function(responseText) {
                var model = Alloy.createCollection("appointment");
                var res = JSON.parse(responseText);
                var arr = res.data || null;
                model.saveArray(arr);
                render_available_timeslot();
            });
        });
    }
    function init() {
        render_date_bar();
        refresh();
    }
    require("/alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "appointment/_available_timeslot";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views._available_timeslot = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "#f0f5f8",
        id: "_available_timeslot"
    });
    $.__views._available_timeslot && $.addTopLevelView($.__views._available_timeslot);
    $.__views.date_bar = Ti.UI.createScrollView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: 80,
        showVerticalScrollIndicator: false,
        scrollType: "horizontal",
        contentWidth: "auto",
        contentHeight: Ti.UI.FILL,
        backgroundColor: "#d7d7d7",
        id: "date_bar"
    });
    $.__views._available_timeslot.add($.__views.date_bar);
    $.__views.inner_box = Ti.UI.createView({
        top: 10,
        left: 9,
        right: 9,
        bottom: 10,
        layout: "vertical",
        width: 301,
        height: Ti.UI.FILL,
        id: "inner_box"
    });
    $.__views._available_timeslot.add($.__views.inner_box);
    $.__views.__alloyId399 = Ti.UI.createScrollView({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        contentWidth: Ti.UI.FILL,
        disableBounce: true,
        contentHeight: Ti.UI.SIZE,
        backgroundColor: "#d7d7d7",
        id: "__alloyId399"
    });
    $.__views.inner_box.add($.__views.__alloyId399);
    $.__views.timeslot = Ti.UI.createView({
        layout: "horizontal",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        left: 1,
        top: 1,
        id: "timeslot"
    });
    $.__views.__alloyId399.add($.__views.timeslot);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.createCollection("panelList");
    var selected_date = new Date();
    var lastday = selected_date;
    var doctor_panel_id = 0;
    var specialty = 0;
    var days = [ "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT" ];
    var months = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];
    Ti.App.Properties.getString("u_id") || 0;
    var day_selected = 0;
    var working_hour = [];
    Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    };
    $.set_doctor_panel_id = function(e) {
        doctor_panel_id = e.doctor_panel_id;
        refresh();
    };
    $.set_specialty = function(e) {
        specialty = e.specialty;
    };
    init();
    _.extend($, exports);
}

var Alloy = require("/alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;