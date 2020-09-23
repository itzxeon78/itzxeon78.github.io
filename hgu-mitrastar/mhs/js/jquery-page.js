// JavaScript Document
$(window).load(function(){
	
	$('#hoverItems').hover(function(){
		$('.top_info_S ul').slideDown();
		},function(){
			$('.top_info_S ul').slideUp();
			})
	$('#home').click(function(){
		$('#pagemenu').slideToggle();
		})
	$('.menuList li.sec').click(function(){
		$(this).find('ul').slideToggle();
		})
	$('#dau').click(function(){
		$('#fin').slideToggle();
		})
	$('#fin li#calltab1 a').click(function(){
		$('.finBox').hide();
		$('#tab1').fadeIn();
		})
	$('#fin li#calltab2 a').click(function(){
		$('.finBox').hide();
		$('#tab2').fadeIn();
		})
	$('#fin li#calltab3 a').click(function(){
		$('.finBox').hide();
		$('#tab3').fadeIn();
		})
	$('#fin li#calltab4 a').click(function(){
		$('.finBox').hide();
		$('#tab4').fadeIn();
		})
	})
	
function warn_open(){
	$('.finBox2').show();
}
function warn_close(){
	$('.finBox2').hide();
}	
	
function logoutBtu(){
	$('#logout').fadeIn();
	}	
	
function closeDiv(){
	$('Div.finBox').fadeOut();
	}
function callTab(){
	$('Div.finBox').fadeIn();
	}
	
function Router(){
	$('#re').show();
	$('#re2,#re3').hide();
}
function Pc(){
	$('#re2').show();
	$('#re,#re3').hide();
}
function Impresora(){
	$('#re3').show();
	$('#re,#re2').hide();
}

//?ช้ค
function del_show(){
	$('.del_icon').show();
	$('#closeIcon').show();
	$('#showIcon').hide();
}
function del_close(){
	$('.del_icon').hide();
	$('#showIcon').show();
	$('#closeIcon').hide();
}//?ช้ค
function del_show2(){
	$('.del_icon2').show();
	$('#closeIcon').show();
	$('#showIcon').hide();
}
function del_close2(){
	$('.del_icon2').hide();
	$('#showIcon').show();
	$('#closeIcon').hide();
}