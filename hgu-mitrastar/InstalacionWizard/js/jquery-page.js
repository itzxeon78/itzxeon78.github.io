// JavaScript Document
$(window).load(function(){
	//var x=1;
	//    y=x;
	$('#hoverItems').hover(function(){
		$('.top_info_S ul').slideDown();
		},function(){
			$('.top_info_S ul').slideUp();
			})
	$('#dau').click(function(){
		$('#fin').slideToggle();
		})
	$('#home img').click(function(){
		$('#pagemenu').slideToggle();
		})
	$('.menuList li.sec').click(function(){
		$(this).find('ul').slideToggle();
		})	
	$('#fin li#calltab1 a').click(function(){
		$('.finBox').hide();
		$('#tab1').fadeIn();
		})
	$('#fin li#calltab2 a').click(function(){
		$('.finBox').hide();
		$('#tab2').fadeIn();
		})
	})
function closeDiv(){
	$('Div.finBox').hide();
}
function logoutBtu(){
	$('#logout').fadeIn();
}
	
function warn_open(){
	$('.finBox2').show();
}
function warn_close(){
	$('.finBox2').hide();
}