//Variables
var imgCont = $("#imageFrame");
var menBar = $("#menuBar");
var navBar = $("#navbar");
var mainImg = $("#image");

//Functions
resize = function(oh){
	var width = $(window).width();
    if(width < 901) {
    	menBar.css("width",("12em"));
    }else{
    	menBar.css("width",("23em"));
    }
    
    var w = width - menBar.outerWidth();
    var h = $(window).height() - oh;
    imgCont.css("width",(w).toString() + 'px');
    imgCont.css("height",(h).toString() + 'px');
    menBar.css("height",(h).toString() + 'px');
}

getBgImg = function(bgId){      	      	
	return $('<img>').attr('src', function () {
        var imgUrl = bgId.css('background-image');
        imgUrl = imgUrl.substring(4, imgUrl.length - 1);
    	return imgUrl;
    });
}

replaceImage = function(imageObj) {
	mainImg.css('opacity', '0');
    mainImg.css('background-image', 'url(' + imageObj.url + ')');
    mainImg.css('background-position', imageObj.focus);

    imagesLoaded( getBgImg(mainImg),function () {
    	mainImg.css('opacity', '1');
    });
}

//Binding events and other script logic

$(".menuButton").click(function(){
    var id = $(this).attr('id');
    $.getJSON("/item/"+ id.replace('piece_', ''), function(piece) {
        replaceImage(piece.images[0]);            
    });
});

/*getBgImg(mainImg).on('load',function () {
    $.getJSON("/item/1", function(piece) {
    	var img = piece.images[0];
    	mainImg.css('background-position', img.focus.replace('=','').replace('=',''));
        mainImg.css('opacity', '1');            
    });
});*/

imagesLoaded( getBgImg(mainImg), function () {
    $.getJSON("/item/1", function(piece) {
    	var img = piece.images[0];
    	mainImg.css('background-position', img.focus.replace('=','').replace('=',''));
        mainImg.css('opacity', '1');            
    });
    ev.off();
});

$(window).resize(function() {
    resize(navBar.height());
});

resize(navBar.height());
$(".active").removeClass("active");
$("#werk").parent().addClass("active");
$(".horizontal").mCustomScrollbar({horizontalScroll:true});
$(".vertical").mCustomScrollbar({theme:"dark"});
