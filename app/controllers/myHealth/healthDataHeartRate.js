var args = arguments[0] || {};
var formType = 3;
var lib_health = Alloy.createCollection('health'); 
var hd = require('healthData');

hd.construct($);
hd.todayDate();
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth(); 
var yyyy = today.getFullYear();

function hideKeyboard(){
	$.field1.blur(); 
}

function showDatePicker(e){ 
	if(OS_ANDROID){ 
		var datePicker = Ti.UI.createPicker({
			  type: Ti.UI.PICKER_TYPE_DATE,
			  minDate: new Date(1930,0,1),
			  maxDate: new Date(yyyy,mm,dd),
			  id: "datePicker",
			  visible: false
		});
		datePicker.showDatePickerDialog({
			value: new Date(yyyy,parseInt(mm) , dd),
			callback: function(e) {
			if (e.cancel) { 
				} else {
					changeDate(e);
				}
			}
		});
	}else{  
		hd.showDatePicker({date: $.datePicker, time: $.timePicker}); 
	} 
	hideKeyboard();
}

function showTimePicker(e){
	if(OS_ANDROID){ 
		var timePicker = Ti.UI.createPicker({
			  type: Ti.UI.PICKER_TYPE_TIME, 
			  id: "timePicker",
			  visible: false
		});
		timePicker.showTimePickerDialog({
			//value: new Date(yyyy,parseInt(mm) - 1, dd),
			callback: function(e) {
			if (e.cancel) { 
				} else {
					changeTime(e);
				}
			}
		});
	}else{ 
		hd.showTimePicker({date: $.datePicker, time: $.timePicker}); 
	}
	hideKeyboard();
}

function changeDate(e){ 
	hd.changeDate({date: e.value});
}

function changeTime(e){
	hd.changeTime({time: e.value}); 
}
 

$.field1.addEventListener('change',function(e){ 
	var field1 = $.field1.value;
	if(e.value != "" && field1 != ""){
		hd.enableSaveButton();
	}else{
		hd.disableSaveButton();
	}
});

$.tvrField1.addEventListener('click',function(){
	$.field1.focus();
});
 

function doSaveRecords(){
	var date    = $.date_value.text; 
	var time    = $.time_value.text; 
	var field1  = $.field1.value; 
	var s_date  = date.split('/');
	var newDate = s_date[2] + "-"+s_date[1]+"-"+s_date[0];
	
	/**Heart Rate formula**/
	var s_time = time.split(' ');
	var newTime = s_time[0] ;
	if(s_time[1] == "PM"){
		hm = newTime.split(':');  
		newTime = (parseInt(hm[0]) + 12) + ":"+hm[1];
	}
	
	lib_health.addHealthData({
		date : newDate,
		time : newTime,
		field1 : field1, 
		amount : field1,
		type : formType
	}, function(){
		hd.loadInfo(formType);
	});  
	// nav.navigationWindow("myHealth" );
	
	nav.closeWindow($.healthDHWin);
}

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){
		nav.closeWindow($.healthDHWin); 
	}); 
}
