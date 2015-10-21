var args = arguments[0] || {};
var medicalRecordsModel = Alloy.createCollection('medicalRecords');  
var medicalAttachmentModel = Alloy.createCollection('medicalAttachment');  
var MRECORDS = require('medicalRecords');
MRECORDS.construct($); 
common.construct($); 
init();

function init(){
	checkDataSync(); 
	displayRecords(""); 
}

function checkDataSync(){
	var param = {  
		u_id : Ti.App.Properties.getString('u_id')
	};
	API.checkMedicalDataSync({param: param}, savedRecords);
}

function savedRecords(ex){
	var result = ex.param; 
	var info =result.data;
	if(info.length > 0){
		info.forEach(function(entry) {
			var dataFromApp = medicalRecordsModel.getRecordById(entry.app_id);
			if(dataFromApp != ""){
				 
			}else{
				 
				var arr = {
					id: entry.app_id,
					server_id: entry.id,
					title: entry.title,
					message: entry.message ,
					clinic: entry.clinic,
					treatment: entry.treatment,
					created: entry.created,
					updated: entry.updated,
				};
				medicalRecordsModel.addRecordFromServer(arr);
			}
		
		});
		
		displayRecords("");
	}
	syncToServer();
}

function syncToServer(){
	var unsyncList = medicalRecordsModel.getUnsyncList();
	 
	if(unsyncList.length > 0){ 
		unsyncList.forEach(function(entry) {
			/** save text information***/
			var param = { 
		 		app_id :entry.id,
				u_id : Ti.App.Properties.getString('u_id'),
				clinic : entry.clinic,
				title : entry.title,
				message  : entry.message,
				treatment : entry.treatment,
				created : entry.created,
				updated : entry.updated,
			};    
		 	API.syncMedicalRecords({param: param}, updatedRecords);
		 	
		 	/** save attachment information***/
		 	var attachments = medicalAttachmentModel.getUnuploadAttachment(entry.id);
			//console.log(attachments);
			if(attachments.length > 0){ 
				attachments.forEach(function(att) {
					var img = att.blob;
					var param = { 
				 		app_id :att.id,
				 		medical_id :att.medical_id,
				 		u_id :Ti.App.Properties.getString('u_id'),
				 		caption : att.category,
				 		Filedata : Ti.Utils.base64decode(att.blob),
				 	};	
				
				 	API.syncAttachments({param: param}, savedAttachment);	 
				});
			}
			/***sync attachment end***/
		});
	}
 
}

function savedAttachment(ex){
	var result = ex.param;
 	medicalAttachmentModel.updateFromServer(result.data); 
}

function updatedRecords(ex){
	var result = ex.param;
	
	var param = { 
 		server_id :result.data.id,
		id : result.data.app_id 
	};   
	 
 	medicalRecordsModel.updateFromServer(param); 
}

