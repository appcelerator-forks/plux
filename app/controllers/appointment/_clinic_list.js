var specialty_id = 0;   
var doctor_panel_model = Alloy.createCollection('doctor_panel');
var listing = [];   
$.clinic.hide();
$.set_specialty = function(e){
	specialty_id = e.specialty_id;
	refresh();
};

function render_clinic_list(){
	
	var docTable = Ti.UI.createTableView();
	var data=[]; 
	var counter = 0; 
	
  	if(listing.length < 1){ 
		docTable.setData(common.noRecord());
	}else{
		var doctor_name = "";
		var new_list = new Array();
		listing.forEach(function(entry) {
			if(doctor_name != entry.doctor_name){
				doctor_name = entry.doctor_name;
				new_list[doctor_name] = {doctor_name: doctor_name, doctor_id: entry.doctor_id, specialty:entry.specialty, doctor_img_path: entry.doctor_img_path, clinic: []};
			}else{
				doctor_name = entry.doctor_name;
			}
		});
		
		listing.forEach(function(entry) {
			var panel = Alloy.createCollection("panelList");
			 
			var clinic_dat = panel.getDataByID(entry.clinic_id); 
			new_list[entry.doctor_name].clinic.push({doctor_panel_id: entry.id, clinic_name: clinic_dat.clinicName, title: clinic_dat.clinicName});
		});
		
		for(i in new_list){
	   		var row = $.UI.create("TableViewRow", {
	   			classes: ['hsize', 'horz'],
			    touchEnabled: true,
			    clinic: new_list[i].clinic,
			    backgroundSelectedColor: "#ECFFF9",
			    horizontalWrap: false
			}); 
			var tblRowView = $.UI.create("View", {
				classes:['hsize','vert'],
				width: "auto",
			}); 
			
			var img_path = $.UI.create("ImageView", {
				image: new_list[i].doctor_img_path || "/images/SPECIALIST.png",
				defaultImage: "/images/SPECIALIST.png",
				//classes: ['rounded'],
				width: 70,
				height: 70,
				borderRadius: 35,
				left: 10,
				top: 5,
				bottom: 5
			});
			 

			var docSpecialty = $.UI.create('Label',{
				classes : ['small_font','wfill','hsize'],
				text:  new_list[i].doctor_name,
				color: "#000000", 
				textAlign:'left', 
				left:15,  
			});	
			var docContact = $.UI.create('Label',{
				classes : ['small_font','wfill','hsize'],
				text:  "specialty : "+new_list[i].specialty,
				color: "#848484", 
				textAlign:'left', 
				bottom:5,
				left:15 
			});	
			//tblRowView.add(docName); 
			tblRowView.add(docSpecialty); 
			//tblRowView.add(docContact);
			row.add(img_path);
			row.add(tblRowView);
			row.addEventListener("click", function(e){
				var clinic = parent({name: "clinic"}, e.source);
				var arr = Array();
				for (var i=0; i < clinic.length; i++) {
					var row = $.UI.create("TableViewRow",{
						classes:['wfill','hsize'],
						title: clinic[i].clinic_name,
						clinic_name: clinic[i].clinic_name,
				  		doctor_panel_id: clinic[i].doctor_panel_id,
					});
				  arr.push(row);
				};
				$.clinic.show();
				$.clinic_list.removeAllChildren();
				$.clinic_list.setData(arr);
			});
			data.push(row);	   
		};
		docTable.setData(data);  
	}
	docTable.addEventListener("scroll", function(e){
		$.clinic.hide();
	});
	$.doctorContainer.add(docTable); 
}

$.clinic_list.addEventListener("click", function(e){
	
	var clinic_name = e.rowData.clinic_name;
	var doctor_panel_id = e.rowData.doctor_panel_id;
	
	Ti.App.fireEvent('selectClinic',{clinicName: clinic_name, doctor_panel_id: doctor_panel_id });
	Ti.App.fireEvent("appointment_index:moveNext");
	$.clinic.hide();
	$.clinic_list.removeAllChildren();
});

function refresh(){
	
	$.doctorContainer.removeAllChildren();
	var checker = Alloy.createCollection('updateChecker');
	var isUpdate = checker.getCheckerById("6", specialty_id);
	var last_updated ="";
	 
	if(isUpdate != "" ){
		last_updated = isUpdate.updated;
	}
	
	API.callByPost({url:"getDoctorPanelBySpecialty", params: {last_updated: last_updated, specialty_id: specialty_id}}, function(responseText){
		var model = Alloy.createCollection("doctor_panel");
		var res = JSON.parse(responseText);
		var arr = res.data || null;
		model.saveArray(arr);
		checker.updateModule(6,"getDoctorPanelBySpecialty", res.last_updated, specialty_id);
		listing = model.getData(specialty_id); 
		render_clinic_list();
	});
	
}

function init(){
	refresh();
}

init();
