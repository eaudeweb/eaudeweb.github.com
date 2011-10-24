var browser_width,
	browser_height,
	menu_clicked = false,
	touch_enabled = false,
	extra_padding = 0,
	column_width = 256,
    map,
    header_height,
    latlng;

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
			if((($(this).offset().top - extra_padding - 128) <= scroll_top) && (($(this).next().offset().top - extra_padding - 128) > scroll_top))
			{
				var hash = $(this).attr("id").replace("-container", "");
				
				$("header .selected").removeClass("selected");
				$("header a[href='/#"+ hash +"']").parent("li").addClass("selected");
				
				location.hash = hash;
			}
		});
	}
    
    positionHorizontalMenu();
		
	iOS_position_fixed();
});

positionHorizontalMenu = function(){

    if(browser_width < 1024)
    {
        if($(window).scrollTop() < ($(".home a").innerHeight() + 1))
            $("header").css("margin-top", -$(window).scrollTop() +"px");
        else
            $("header").css("margin-top", -$(".home a").innerHeight() - 1 +"px");
    }
    else
    {
        $("header").css("margin-top", 0);
    }
}

$(window).load(function(){
	
	var hash = window.location.hash;
	
	if(hash && ($(hash + "-container").length > 0))
	{
		$("html,body").animate({scrollTop: $(hash + "-container").offset().top - extra_padding}, 500);
		iOS_position_fixed();
	}
    
    if(browser_width < 1024)
	{
		$("#content").css("padding-top", $("header").height() + "px");
	}
});

resize_magic = function() {
	browser_width = $(window).width();
	browser_height = $(window).height();
	header_height = $("header").height();
    
    if(map)
    {
        set_map_center();
    }
    
    positionHorizontalMenu();
    
	if(browser_width < 1024)
	{
		
        $("html").addClass("top_menu");
		//$("header").css("margin-top", 0);
		extra_padding = $("header").height() - ($(".home a").innerHeight() + 1);
		$("#content").css("padding-top", $("header").height() + "px");
	            
        if(browser_width < 768)
        {
            
            $(".sections").css("width", browser_width + "px");
            
            if($(".masonry").length)
            {
                $(".expanded").removeClass("expanded visible");
                $("#we-work-for-container").masonry('destroy');
            }
            
            if(browser_width < 480)
            {
                $("#we-work-for-container article, .box, .box img").css("width", browser_width/2 + "px").css("height", browser_width/2 + "px");
                $("#edw-news-container article").css("padding", "").css("min-height", "").css("width", browser_width - 40 + "px");
            }
            else
            {
                $("#we-work-for-container article, .box, .box img").css("width", browser_width/3 + "px").css("height", browser_width/3 + "px");
                $("#edw-news-container article").css("padding", "0 " + (browser_width/3 + 20) + "px 0 20px").css("width", browser_width - (browser_width/3 + 40) + "px").css("min-height", (browser_width/3) + "px");
            }
        }
        else
        {
            $(".sections, .with_padding h2, #edw-news-container article").removeAttr("style");
            if($("body.home #we-work-for-container").length && ($("body.home #we-work-for-container").hasClass("masonry") == false))
            {
                $("#we-work-for-container").masonry({
                    itemSelector: "article, h2",
                    columnWidth: column_width,
            		isAnimated: !Modernizr.csstransitions
            	});
            }
            
            $("#we-work-for-container article, .box, .box img").removeAttr("style");
        }
    }
	else
	{
		$(".sections, .with_padding h2, #edw-news-container article").removeAttr("style");
        if($("body.home #we-work-for-container").length && ($("body.home #we-work-for-container").hasClass("masonry") == false))
        {
            $("#we-work-for-container").masonry({
                itemSelector: "article, h2",
                columnWidth: column_width,
            	isAnimated: !Modernizr.csstransitions
        	});
        }
        
        $("#we-work-for-container article, .box, .box img").removeAttr("style");
        
        $("html").removeClass("top_menu");
		extra_padding = 0;
		$("#content").css("padding-top", 0);
        
        if(browser_height < header_height)
            $(".home a").addClass("lessPadding");
	    else
            $(".home a").removeClass("lessPadding");
    }
    
    if($(".masonry").length)
    {
        $("#we-work-for-container").masonry( 'option', { isAnimated: false });
        $("#we-work-for-container").masonry('reload');
    }
	
	// resize embeds' height
	/*$("iframe, object, embed, video").each(function(){
		$(this).css("height", $(this).css("width").replace("px","") * $(this).attr("height") / $(this).attr("width") + "px");
	});*/

};

