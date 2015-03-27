function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    (0 > m || 0 === m && today.getDate() < birthDate.getDate()) && age--;
    return age;
}

var mainView = null;

var lib_health = Alloy.createCollection("health");

var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

exports.construct = function(mv) {
    mainView = mv;
};

exports.showDatePicker = function(e) {
    e.date.visible = "true";
    e.time.visible = "false";
};

exports.showTimePicker = function(e) {
    e.date.visible = "false";
    e.time.visible = "true";
};

exports.showBirthDatePicker = function(e) {
    e.date.visible = "true";
    e.gender.visible = "false";
    e.bloodType.visible = "false";
};

exports.showGenderPicker = function(e) {
    e.gender.visible = "true";
    e.bloodType.visible = "false";
    e.date.visible = "false";
};

exports.showBloodTypePicker = function(e) {
    e.bloodType.visible = "true";
    e.gender.visible = "false";
    e.date.visible = "false";
};

exports.disableSaveButton = function() {
    mainView.saveButton.color = "#ADADAD";
    mainView.saveButton.touchEnabled = "false";
};

exports.enableSaveButton = function() {
    mainView.saveButton.color = "#CE1D1C";
    mainView.saveButton.touchEnabled = "true";
};

exports.populateData = function() {
    for (var i = 1; 4 >= i; i++) {
        var info_details = lib_health.getHealthListByType(i);
        var info = [];
        info_details.forEach(function(entry) {
            var rec = {};
            var convert = entry.date.split("-");
            var month = parseInt(convert[1]) - 1;
            var newDate = convert[2] + " " + m_names[month] + convert[0].substring(2, 4);
            rec["label"] = newDate;
            rec["y"] = parseFloat(entry.amount);
            info.push(rec);
        });
        1 == i && Ti.App.fireEvent("app:bmiInfo", {
            message: info
        });
        2 == i && Ti.App.fireEvent("app:bloodPressureInfo", {
            message: info
        });
        3 == i && Ti.App.fireEvent("app:heartRateInfo", {
            message: info
        });
        4 == i && Ti.App.fireEvent("app:bodyTemperatureInfo", {
            message: info
        });
    }
};

exports.todayDate = function() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var min = today.getMinutes();
    10 > dd && (dd = "0" + dd);
    10 > mm && (mm = "0" + mm);
    10 > hh && (hh = "0" + hh);
    10 > min && (min = "0" + min);
    today = dd + "/" + mm + "/" + yyyy;
    var ampm = hh >= 12 ? "PM" : "AM";
    hh > 12 && (hh -= 12);
    mainView.date_value.text = today;
    mainView.time_value.text = hh + ":" + min + " " + ampm;
};

exports.getAge = function(bday) {
    return getAge(bday);
};

exports.changeDate = function(e) {
    var pickerdate = e.date;
    var day = pickerdate.getDate();
    day = day.toString();
    day.length < 2 && (day = "0" + day);
    var month = pickerdate.getMonth();
    month += 1;
    month = month.toString();
    month.length < 2 && (month = "0" + month);
    var year = pickerdate.getFullYear();
    selDate = day + "/" + month + "/" + year;
    var age = getAge(year + "-" + month + "-" + day);
    mainView.date_value.text = selDate + "(" + age + ")";
};

exports.changeGender = function(e) {
    mainView.gender_value.text = e.gender;
};

exports.changeBloodType = function(e) {
    mainView.bloodType_value.text = e.bloodType;
};

exports.changeTime = function(e) {
    var pickerdate = e.time;
    pickerdate.getDate();
    var hour = pickerdate.getHours();
    hour = hour.toString();
    var ampm = hour >= 12 ? "PM" : "AM";
    hour > 12 && (hour -= 12);
    var minute = pickerdate.getMinutes();
    10 > minute && (minute = "0" + minute);
    selTime = hour + ":" + minute + " " + ampm;
    mainView.time_value.text = selTime;
};