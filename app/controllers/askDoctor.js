var args = arguments[0] || {};
var MessageModel = Alloy.createCollection('message');  
var MessageList;
var indicator_color = ["#ffffff", '#fccd03', '#CE1D1C', '#afdb00', '#3f99f9', 'black'];
var status_text = ["", "Pending", "Rejected", "Accepted", "Suggestion", "Deleted"];
var current_date = "";
var loading = Alloy.createController("loading");

init();

function init(){
	$.win.add(loading.getView());
	loading.start();
	//API.syncAppointmentData(savedAppointment);
	//render_conversation_list();
}

function savedAppointment(ex){ 
	var result = ex.param; 
	if(result.status == "error"){
		common.createAlert("Error", result.data);
		return false;
	}else{
		MessageModel.saveArray(result.data);
	}
	render_conversation_list(); 
}


function render_conversation_list(){ 
	$.conversation_list.removeAllChildren();
	MessageList = MessageModel.getDataGroupDrid(); 
	console.log(MessageList);
	var data=[];
	var counter = 0;  
	if(MessageList.length < 1){
		var view_norecord = $.UI.create("View", {
			classes: ['wsize', 'hsize', 'box', 'rounded']
		});
		var label_no_record = $.UI.create("Label", {
			classes: ['wsize', 'hsize','padding'],
			text: "No  at this moment."
		});
		view_norecord.add(label_no_record);
		//$.conversation_list.add(view_norecord);
	}else{
		for (var i=0; i < MessageList.length; i++) {
		    $.conversation_list.add(add_appointment_row(MessageList[i]));
		};
	}
	var view_find_doctor = $.UI.create("View", {
		classes: ['wfill', 'vert', 'hsize'],
	});
	var view_line = $.UI.create("View", {
		classes: ['line'],
		top: 10
	});
	var button_find_doctor = $.UI.create("Button", {
		classes: ['button'],
		title: "Find Doctor"
	});
	var label_status = $.UI.create("Label", {
		classes: ['wfill', 'hsize','padding'],
		textAlign: "center",
		font:{
			fontSize: 12
		},
		text: "Click here to find out what specialist that you want to chat."
	});
	view_find_doctor.addEventListener("click", navFindDoctor);
	view_find_doctor.add(view_line);
	view_find_doctor.add(button_find_doctor);
	view_find_doctor.add(label_status);
	
	$.conversation_list.add(view_find_doctor);
	loading.finish();
}

function navToConversation(e){
	var dr_id = parent({name: "dr_id"}, e.source);
	var room_id = parent({name: "room_id"}, e.source); 
	nav.navigateWithArgs("conversation", {dr_id : dr_id, room_id: room_id});
}

function navFindDoctor(){ 
	nav.navigateWithArgs("askDoctor/forms");
}

/*
 Private Function
 * */

function add_appointment_row(entry){
	//var datetime = entry.start_date.split(" ");
	//var time = datetime[1];
	
	var view_row = $.UI.create("View", {
		classes: ['wfill', 'hsize', 'box', 'horz', 'rounded'],
		room_id: entry.room_id,
		dr_id: entry.dr_id,
		view_row: 1,
		top: 3
	});
	/*
	var view_date_status_box = $.UI.create("View", {
		classes: ['hfill', 'vert'],
		width: 90,
		backgroundColor: indicator_color[entry.status]
	});
	
	var label_time = $.UI.create("Label", {
		classes: ['wfill', 'hsize','padding'],
		textAlign: "center",
		color: "#ffffff",
		bottom: 0,
		minimumFontSize: 12,
		text: convert_ampm(time)
	});
	
	var label_status = $.UI.create("Label", {
		classes: ['wfill', 'hsize','padding'],
		textAlign: "center",
		top: 0,
		color: "#ffffff",
		font:{
			fontSize: 12
		},
		text: status_text[entry.status]
	});
	
	view_date_status_box.add(label_time);
	view_date_status_box.add(label_status);
	*/
	//middle part
	var view_clinic_specialty_box = $.UI.create("View", {
		classes: ['hsize', 'vert'],
		width: "auto",
	});
	
	var label_clinic = $.UI.create("Label", {
		classes: ['wfill', 'hsize','padding','h4', 'bold'],
		bottom: 0,
		text: entry.doctor_name
	});
	
	var label_specialty = $.UI.create("Label", {
		classes: ['wfill', 'hsize','padding','h4'],
		top: 0,
		text: entry.doctor_specialty
	});
	
	view_clinic_specialty_box.add(label_clinic);
	view_clinic_specialty_box.add(label_specialty);
	
	//view_row.add(view_date_status_box);
	view_row.add(view_clinic_specialty_box);
	
	view_row.addEventListener("click", navToConversation);
	//view_row.addEventListener("click", create_dialog_box);
	return view_row;
}