function displayRecords(listing){ 
	if(listing == "" || listing.type == "displayRecords"){
		listing = medicalRecordsModel.getRecordsList();  
	} 
 
	var data=[];  
   		var counter = 0; 
   		if(listing.length < 1){ 
			$.recordTable.setData(common.noRecord());
		}else{ 
	   		listing.forEach(function(entry) {
	   			var row = Titanium.UI.createTableViewRow({
			    touchEnabled: true,
			    height: 80,
			    source: entry.id, 
			   // layout: "vertical",
			    backgroundSelectedColor: "#FFE1E1",
				backgroundGradient: {
			      type: 'linear',
			      colors: ['#FEFEFB','#F7F7F6'],
			      startPoint: {x:0,y:0},
			      endPoint:{x:0,y:80},
			      backFillStart:false},
			   });
				
				var tblView = Ti.UI.createView({
					layout: "horizontal",
					height:"80",
					width:"100%" 
				}); 
				var leftView = Ti.UI.createView({
					layout: "vertical",
					height:"80",
					width:"80%" 
				}); 
				var rightView = Ti.UI.createView({
					layout: "vertical",
					height:"80",
					width:"auto" 
				}); 
				
				var title = entry.title;
                if(title != ""){ 
                	title = title.replace(/["']/g, "&quot;");
                }
				
				var clinic = entry.clinic;
				if(clinic != ""){ 
					clinic = clinic.replace(/["']/g, "&quot;");
				}  
				
				var message = entry.message;
				if(message != ""){ 
					message = message.replace(/["']/g, "&quot;");
				}  
				
				var recTitle = Titanium.UI.createLabel({
					text: title,
					font:{fontSize:16},
					source: entry.id,
					color: "#848484",
					width:'90%',
					textAlign:'left',
					top:5,
					left:20, 
					height:Ti.UI.SIZE
				});
				
				var recClinic =  Titanium.UI.createLabel({
					text: clinic,
					source: entry.id,
					font:{fontSize:12,fontWeight:'bold'}, 
					color: "#848484",
					textAlign:'left', 
					width:'100%', 
					left:20,
					height:15
				});
				
				var recMsg =  Titanium.UI.createLabel({
					text: message,
					source: entry.id,
					font:{fontSize:12,fontWeight:'bold'}, 
					color: "#848484",
					textAlign:'left', 
					width:'100%', 
					left:20,
					height:15
				});
				
				var updatedRecord =  Titanium.UI.createLabel({
					text:timeFormat(entry.updated),
					source: entry.id,
					font:{fontSize:12,fontWeight:'bold'},
					width:'auto',
					color: "#848484",
					textAlign:'left', 
					left:20,
					height:Ti.UI.SIZE
				}); 
				
				var rightForwardBtn =  Titanium.UI.createImageView({
					image:"/images/btn-forward.png",
					source: entry.id,
					height:20,
					top:30,
					right:20 
				});		
				
				row.addEventListener('click', function(e) {
				 	viewDetails(e.rowData.source);
				});
			  
				leftView.add(recTitle);
				leftView.add(recClinic);
				leftView.add(recMsg);
			 	leftView.add(updatedRecord);  
			 	rightView.add(rightForwardBtn);
			 	tblView.add(leftView); 
			 	tblView.add(rightView);
			 	row.add(tblView);
				data.push(row);
	   		});
	   		
	   		$.recordTable.setData(data);  
	   		$.recordTable.setHeight(Ti.UI.SIZE);
		} 
	common.hideLoading();
};


function viewDetails(rec_id){  
	nav.navigateWithArgs("editMedical",{id: rec_id}); 
}

Ti.App.addEventListener('displayRecords',displayRecords);
$.newRecord.addEventListener('click',function(){
	medicalRecordsModel.addRecord({title: "", message: "", message: "",created : currentDateTime(), updated: currentDateTime()});
	var lastRec = medicalRecordsModel.getLastId(); 
	nav.navigateWithArgs("editMedical",{id: lastRec.id});
});


/***SEARCH PRODUCTS***/
$.searchItem.addEventListener('focus', function(e){
	$.searchItem.showCancel =  true; 
	$.recordView.opacity = 1;
	$.recordView.height = "auto";
});

$.searchItem.addEventListener('blur', function(e){
	$.searchItem.showCancel =  false;
});

$.searchItem.addEventListener('cancel', function(e){
	$.searchItem.blur();  
	var str = $.searchItem.getValue();
	if(str == ""){
		$.recordTable.data = [];
		displayRecords("");	
	}
		
});

var searchResult = function(){
	common.showLoading();
	$.searchItem.blur();
	var str = $.searchItem.getValue();
	 
	var searchResult = medicalRecordsModel.searchRecord(str); 
	$.recordTable.data = [];
	displayRecords(searchResult);		
};
$.searchItem.addEventListener("return", searchResult);

$.aView	.addEventListener('touchend', function(e){
    $.searchItem.blur(); 
});

if(Ti.Platform.osname == "android"){
	$.btnBack.addEventListener('click', function(){ 
		nav.closeWindow($.myMedicalRecord); 
	}); 
}