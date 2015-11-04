var args = arguments[0] || {}; 
var u_id = Ti.App.Properties.getString('u_id') || "";
//var friends = Alloy.createCollection("friends");
//var data = friends.getData();
var fade_view = $.UI.create("View", {
	classes:['wfill', 'hfill'],
	backgroundColor: "#000000"
});
var fade_images = ['/images/slideshow/bg0.png', '/images/slideshow/bg1.png', '/images/slideshow/bg2.png', '/images/slideshow/bg3.png'];

function do_continue(){
	var win = Alloy.createController("home").getView();
	win.open(); 
	if(u_id == ""){ 
		nav.navigateWithArgs("login", {});  
	} 
}

//move Hover pointer
function changeSlideOpacity(seed){
	var child = $.image_container.children;
	var first = child[Math.floor(seed)];
	
	if((seed - Math.floor(seed)) == 0){
		for(var a = 0; a < child.length; a++){
			if(a == Math.floor(seed)){
				child[a].setOpacity(1);
			}else{
				child[a].setOpacity(0);
			}
		}
	}else{
		var second = child[Math.ceil(seed)];
		for(var a = 0; a < child.length; a++){
			if(a == Math.floor(seed) || a == Math.ceil(seed)){
				first.setOpacity(Math.ceil(seed) - seed);
				second.setOpacity(seed - Math.floor(seed));
			}else{
				child[a].setOpacity(0);
			}
		}
	}
}

//when scrollend event fire, move the hover to correct place. 
function scroll(event){
	if(typeof event.currentPageAsFloat == "undefined"){
		return ;
	}
	changeSlideOpacity(event.currentPageAsFloat);
	if(event.currentPage == 0){
		//Ti.App.fireEvent('Ti:table_refresh');
	}
}

/*
 	render friends list
 * */
function render_slideshow(){
	$.image_container.removeAllChildren();
	for (var i=0; i < fade_images.length; i++) {
		var img = $.UI.create("ImageView",{
			classes:['wfill', 'hsize'],
			image: fade_images[i],
			top: 0
		});
		$.image_container.add(img);
	};
}

/*
 	Refresh
 * */
function refresh(){ 
	render_slideshow();
	changeSlideOpacity(0); 
}

/**
 * Closes the Window
 */
function closeWindow(){
	$.win.close();
}

function init(){ 
	refresh();
}

init();

$.slogan.addEventListener("scroll", scroll);

Ti.App.addEventListener('slideshow:refresh',refresh);

$.win.addEventListener("close", function(){
	Ti.App.removeEventListener('slideshow:refresh',refresh);
	$.destroy();
});