function create_dialog_box(ex){
	var id = parent({name: "appointment_id"}, ex.source);
	var status = parent({name: "status"}, ex.source);
	var buttonName = [], message = "";
	//var view_row = parent({name: "view_row", value: 1}, ex.source);
	switch(status){
		case 1:
		case 2:	
			buttonName = ['Cancel Appointment', "Cancel"];
			message = "Are you sure want to cancel this appointment?";
			break;
		case 4:
			buttonName = ['Accept', "Cancel"];
			message = "Please confirm if this appointment time is convenient for you.";
			break;
		case 3:
			return;	
		
	}
	var dialog = Ti.UI.createAlertDialog({
	    cancel: 1,
	    buttonNames: buttonName,
	    message: message,
	    title: 'Actions'
	  });
	  dialog.addEventListener('click', function(e){
	    if (e.index === 0){
	      if(status == 4){
	      	loading.start();
	      	API.callByPost({url: "suggestedAppointmentUrl", params:{id: id}}, function(responseText){ 
	      		var model = Alloy.createCollection("appointment");
				var res = JSON.parse(responseText);
				var arr = res.data || null;
				model.saveArray(arr);
				render_conversation_list();
				loading.finish();
	      	});
	      }else if(status == 1 || status == 2){
	      	loading.start();
	      	API.callByPost({url: "addAppointmentUrl", params:{id: id, isDoctor:1, status: 5}}, function(responseText){ 
	      		var model = Alloy.createCollection("appointment");
				var res = JSON.parse(responseText);
				var arr = res.data || null;
				model.updateAppointmentStatus(id, 5);
				render_conversation_list();
				loading.finish();
	      	});
	      }
	    }
	  });
	  dialog.show();
}

function check_update_currentdate(date){
	if(current_date != date){
		current_date = date;
		//add date into list
		var view_date = $.UI.create("View", {
			classes: ['wsize', 'hsize' ],
			top: 10
		});
		
		var d = new Date(); 
		var inputDate = new Date(current_date);  
		var bool = (d.toDateString() == inputDate.toDateString()); 
		var dateText = monthFormat(current_date); 
		if(bool === true){
			dateText = "Today";
		}
		var label_date = $.UI.create("Label", {
			classes: ['wsize', 'hsize', 'padding',"themeColor"],
			text: dateText
		});
		
		view_date.add(label_date);
		$.conversation_list.add(view_date);
	}
}

function convert_ampm(timeStamp){
	var time = timeStamp.split(":");
	var ampm = "am";
	if(time[0] > 12){
		ampm = "pm";
		time[0] = time[0] - 12;
	}
	
	return time[0]+":"+time[1]+ " "+ ampm;
}


if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){ 
		nav.closeWindow($.win); 
	}); 
}

Ti.App.addEventListener('displayRecords', render_conversation_list);
/** close all editProfile eventListener when close the page**/
$.win.addEventListener("close", function(){
	$.destroy(); 
    Ti.App.removeEventListener('displayRecords', render_conversation_list);
});