function set_map_center() {
    map.setCenter(latlng);
    map.setZoom(15);
}

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
    
    header_height = $("header").height();
			
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
    
    var contact_map = $('#contact-map');
    if(contact_map.length) {
		map = new google.maps.Map(contact_map[0], {
			scrollwheel: false,
			disableDoubleClickZoom: false,
			draggable: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});
        set_map_center();
        
        latlng = new google.maps.LatLng(44.4628, 26.0764);
        
        var image = new google.maps.MarkerImage(
          'images/marker.png',
          new google.maps.Size(38,57),
          new google.maps.Point(0,0),
          new google.maps.Point(19,57)
        );
        
        var shadow = new google.maps.MarkerImage(
          'images/marker-shadow.png',
          new google.maps.Size(70,57),
          new google.maps.Point(0,0),
          new google.maps.Point(19,57)
        );
        
        var shape = {
          coord: [25,0,27,1,29,2,30,3,31,4,32,5,33,6,34,7,35,8,35,9,36,10,36,11,37,12,37,13,37,14,37,15,37,16,37,17,37,18,37,19,37,20,37,21,37,22,37,23,37,24,37,25,36,26,36,27,35,28,35,29,34,30,34,31,33,32,33,33,32,34,31,35,31,36,30,37,30,38,29,39,29,40,28,41,27,42,27,43,26,44,26,45,25,46,24,47,24,48,23,49,23,50,22,51,22,52,21,53,20,54,20,55,19,56,18,56,17,55,17,54,16,53,16,52,15,51,15,50,14,49,13,48,13,47,12,46,12,45,11,44,11,43,10,42,9,41,9,40,8,39,8,38,7,37,6,36,6,35,5,34,5,33,4,32,4,31,3,30,3,29,2,28,1,27,1,26,1,25,0,24,0,23,0,22,0,21,0,20,0,19,0,18,0,17,0,16,0,15,0,14,0,13,1,12,1,11,1,10,2,9,2,8,3,7,4,6,5,5,6,4,7,3,8,2,10,1,13,0,25,0],
          type: 'poly'
        };
        
        var marker = new google.maps.Marker({
          draggable: false,
          raiseOnDrag: false,
          clickable: false,
          icon: image,
          shadow: shadow,
          shape: shape,
          map: map,
          position: latlng
        });
        
        if(touch_enabled)
        {
            var dragFlag = false,
            start = 0,
            end = 0;
            
            contact_map[0].addEventListener('touchstart', function(e){
                dragFlag = true;
                start = touch_enabled == true ? e.touches[0].pageY : e.clientY; 
            },true);
            
            contact_map[0].addEventListener('touchend', function(){ 
                dragFlag = false; 
            }, true);
            
            contact_map[0].addEventListener('touchmove',function(e){
                if ( !dragFlag ) return;
                end = touch_enabled == true ? e.touches[0].pageY : e.clientY;   
                window.scrollBy( 0,( start - end ) ); 
            }, true);
        }
        
		/*var info_window = new google.maps.InfoWindow({
			content: $('#contact-map-infobox').remove().show()[0]
		});
		info_window.open(map, marker);
		// forcibly remove the close box
		google.maps.event.addListener(info_window, 'domready', function() {
			var parent_box = $('#contact-map-infobox').parents('div:has(>img)');
			$('>img', parent_box).remove();
		});*/
        
    }
	
	resize_magic();
	
    if($("body").hasClass("home"))
    {
        if(browser_width >=768)
        {
            $("#we-work-for-container").masonry({
                itemSelector: "article, h2",
                columnWidth: column_width,
                isAnimated: !Modernizr.csstransitions
            });
        
            $(".masonry .box").live("click", function(e){
            	$(".expanded").removeClass("expanded visible");
        		var current_article = $(this).parent();
        		
        		current_article.addClass("expanded");
        		
                $("#we-work-for-container").masonry( 'option', { isAnimated: true });
                $("#we-work-for-container").masonry('reload');
                
        		waitForAnimation = setTimeout(function() {
        			current_article.addClass("visible");
        			clearTimeout(waitForAnimation);
        		}, 600);
        		
        		e.preventDefault();
        	});
        }
	
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
    }
	
	$("#top").click(function(e){
		$("html,body").animate({scrollTop: 0}, 500);
		e.preventDefault();
	});
	
	$("a[rel=external]").each(function(){
		$(this).attr("target", "_blank");
	});

});
