var args = arguments[0] || {};
var rec_id = args.id || "";
var MRECORDS = require('medicalRecords');
MRECORDS.construct($); 
var clickTime = null;
var medicalAttachmentModel = Alloy.createCollection('medicalAttachment');
var medicalRecordsModel = Alloy.createCollection('medicalRecords');
var details = medicalRecordsModel.getRecordById(rec_id); 
 
loadMedicalInfo(); 
 
function loadMedicalInfo(){ 
	loadImage(); 
	var title = details.title; 
	if(title != ""){
		title = title.replace(/&quot;/g,"'");
	} 
	var message = details.message;
	$.titleRecord.value= title;
	$.recordsTextArea.value= message ;
	$.lastUpdated.text = "Last updated: " +timeFormat(details.updated);
} 

function loadImage(){
	var recAttachment = medicalAttachmentModel.getRecordByMecId(rec_id);
	var counter = 0;
	console.log(recAttachment);
	if(recAttachment.length > 0){
		removeAllChildren($.attachment);
	 	recAttachment.forEach(function(att){ 
	 		if(att.img_path == null){
	 			var myImage = Ti.Utils.base64decode(att.blob);
	 		}else{
	 			var myImage = att.img_path;
	 		}
	 		
	 		$.attachment.add(attachedPhoto(myImage, counter));
	 		counter++;  
	 	}); 
	 }
}

function saveRecord(){
	var title      = $.titleRecord.value; 
	var message   = $.recordsTextArea.value;
	
	if(title.trim() == ""){
		title = "Untitled - "+ currentDateTime();
	}  
	medicalRecordsModel.updateRecord({ 
		id : rec_id,
		title : title,
		message : message,  
		updated : currentDateTime()
	});  
	// nav.navigationWindow("m_myHealth" );
	Ti.App.fireEvent('displayRecords');
	nav.closeWindow($.editRecWin);
	 
}

function deleteRecord(){
	
	var dialog = Ti.UI.createAlertDialog({
		cancel: 1,
		buttonNames: ['Cancel','Confirm'],
		message: 'Are you sure want to delete this records?',
		title: 'Delete Confirmation'
	});
	dialog.addEventListener('click', function(e){
		if (e.index === e.source.cancel){
		      //Do nothing
		}
		if (e.index === 1){ 
			 medicalRecordsModel.removeRecordById(rec_id);
			 medicalAttachmentModel.removeRecordByRec(rec_id);
			 Ti.App.fireEvent('displayRecords');
			 nav.closeWindow($.editRecWin);
		}
	});
	dialog.show(); 
	
}

function hideKeyboard(){
	MRECORDS.hideKeyboard();
}

function backAndSave(){
	var title      = $.titleRecord.value; 
	var message   = $.recordsTextArea.value;
	
	if(title.trim() == "" && message.trim() == ""){
		var recAttachment = medicalAttachmentModel.getRecordByMecId(rec_id);
		 
		if(recAttachment.length == 0){
			medicalRecordsModel.removeRecordById(rec_id);
		}
		
	}else{
		saveRecord();
	}   
	
	Ti.App.fireEvent('displayRecords');
	//nav.closeWindow($.editRecWin);
}

function attachedPhoto(image,position){
	
	var iView = Ti.UI.createView({
		backgroundColor: "#D5D5D5",
		height : 50,
		position : position,
		width: 50,
		left:5,
		right: 5
	});
		            
	var iImage = Ti.UI.createImageView({
		image : image,
		position :position
	}); 
	iView.add(iImage);
	
	iView.addEventListener('click',function(e){
		// double click prevention
	    var currentTime = new Date();
	    if (currentTime - clickTime < 1000) {
	        return;
	    };
	    clickTime = currentTime;
	    console.log("position : "+position);
		var page = Alloy.createController("attachmentDetails",{rec_id:rec_id,position:position}).getView(); 
	  	page.open();
	  	page.animate({
			curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
			opacity: 1,
			duration: 300
		});
	});
	
	
	return iView;	            
}

function takePhoto(){ 
	var dialog = Titanium.UI.createOptionDialog({ 
	    title: 'Choose an image source...', 
	    options: ['Camera','Photo Gallery', 'Cancel'], 
	    cancel:2 //index of cancel button
	});
	  
	dialog.addEventListener('click', function(e) { 
	     
	    if(e.index == 0) { //if first option was selected
	        //then we are getting image from camera
	        Titanium.Media.showCamera({ 
	            success:function(event) { 
	               var image = event.media;
        		 
	        		if(image.width > image.height){
	        			var newWidth = 320;
	        			var ratio =   320 / image.width;
	        			var newHeight = image.height * ratio;
	        		}else{
	        			var newHeight = 320;
	        			var ratio =   320 / image.height;
	        			var newWidth = image.width * ratio;
	        		}
	        		
				//	image = image.imageAsResized(newWidth, newHeight); 
	                if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
	                   //var nativePath = event.media.nativePath;  
			            blobContainer = image; 
			            medicalAttachmentModel.addAttachment({
							medical_id : rec_id,
							blob : Ti.Utils.base64encode(image)
						});
			            loadImage(); 
	                }
	            },
	            cancel:function(){
	                //do somehting if user cancels operation
	            },
	            error:function(error) {
	                //error happend, create alert
	                var a = Titanium.UI.createAlertDialog({title:'Camera'});
	                //set message
	                if (error.code == Titanium.Media.NO_CAMERA){
	                    a.setMessage('Device does not have camera');
	                }else{
	                    a.setMessage('Unexpected error: ' + error.code);
	                }
	 
	                // show alert
	                a.show();
	            },
	            allowImageEditing:true,
	            mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
	            saveToPhotoGallery:true
	        });
	    } else if(e.index == 1){
	    	 
	    	//obtain an image from the gallery
	        Titanium.Media.openPhotoGallery({
	            success:function(event){
	            	// set image view
	            	var image = event.media;
	            	
	            	if(image.width > image.height){
	        			var newWidth = 320;
	        			var ratio =   320 / image.width;
	        			var newHeight = image.height * ratio;
	        		}else{
	        			var newHeight = 320;
	        			var ratio =   320 / image.height;
	        			var newWidth = image.width * ratio;
	        		}
	        		
					image = image.imageAsResized(newWidth, newHeight); 
		            blobContainer = image; 
		            medicalAttachmentModel.addAttachment({
						medical_id : rec_id,
						blob : Ti.Utils.base64encode(image)
					}); 
		            loadImage(); 
	            },
	            cancel:function() {
	               
	            },
	            
	            mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
	        });
	    } else {
	        
	    }
	});
	 
	//show dialog
	dialog.show();

}
$.recordsTextArea.addEventListener('focus', function(){
	$.recordsTextArea.setHeight("70%");
});
 
$.editRecWin.addEventListener('close',function(){
	backAndSave();
});
Ti.App.addEventListener('refreshAttachment',loadImage );
$.saveRecord.addEventListener('click', saveRecord);
