/*********************
*** DB VERSION CONTROL ***
* 
* Latest Version 1.9
* 
**********************/

// update user device token
exports.checkAndUpdate = function(e){
	var dbVersion = Ti.App.Properties.getString("dbVersion") || "2.6"; 
	if (dbVersion == '1.0') {
	  // do 1.1 upgrade
		var panelList = Alloy.createCollection('panelList'); 
		panelList.addColumn("panel", "INTEGER");
		dbVersion = '1.1';
	}
	if(dbVersion == '1.1'){
		// do 1.1 upgrade
		var appointment = Alloy.createCollection('appointment'); 
		appointment.addColumn("start_date", "TEXT");
		appointment.addColumn("end_date", "TEXT");
		appointment.addColumn("duration", "INTEGER");
		dbVersion = '1.2';
	}
	
	if(dbVersion == "1.2"){
		var doctors = Alloy.createCollection('doctors'); 
		doctors.addColumn("clinic_id", "INTEGER");
		var appointment = Alloy.createCollection('appointment');
		appointment.addColumn("specialty", "TEXT"); 
		dbVersion = '1.3';
	}
	
	if(dbVersion == "1.3"){
		var notification = Alloy.createCollection('notification'); 
		notification.addColumn("status", "INTEGER");
		dbVersion = '1.4';
	}
	
	if(dbVersion == "1.4"){
		var doctors_model = Alloy.createCollection('doctors'); 
		doctors_model.rebuildDb();
		dbVersion = '1.5';
	}
	if(dbVersion == "1.5"){
		
		var notification = Alloy.createCollection('doctors'); 
		notification.addColumn("img_path", "TEXT");
		dbVersion = '1.6';
	}
	if(dbVersion == "1.6"){
		
		var claim_detail = Alloy.createCollection('claim_detail'); 
		claim_detail.addColumn("appcode", "TEXT");
		dbVersion = '1.7';
	}
	
	if(dbVersion == "1.7"){
		var helpline = Alloy.createCollection('helpline'); 
		helpline.resetTable();
		var checker = Alloy.createCollection('updateChecker'); 
		checker.addColumn("u_id", "INTEGER");
		checker.updateModule(7, "getHelplineMessage", "");
		dbVersion = '1.8';
	}
 
	if(dbVersion == "1.8"){
		var health = Alloy.createCollection('health');
		health.addColumn("u_id", "INTEGER");
		health.dropTable();
		var medicalRecordsModel = Alloy.createCollection('medicalRecords');   
		medicalRecordsModel.addColumn("u_id", "TEXT"); 

		dbVersion = '1.9';
	}
	
	if(dbVersion == "1.9"){
		var helpline = Alloy.createCollection('helpline');
		helpline.addColumn("status", "INTEGER");
		helpline.V1_9DBupdate();
		dbVersion = '2.0';
	}
	
	if(dbVersion == "2.0"){
		var panelList = Alloy.createCollection('panelList');
		panelList.addColumn("status", "INTEGER");
		
		var doctor_panel = Alloy.createCollection('doctor_panel');
		doctor_panel.addColumn("status", "INTEGER");
		
		dbVersion = '2.1';
	}
	
	if(dbVersion == "2.1"){
		var model = Alloy.createCollection('notification');
		model.addColumn("detail", "TEXT");
		
		dbVersion = '2.2';
	}
	if(dbVersion == "2.2"){
		var mav2_model = Alloy.createCollection('medicalAttachmentV2');
		mav2_model.addColumn("format", "TEXT");
		
		var mrv2_model = Alloy.createCollection('medicalRecordsV2');
		mrv2_model.addColumn("lab_report_id", "TEXT");
		
		dbVersion = '2.3';
	}
	if(dbVersion == "2.3"){
		 
		var mrv2_model = Alloy.createCollection('medicalRecordsV2');
		mrv2_model.addColumn("lab_report_link", "TEXT");
		
		dbVersion = '2.4';
	}
	if(dbVersion == "2.4"){
		 
		var mrv2_model = Alloy.createCollection('helpline');
		mrv2_model.addColumn("format", "TEXT");
		
		dbVersion = '2.5';
	}
	if(dbVersion == "2.5"){
		 
		var mrv2_model = Alloy.createCollection('helpline');
		mrv2_model.addColumn("dr_id", "INTEGER");
		mrv2_model.setColumnValue("dr_id", 0);
		
		dbVersion = '2.6';
	}
	Ti.App.Properties.setString("dbVersion", dbVersion);
};

