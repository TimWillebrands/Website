//Variables
var imgCont = $("#imageFrame");
var menBar = $("#menuBar");
var navBar = $("#navbar");
var mainImg = $("#image");

//Functions
resize = function(ow,oh){
    var w = $(window).width() - ow;
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

    getBgImg(mainImg).on('load',function () {
    	mainImg.css('opacity', '1');
    });
}

//Events
$(".menuButton").click(function(){
    var id = $(this).attr('id');
    $.getJSON("/item/"+ id.replace('piece_', ''), function(piece) {
        replaceImage(piece.images[0]);            
    });
});

getBgImg(mainImg).on('load',function () {
    $.getJSON("/item/1", function(piece) {
    	var img = piece.images[0];
    	mainImg.css('background-position', img.focus.replace('=','').replace('=',''));
        mainImg.css('opacity', '1');            
    });
});

resize(menBar.outerWidth() , navBar.height());

$(window).resize(function() {
    resize(menBar.outerWidth() , navBar.height());
});

//Script logic
$(".active").removeClass("active");
$("#werk").parent().addClass("active");
$(".horizontal").mCustomScrollbar({horizontalScroll:true});
$(".vertical").mCustomScrollbar({theme:"dark"});