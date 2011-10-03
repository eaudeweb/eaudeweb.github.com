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
			if((($(this).offset().top - extra_padding) <= scroll_top) && (($(this).next().offset().top - extra_padding) > scroll_top))
			{
				var hash = $(this).attr("id").replace("-container", "")
				
				$("header .selected").removeClass("selected");
				$("header a[href='#"+ hash +"']").parent("li").addClass("selected");
				
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
	    })	
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
	
	$("header a").each(function(){
		$(this).click(function(e){
			var hash = $(this).attr("href");
			$("html,body").animate({scrollTop: $(hash + "-container").offset().top - extra_padding}, 500);
			
			menu_clicked = true;
			
			$("header .selected").removeClass("selected");
			$(this).parent("li").addClass("selected");
			
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

});