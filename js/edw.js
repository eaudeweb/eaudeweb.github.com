var browser_width,
	browser_height,
	menu_clicked = false,
	touch_enabled = false,
	extra_padding = 0,
	column_width = 256;

iOS_position_fixed = function() {

	if($("html").hasClass("iOS") && !$("html").hasClass("iOS5") && !$("html").hasClass("top_menu"))
	{
		waitForScroll = setTimeout(function() {
			$("header").css("margin-top", $(document).scrollTop() + "px");
			clearTimeout(waitForScroll);
		}, 500);
	}

};

$(window).scroll(function()
{
	if(!menu_clicked)
	{
		var scroll_top = $(window).scrollTop();
		
		$("#content").children("h1,section").each(function(){
			if((($(this).offset().top - extra_padding - 256) <= scroll_top) && (($(this).next().offset().top - extra_padding - 256) > scroll_top))
			{
				var hash = $(this).attr("id").replace("-container", "");
				
				$("header .selected").removeClass("selected");
				$("header a[href='/#"+ hash +"']").parent("li").addClass("selected");
				
				location.hash = hash;
			}
		});
	}
		
	iOS_position_fixed();
});

$(window).load(function(){
	
	var hash = window.location.hash;
	
	if(hash && ($(hash + "-container").length > 0))
	{
		$("html,body").animate({scrollTop: $(hash + "-container").offset().top - extra_padding}, 500);
		iOS_position_fixed();
	}	
});

resize_magic = function() {
	browser_width = $(window).width();
	browser_height = $(window).height();
	
	var header_height = $("header").height();
	
	if(browser_width < 1024)
	{
		$("html").addClass("top_menu");
		$("header").css("margin-top", 0);
		extra_padding = header_height;
		$("#content").css("padding-top", $("header").height() + "px");
	}
	else
	{
		$("html").removeClass("top_menu");
		extra_padding = 0;
		$("#content").css("padding-top", 0);
	}
	
	// resize embeds' height
	/*$("iframe, object, embed, video").each(function(){
		$(this).css("height", $(this).css("width").replace("px","") * $(this).attr("height") / $(this).attr("width") + "px");
	});*/

};

// Ready to go

$(document).ready(function() {
	
	if(navigator.userAgent.match("iPad") || navigator.userAgent.match("iPod"))
	{
		$("html").addClass("iOS");
	}
	
	if(navigator.userAgent.match("OS 5"))
	{
		$("html").addClass("iOS5");
	}
			
	if($("html").hasClass("touch"))
	{
		touch_enabled = true;
	}
		
	if(!touch_enabled)
    {
		$(window).resize(function() {
            resize_magic();
		});
    }
    else
    {
        $('html.touch body').bind('orientationchange',function(event){
	        resize_magic();
        });
	}
	
	resize_magic();
	
	$("body.home #we-work-for-container").masonry({
		itemSelector: "article, h2",
        columnWidth: column_width,
		isAnimated: !Modernizr.csstransitions
	});
	
	$("body.home #we-work-for-container .box").each(function(){
		$(this).click(function(e){
			$(".expanded").removeClass("expanded visible");
			var current_article = $(this).parent();
			
			current_article.addClass("expanded");
			$("#we-work-for-container").masonry({
				itemSelector: "article, h2",
                columnWidth: column_width,
				isAnimated: true
			});
			waitForAnimation = setTimeout(function() {
				current_article.addClass("visible");
				clearTimeout(waitForAnimation);
			}, 600);
			
			e.preventDefault();
		});
	});
	
	$("header a, .sections").each(function(){
		$(this).click(function(e){
			var hash = $(this).attr("href").substr(1);
			$("html,body").animate({scrollTop: $(hash + "-container").offset().top - extra_padding}, 500);
			
			menu_clicked = true;
			
			$("header .selected").removeClass("selected");
			$("header a[href='/" + hash + "']").parent("li").addClass("selected");
            
			waitForAnimation = setTimeout(function() {
				menu_clicked = false;
				clearTimeout(waitForAnimation);
			}, 500);
			
			iOS_position_fixed();
			
			e.preventDefault();
		});
	});
	
	$("#top").click(function(e){
		$("html,body").animate({scrollTop: 0}, 500);
		e.preventDefault();
	});
	
	$("a[rel=external]").each(function(){
		$(this).attr("target", "_blank");
	});

	var contact_map = $('#contact-map');
	if(contact_map.length) {
		var latlng = new google.maps.LatLng(44.4628, 26.0764);
		var map = new google.maps.Map(contact_map[0], {
			center: latlng,
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});
		var marker = new google.maps.Marker({
			position: latlng,
			map: map
		});
		var info_window = new google.maps.InfoWindow({
			content: $('#contact-map-infobox').remove().show()[0]
		});
		info_window.open(map, marker);
		// forcibly remove the close box
		google.maps.event.addListener(info_window, 'domready', function() {
			var parent_box = $('#contact-map-infobox').parents('div:has(>img)');
			$('>img', parent_box).remove();
		});
    }

});
