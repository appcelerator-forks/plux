var args = arguments[0] || {};
var appointment_id = args.id || 0;
var page_container = [{title: "SELECT A SPECIALTY"},{title: "SELECT A DOCTOR"}, {title: "SELECT AN AVAILABLE TIME"}, {title: "CREATE THIS APPOINTMENT"}];
var loading = Alloy.createController("loading");

function init(){
	$.win.add(loading.getView());
	loading.start();
	$.sub_back.hide();
}

init();
function postlayout(){
	$.win.removeEventListener("postlayout", postlayout);
	if(appointment_id){
		var appointmentModel = Alloy.createCollection('appointment');
		var clinicModel = Alloy.createCollection('panelList');
		
		var data_appointment = appointmentModel.getAppointmentById(appointment_id);
		var data_clinic = clinicModel.getDataByID(data_appointment.clinic_id);
		
		Ti.App.fireEvent('selectClinic',{clinicName:data_clinic.clinicName, clinicId:data_appointment.clinic_id });
		Ti.App.fireEvent('update_specialty',{specialty_id: data_appointment.specialty_id});
		Ti.App.fireEvent("update_chooseDateTime", {date: timeFormat(data_appointment.start_date)});
		scrollToViewPage({number: 3});
	}
	loading.finish();
}

function update_subheader(e){
	var current_page = $.inner_box.currentPage;
	$.sub_title.text = page_container[current_page].title;
	if(current_page){
		$.sub_back.show();
	}else{
		$.sub_back.hide();
	}
}

function closeWindow(){
	$.win.close();
}

function scrollToViewPage(e){
	$.inner_box.scrollToView(e.number);
}

function moveNext(){
	$.inner_box.moveNext();
}

function movePrevious(){
	$.inner_box.movePrevious();
}

function selectClinic(e){ 
	console.log(e.clinicName+" clinic update");
	$._available_timeslot.set_doctor_panel_id({doctor_panel_id:e.doctor_panel_id});
	$._appointment_form.update_selectClinic({clinicName:e.clinicName, clinicId:e.clinicId, doctor_panel_id:e.doctor_panel_id});
}

function update_chooseDateTime(e){
	$._appointment_form.update_chooseDateTime({date:e.date});
}

function update_specialty(e){
	console.log(e.specialty_name+" update specialty");
	$._appointment_form.update_specialty({specialty_id:e.specialty_id, specialty_name: e.specialty_name});
	$._available_timeslot.set_specialty({specialty_id:e.specialty_id});
	$._clinic_list.set_specialty({specialty_id:e.specialty_id});
}

function loadingStart(){
	loading.start();
}

function loadingFinish(){
	loading.finish();
}

$.inner_box.addEventListener("scrollend", update_subheader);
$.sub_back.addEventListener("click", movePrevious);

Ti.App.addEventListener("update_specialty", update_specialty);
Ti.App.addEventListener("update_chooseDateTime", update_chooseDateTime);
Ti.App.addEventListener("selectClinic", selectClinic);

Ti.App.addEventListener("appointment_index:windowClose", closeWindow);
Ti.App.addEventListener("appointment_index:loadingStart", loadingStart);
Ti.App.addEventListener("appointment_index:loadingFinish", loadingFinish);
Ti.App.addEventListener("appointment_index:moveNext", moveNext);
Ti.App.addEventListener("appointment_index:movePrevious", movePrevious);
Ti.App.addEventListener("appointment_index:scrollToViewPage", scrollToViewPage);

$.win.addEventListener("postlayout", postlayout);

$.win.addEventListener("close", function(){
	Ti.App.removeEventListener("update_specialty", update_specialty);
	Ti.App.removeEventListener("update_chooseDateTime", update_chooseDateTime);
	Ti.App.removeEventListener("selectClinic", selectClinic);
	Ti.App.removeEventListener("appointment_index:windowClose", closeWindow);
	Ti.App.removeEventListener("appointment_index:loadingStart", loadingStart);
	Ti.App.removeEventListener("appointment_index:loadingFinish", loadingFinish);
	Ti.App.removeEventListener("appointment_index:moveNext", moveNext);
	Ti.App.removeEventListener("appointment_index:movePrevious", movePrevious);
	Ti.App.removeEventListener("appointment_index:scrollToViewPage", scrollToViewPage);
});
