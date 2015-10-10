function receivePush(e) {
    console.log(e);
    return false;
}

function deviceTokenSuccess(ex) {
    deviceToken = ex.deviceToken;
    Cloud.Users.login({
        login: "geomilano",
        password: "geonn2015"
    }, function(e) {
        e.success && Cloud.PushNotifications.subscribe({
            channel: "survey",
            type: "android",
            device_token: deviceToken
        }, function(e) {
            if (e.success) {
                Ti.App.Properties.setString("deviceToken", deviceToken);
                API.updateNotificationToken();
            } else registerPush();
        });
    });
}

function deviceTokenError(e) {
    alert("Failed to register for push notifications! " + e.error);
}

function registerPush() {
    CloudPush.retrieveDeviceToken({
        success: deviceTokenSuccess,
        error: deviceTokenError
    });
}

function getNotificationNumber(payload) {
    console.log(payload);
}

var Cloud = require("ti.cloud");

var app_status;

var redirect = false;

var CloudPush = require("ti.cloudpush");

CloudPush.addEventListener("callback", function(evt) {
    var payload = JSON.parse(evt.payload);
    Ti.App.Payload = payload;
    receivePush(payload);
});

CloudPush.addEventListener("trayClickLaunchedApp", function() {
    redirect = true;
    app_status = "not_running";
});

CloudPush.addEventListener("trayClickFocusedApp", function() {
    redirect = true;
    app_status = "running";
});

exports.registerPush = function() {
    registerPush();
};