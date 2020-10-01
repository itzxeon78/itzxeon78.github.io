//jquery-page.js

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
function del_show(){
	$('.del_icon').show();
	$('#closeIcon').show();
	$('#showIcon').hide();
}
function del_close(){
	$('.del_icon').hide();
	$('#showIcon').show();
	$('#closeIcon').hide();
}
function del_show2(){
	$('.del_icon2').show();
	$('.chooseBox_input').attr("readonly",false)
	$('.chooseBox_select').attr("disabled",false)
	$('#closeIcon').show();
	$('#showIcon').hide();
}
function del_close2(){
	$('.del_icon2').hide();
	$('.chooseBox_input').attr("readonly",true)
	$('.chooseBox_select').attr("disabled",true)
	$('#showIcon').show();
	$('#closeIcon').hide();
}
var LANG = null;
function loadLanguages(url){	
	if (url==null) url="/mhs/languages/";
	var i=0;
	for( i=0; i<CONFIG.LANGUAGES.length;i++){
		var shortn = CONFIG.LANGUAGES[i].shortName;
		var file = url+CONFIG.LANGUAGES[i].file;
		$.ajax({
			type:"GET",
			url: file,
			success: function(data, textStatus){
				$.i18n(shortn+".dashboard", data);
				if (LANG == shortn) {
					reloadTexts();					
				};				
   			},
			async: false,
			dataType: "json"
		});
	}
}
function loadTipsTexts(url){
	if (url==null) url="/mhs/languages/";
	var i=0;
	for( i=0; i<CONFIG.LANGUAGES.length;i++){
		var shortn = CONFIG.LANGUAGES[i].shortName;
		var file = url+"tips."+shortn+ ".json";		
		$.ajax({
			type:"GET",
			url: file,
			cache: false,
			success: function(data, textStatus){
				$.i18n(shortn+".dashboard", data);
   			},
			dataType: "json",
			async: false
		});
	}
}
function loadDefaultLanguage(url){
	LANG = CONFIG.DefaultLanguage;
	if (url==null) url="/mhs/languages/";
	var file = null;	
	var i=0;
	for( i=0; i<CONFIG.LANGUAGES.length;i++){
		var shortn = CONFIG.LANGUAGES[i].shortName;
		if (shortn==LANG){
			file = url+CONFIG.LANGUAGES[i].file;
			break;
		}
	}	
	if (LANG == "en") {   		setEnglish();}
	else if (LANG == "es") {	setSpanish();}
	else if (LANG == "pt") {	setPortuguese();}
	else if (LANG == "ch") {	setChinese();}
}

function _(str, args) { 
   // return $.i18n('dashboard', str, args); 
    return $.i18n("dashboard", str, args);
}
function setSpanish(){
	LANG = 'es';
	$.i18n(LANG);
	reloadTexts();		
}
function setEnglish(){
	LANG = 'en';
	$.i18n(LANG);	
	reloadTexts();	
}
function setPortuguese(){
	LANG = 'pt';
	$.i18n(LANG);
	reloadTexts();		
}
function setChinese(){
	LANG = 'ch';
	$.i18n(LANG);	
	reloadTexts();	
}
function reloadTexts(){	
	$(".trad").each(function (i) {		
		var key =jQuery(this).attr("key");
		var value= _(key);
		jQuery(this).html(value);
	});	
}
function reloadTextsDiv(id_element){	
	$("#"+id_element+" .trad").each(function (i) {		
		var key =jQuery(this).attr("key");
		var value= _(key);
		jQuery(this).html(value);		
	});	
}


//jquery.json-2.2.js
/*
 * jQuery JSON Plugin
 * version: 2.1 (2009-08-14)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Brantley Harris wrote this plugin. It is based somewhat on the JSON.org 
 * website's http://www.json.org/json2.js, which proclaims:
 * "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
 * I uphold.
 *
 * It is also influenced heavily by MochiKit's serializeJSON, which is 
 * copyrighted 2005 by Bob Ippolito.
 */
 
(function($) {
    /** jQuery.toJSON( json-serializble )
        Converts the given argument into a JSON respresentation.

        If an object has a "toJSON" function, that will be used to get the representation.
        Non-integer/string keys are skipped in the object, as are keys that point to a function.

        json-serializble:
            The *thing* to be converted.
     **/
    $.toJSON = function(o)
    {
        if (typeof(JSON) == 'object' && JSON.stringify)
            return JSON.stringify(o);
        
        var type = typeof(o);
    
        if (o === null)
            return "null";
    
        if (type == "undefined")
            return undefined;
        
        if (type == "number" || type == "boolean")
            return o + "";
    
        if (type == "string")
            return $.quoteString(o);
    
        if (type == 'object')
        {
            if (typeof o.toJSON == "function") 
                return $.toJSON( o.toJSON() );
            
            if (o.constructor === Date)
            {
                var month = o.getUTCMonth() + 1;
                if (month < 10) month = '0' + month;

                var day = o.getUTCDate();
                if (day < 10) day = '0' + day;

                var year = o.getUTCFullYear();
                
                var hours = o.getUTCHours();
                if (hours < 10) hours = '0' + hours;
                
                var minutes = o.getUTCMinutes();
                if (minutes < 10) minutes = '0' + minutes;
                
                var seconds = o.getUTCSeconds();
                if (seconds < 10) seconds = '0' + seconds;
                
                var milli = o.getUTCMilliseconds();
                if (milli < 100) milli = '0' + milli;
                if (milli < 10) milli = '0' + milli;

                return '"' + year + '-' + month + '-' + day + 'T' +
                             hours + ':' + minutes + ':' + seconds + 
                             '.' + milli + 'Z"'; 
            }

            if (o.constructor === Array) 
            {
                var ret = [];
                for (var i = 0; i < o.length; i++)
                    ret.push( $.toJSON(o[i]) || "null" );

                return "[" + ret.join(",") + "]";
            }
        
            var pairs = [];
            for (var k in o) {
                var name;
                var type = typeof k;

                if (type == "number")
                    name = '"' + k + '"';
                else if (type == "string")
                    name = $.quoteString(k);
                else
                    continue;  //skip non-string or number keys
            
                if (typeof o[k] == "function") 
                    continue;  //skip pairs where the value is a function.
            
                var val = $.toJSON(o[k]);
            
                pairs.push(name + ":" + val);
            }

            return "{" + pairs.join(", ") + "}";
        }
    };

    /** jQuery.evalJSON(src)
        Evaluates a given piece of json source.
     **/
    $.evalJSON = function(src)
    {
        if (typeof(JSON) == 'object' && JSON.parse)
            return JSON.parse(src);
        return eval("(" + src + ")");
    };
    
    /** jQuery.secureEvalJSON(src)
        Evals JSON in a way that is *more* secure.
    **/
    $.secureEvalJSON = function(src)
    {
        if (typeof(JSON) == 'object' && JSON.parse)
            return JSON.parse(src);
        
        var filtered = src;
        filtered = filtered.replace(/\\["\\\/bfnrtu]/g, '@');
        filtered = filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
        filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
        
        if (/^[\],:{}\s]*$/.test(filtered))
            return eval("(" + src + ")");
        else
            throw new SyntaxError("Error parsing JSON, source is not valid.");
    };

    /** jQuery.quoteString(string)
        Returns a string-repr of a string, escaping quotes intelligently.  
        Mostly a support function for toJSON.
    
        Examples:
            >>> jQuery.quoteString("apple")
            "apple"
        
            >>> jQuery.quoteString('"Where are we going?", she asked.')
            "\"Where are we going?\", she asked."
     **/
    $.quoteString = function(string)
    {
        if (string.match(_escapeable))
        {
            return '"' + string.replace(_escapeable, function (a) 
            {
                var c = _meta[a];
                if (typeof c === 'string') return c;
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + string + '"';
    };
    
    var _escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;
    
    var _meta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    };
})(jQuery);


//index.js
var filesadded="";
var CONFIG = null;
var STATUS = null;
var USER_NAME =	"Admin";

/*---------------------------------------*/
/*	 AUTHENTICATION AND PASSWORD CHANGE	 */
/*---------------------------------------*/
function getLoginStatus(callback){
	jQuery.getJSON('/mhs/APIS/returnLoginStatusJSON.txt', 
		function(returnData, status){
			if(returnData.RETURN.success){
				callback(returnData.RETURN.success,returnData.STATUS);
			}else{
				callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
			}
		}
	);	
}

function configurationLoaded(){
	var imprementation = CONFIG.Implementation;
	
	if (CONFIG.Branding == "o2") 
		replacecssfile("defaultBranding.css", "/mhs/css/o2.css");
	else if (CONFIG.Branding == "telefonica") 
		replacecssfile("defaultBranding.css", "/mhs/css/telefonica.css");
	else if (CONFIG.Branding == "chile") {
		replacecssfile("defaultBranding.css", "/mhs/css/telefonica.css");
	}
	else 
		replacecssfile("defaultBranding.css", "/mhs/css/movistar.css");
/*
	if (imprementation=="api"){
		loadjscssfile("/mhs/APIS/api.js", "js");		
	}else if (imprementation=="api_fake"){		
		loadjscssfile("/mhs/APIS/api_fake.js", "js");		
	}
*/	
	loadDefaultLanguage();
	setTimeout("$('#panel_header').load('/mhs/html/header.html',function() {reloadTextsDiv('panel_header');configureLinksHeader();});",0);
	setTimeout("$('#panel_footer').load('/mhs/html/footer.html',function() {loadFooter()});",0);
	setTimeout("$('#panel_content').load('/mhs/html/networkMap/network_map.html', function(){reloadTextsDiv('panel_content');});",0);
	setTimeout("loadLanguages();",0); 	//julie remove
	setTimeout("loadTipsTexts();",0);
	setTimeout("disableAdvancedSettings();",0);	
	setTimeout("getLoginStatus(initializeStatus);",10);
	setTimeout("checkNavigator();",1);
}
function loadFooter(){
	reloadTextsDiv('panel_footer');
	if(CONFIG.Country=='ES')
		$('#txtFooter').html("&copy; 2010 Telefonica S.A. <span class='trad' key='FOOT_RIGHTS'>Todos los derechos reservados</span>");
	else if(CONFIG.Country=='UK')
		$('#txtFooter').html("&copy; 2010 Telef&oacute;nica O2 UK Limited");
	else if(CONFIG.Country=='BR')
		$('#txtFooter').html("&copy; 2010 Telefonica S.A.");
	
	if (CONFIG.Branding =='o2'){
		$('.imgFooter').css('display','block');
		$('.txtFooter').css('float','right');
		$('#panel_footer a').css('color','#515559');
	}
	
}
//	Dynamically load and add .js, css or php files
function loadjscssfile(filename, filetype,callback){
	var fileref= createjscssfile(filename, filetype);

 	if (typeof fileref != "undefined") {
		fileref.appendTo("head");
	}
}

function createjscssfile(filename, filetype){
	var fileref= null;
 	if (filetype=="js"){ //if filename is a external JavaScript file
		fileref=$("<script>");
		fileref.attr("type","text/javascript");
		fileref.load(function() { /*alert("Hello");*/ });
		fileref.attr("src", filename);		
 	}
	else if (filetype=="css"){ //if filename is an external CSS file
		fileref=$("<link>");
		fileref.attr("rel", "stylesheet");
		fileref.attr("type", "text/css");
		fileref.attr("href", filename);		
	}
	return fileref;
}

function replacecssfile(oldfilename, newfilename){
 	var targetelement=	"link";  	//element type to create nodelist using
 	var targetattr	=	"href";		//corresponding attribute to test for
 	var allsuspects	=	document.getElementsByTagName(targetelement);
 	
	for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
		
  		if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename)!=-1){
   			var newelement=createjscssfile(newfilename, "css");
   			allsuspects[i].parentNode.replaceChild(newelement[0], allsuspects[i]);
  		}
 	}
}
function initializeStatus(success,loginData){
	if(success){
		STATUS=loginData;
		USER_NAME=loginData.USER;
	}
}
function logIn(){	
	updateLoginStatus(true, USER_NAME);	
	enableAdvancedSettings();
	if (!timer_is_on)	setTimeout("startSessionChecker();",1000);
}

function logOutAdmin(){	
	updateLoginStatus(false,"");
	disableAdvancedSettings();
	stopSessionChecker();
	closeSession(function(response){
		//alert(response);	
	});
}
function updateLoginStatus(loged, user){
	STATUS.LOGGED=loged;
	STATUS.USER=user;	
}
function configureLinksHeader(){
	$('#faq').click(function() {		
		loadHelpDialog(_("HELP_TITLE"), function() { linkContent("1","0"); });		
	});
		
	var htmlLanguagesList="";
	var long_name="";	
	var lang_name="";
	var line=0;
	for (i = 0; i < CONFIG.LANGUAGES.length; i++) {
		var shortn = CONFIG.LANGUAGES[i].shortName;		
		if (shortn == 'es') {long_name = 'Spanish'; lang_name="Espa&ntilde;ol";
		}else if (shortn == 'en') {long_name = 'English'; lang_name="English";
		}else if(shortn == 'pt'){long_name = 'Portuguese'; lang_name="Portugu&eacute;s";
		}else if(shortn == 'ch'){long_name = 'Chinese'; lang_name="";}
		if(CONFIG.LANGUAGES.length==1){
			if($('#lineLanguages').length>0) $('#lineLanguages').attr("style","display:none");
		}else if(CONFIG.LANGUAGES.length==2){
			htmlLanguagesList = htmlLanguagesList + "<span id='link_"+shortn+"'+ style='display:none' class='first'>";
			htmlLanguagesList = htmlLanguagesList + "<a class='right' href='javascript:set"+long_name+"();changeLink();'>"+lang_name+"</a></span>";
		}else{
			htmlLanguagesList = htmlLanguagesList + "<span id='link_"+shortn+"'+ style='display:none'";
			if (line==0){htmlLanguagesList = htmlLanguagesList + "class='first'>";}else if (line==0){htmlLanguagesList = htmlLanguagesList + ">";};		
			if (line>0){ htmlLanguagesList = htmlLanguagesList + "><div id='first' class='line_small right'></div>";}
			htmlLanguagesList = htmlLanguagesList + "<a class='right' href='javascript:set"+long_name+"();changeLink();'>"+lang_name+"</a></span>";
			line=line+1;
		}
	};
	$("#languages").append(htmlLanguagesList);
	changeLink();
	for (i = 0; i < CONFIG.LANGUAGES.length; i++) {
		var shortn = CONFIG.LANGUAGES[i].shortName;
		if (shortn != CONFIG.DefaultLanguage) {			
			$("#link_" + shortn).css("display", "inline");			
		}else{			
			$(".network_map").css("background", "url(./images/brd_"+CONFIG.Branding+"/net_map_"+shortn+".png) no-repeat");	
		}
	}
}

function disableAdvancedSettings(){	
	$('.enabled').each(function(){		
		if ($(this).children().hasClass('disabled_opacity')) {			
			$(this).children().fadeTo("slow", 0.4);
		};
		if ($(this).hasClass('disabled_opacity')){
			$(this).fadeTo("slow", 0.4);			
		}		
		$(this).removeClass('enabled');
		$(this).addClass('disabled');
	});	
}

function enableAdvancedSettings(){	
	$('.disabled').each(function(){		
		if ($(this).children().hasClass('disabled_opacity')) {			
			$(this).children().fadeTo("slow", 1.0);
		};
		if ($(this).hasClass('disabled_opacity')) {			
			$(this).fadeTo("slow", 1.0);
		};		
		$(this).removeClass('disabled');
		$(this).addClass('enabled');
	});		
} 

function loadAuthentication(callback){
	authentication(USER_NAME, $('#pass').val(),callback)
}

function loadDialogLogin(page, title, width, reload){
	preloadDialog(title, width);
	$('#dialog').load(page, function(){				
		reloadTextsDiv('dialog');							
		$('#dialog').dialog('open');	
		$(".ui-widget-overlay").click(function(){			
			$('#dialog').dialog("close");
		});	
		/*$(".dialog_faq").click(function(){				
			loadHelpDialog(_("HELP_TITLE"));		
		});*/	
		
		isPasswordDefault(paintLoginPage);
		setTimeout('$("#pass").focus();',1500);
		effectHover('cancel', 'cancel_icon');
		effectHover('accept', 'accept_icon');
		$('#cancel').click(function(){
			closeDialog();
		});	
		$('#pass').keypress(function(event) {
			if(event.keyCode == 13){
				loadNextDialog(reload)
			}
		});
		$('#acceptLogin').click(function(){
			loadNextDialog(reload)
		});				
	});			
}
function loadNextDialog(reload){
	if (reload == "wifi") {
		loadAuthentication(loadModalWifi);
	}else if (reload == "applications") {
		loadAuthentication(loadModalApplications);
	}else if (reload == "devices") {
		loadAuthentication(loadModalDevice);
	}else if (reload == "password") {
		loadAuthentication(loadModalPassword);
	}else if (reload == "adsl") {
		loadAuthentication(loadModalAdsl);
	}else if (reload == "router") {
		loadAuthentication(loadModalRouter);
	}else if (reload == "lanv4") {
		loadAuthentication(loadModalLANv4);
	}else if (reload == "lanv6") {
		loadAuthentication(loadModalLANv6);
	}else if (reload == "lan") {
		loadAuthentication(loadModalLANv4);
	}else if (reload == "NAT") {
		loadAuthentication(loadModalApplications);
	}else if (reload == "others") {
		loadAuthentication(loadModalLANv6);
	}else if (reload == "aviso") {
		loadAuthentication(loadModalaviso);
	}else if (reload == "wan") {
		loadAuthentication(loadModalWAN);
	}else if (reload == "others") {
		loadAuthentication(loadModalBackup);
	}else if (reload == "backup") {
		loadAuthentication(loadModalBackup);
	}else if (reload == "fwupload") {
		loadAuthentication(loadModalfwupload);
	}		
}
function paintLoginPage(success,password){
	if(success){
		if(password.isDefault){
			//texts for default password
			$("#divLogin").removeClass("passTop");
			$("#divLogin").addClass("divLogin");
			$("#divLogin").html("<span class='textLogin trad' key='LOGIN_TEXT_2'></span>"+
					"<span class='left'><div class='imgDefaultStiker' /></span>");
			$('#forgetQuestion').html(_("COMMON_EMPTY"));
			$("#forgetQuestion").attr("key","COMMON_EMPTY");
			reloadTextsDiv('divLogin');
		}else{
			//texts for modified password
			$("#divLogin").removeClass("divLogin");
			$("#divLogin").addClass("passTop");
			$('#divLogin').html("<span id='textLogin'></span>")
			$('#forgetQuestion').html(_("LOGIN_FORGET"));
			$("#forgetQuestion").attr("key","LOGIN_FORGET");	
			$("#forgetQuestion").click(function(){			
				loadForgetDiv();
			});					
		}
	}else{ 
		//password is errorDescription
		showWarning(_(password));
	}
}
function loadForgetDiv(){
	$('#forget').html("<div class='line_grey'></div>" +
			"<div class='left exclamationForget'><img src='images/dialog/exclamation.png'/></div>" +
			"<div class='left txtForget' id='forget'>" +
				"<div class='passTop trad paragraph1' key='LOGIN_FORGET_1'> </div>" +
				"<div class='passTop'>" + 
					"<div class='right'><div class='gateway_reset_ico' /></div>" +
					"<div class='trad' key='LOGIN_FORGET_2' />" + 
					
				"</div>" +
			"</div>" +
			"");
	reloadTextsDiv('forget');
}

//AFTER LANGUAGE CHANGE
function changeLink(){
	var i=0;
	var language = LANG;
	for (i = 0; i < CONFIG.LANGUAGES.length; i++) {
		var shortn = CONFIG.LANGUAGES[i].shortName;
		if (shortn == language) {
			//Hide the link		
			$("#link_" + language).css("display", "none");
			if ($("#link_" + language).hasClass('first')) {
				$("#first").css("display", "none");				
			};
		}
		else {
			//Show the link
			$("#link_" + shortn).css("display", "inline");
			if ($("#link_" + shortn).hasClass('first')) {
				$("#first").css("display", "inline");				
			};
		}
	}
	
	//update "network map" image
	$(".network_map").css("background", "url(./images/brd_"+CONFIG.Branding+"/net_map_"+LANG+".png) no-repeat");	
}

function checkNavigator(){
	if(/MSIE 6.0/i.test(navigator.userAgent)) {
		showWarning(_("INDEX_NAVIGATOR"));
	}
}
/*******************************************************************
 *  	FUNCTIONS TO CONTROL THE SESSION TIMEOUT
 *******************************************************************/
//var sessionMaxTime = 15;
var remainSession=-1;
var sessionTimer;
var timer_is_on=false;

function startSessionChecker(){
	if (!timer_is_on)	{
		timer_is_on=true;
		remainSession=CONFIG.SessionMaxTime;
		setTimeout("timedInterval();",500);
		//$("#remaining_session_box").show();
	}
}

function stopSessionChecker(){
	if (timer_is_on)	{
		timer_is_on=false;
		remainSession=-1;
		updateTimerPage();
		//setTimeout("$('#remaining_session_box').hide();",5000);
	}
}

function timedInterval(){
	if (!timer_is_on) return;	
	updateTimerPage();
	remainSession=remainSession-10;
	if (remainSession>=0){
		sessionTimer=setTimeout("timedInterval()",10000);
	} 
	else expiredSession();
}

function updateTimerPage(){
	//if (remainSession>0)	$("#remaining_session").html(""+remainSession+ " sg");
	//else 			$("#remaining_session").html("OFF");
}

function renoveSession(){
	remainSession = CONFIG.SessionMaxTime;	
}

function expiredSession(){
	stopSessionChecker();
	timer_is_on = false;
	logOutAdmin();
	if (CONFIG.SessionWarning) showWarning(_("COMMON_SESSION_WARNING"));
}

/*******************************************************************
 *  	FUNCTIONS TO CONTROL DEVICE BAG ACTUALIZATION
 *******************************************************************/
var timer_updater_is_on=false;
var updaterTimer;

function startBagUpdaterThread(){
	if (!timer_updater_is_on)	{
		timer_updater_is_on=true;
		updaterTimer = setTimeout("timedUpdate();",1000*CONFIG.UpdateStep);
	}
}

function stopUpdater(){
	if (timer_updater_is_on)	{
		timer_updater_is_on=false;
		//updateTimerPage();
		//setTimeout("$('#remaining_session_box').hide();",5000);
	}
}

function timedUpdate(){
	if (!timer_updater_is_on) return;	
	//updateTimerPage();
	//alert("update"); 
	//self.status =self.status + " update"; 
	updateNetworkMap();
	updaterTimer=setTimeout("timedUpdate()",1000*CONFIG.UpdateStep);
}

function updateNetworkMap(){
	listDevices(updateDevicesBag);
	getInternetInfo(showInternetStatus);
	//getWifiInfo(updateWifiInNetworkmap);
}


//networkMap/applications.js
var current_rules=0;
var applicationsInfoList=new Array();
var devicesList=new Array();
var idApplicationSelected = -1;
var delflag = false;
var flagChange = false;
var flagModify = false;
var flagSave = false;
var currentPage = 1;
function showApplicationsList(success, returnData){
	if (success){
		applicationsInfoList= returnData;
		showPageApplicationsList(1);
	}else{
		showWarning(_(returnData));
	}
}
function showPageApplicationsList(page){
	//alert("showPageApplicationsList entry!");
	currentPage = page;
	var applicationsLength = applicationsInfoList.length;
	var i=0;
	$("#applications_list").html("");
	if(applicationsInfoList.length <13){
		$('div[class=controls_right]').css("display","none");
	}else if(applicationsInfoList.length <25){
		$('div[class=controls_right]').css("display","block");
		$('div[id=lineRight]').css("display","none");
		$('div[id=page_number3]').css("display","none");
	}else if (applicationsInfoList.length <37){
		$('div[id=lineRight]').css("display","block");
		$('div[id=page_number3]').css("display","block");
	}
	if (page == 1){
		if (applicationsInfoList.length >12){
			applicationsLength = 12;
		}
		
	}else if (page == 2){
		var i=12;
		if (applicationsInfoList.length > 24){
			applicationsLength = 24;
		}
		
	}else if (page == 3){
		var i=24;
		if (applicationsInfoList.length > 36){
			applicationsLength = 36;
		}
	}
	$("#applications_list").html("");
	var htmlApplicationsList="";
	for (; i < applicationsLength; i++) {
 		var app = applicationsInfoList[i];
		htmlApplicationsList=htmlApplicationsList+"<div id='"+app.idApplication+"' class='application' onclick='showApplicationSelected("+app.idApplication+")'>"		
		htmlApplicationsList=htmlApplicationsList+"<div class='application_txt'>"+app.nameApplication+"</div>";
		htmlApplicationsList=htmlApplicationsList+"<div ipAssigned='"+app.ipAssigned+"' class='application_assigned' idIcon='"+app.idIcon +"'></div>";	
		htmlApplicationsList=htmlApplicationsList+"<div id='arrow"+app.idApplication+"' class='application_arrow'></div></div>";				
	}
	$("#applications_list").append(htmlApplicationsList);
	//alert("before showMyRules!");
	showMyRules();
	//alert("after showMyRules!");
	loadDefaultAppListStyle(page);
}
function loadDefaultAppListStyle(page){
	$('div[ipAssigned='+false+']').css('display', 'none');
	$('div[class=application_arrow]').css('display', 'none');
	$('div[class=page_numbers_selected]').attr("class","page_numbers right hand");
	$('div[id=page_number'+page+']').attr("class","page_numbers_selected");
	if(idApplicationSelected!=-1){
		loadSelectedAppStyle(idApplicationSelected);
	}
}

function loadCreateRuleForm(){
	//alert("loadCreateRuleForm entry!");
	var id = current_rules++;
	var newRule = $("#sample_rule>div").clone();
	newRule.css("display", "block");
	newRule.attr("id", "rule"+id);
	newRule.find("input[id=checkPortsN]").bind("change" , function(){
		var thisrule = $(this).parents("#rules_list>div");
		if (thisrule!=null && thisrule.length>0)
		updateRuleForm(thisrule);
		changeFlag();	
	});
	newRule.find("input[id=checkPortsM]").bind("change" , function(){
		var thisrule = $(this).parents("#rules_list>div");
		if (thisrule!=null && thisrule.length>0)
		updateRuleForm(thisrule);
		changeFlag();	
	});
	newRule.find("input[id=checkPortsN]").attr("id", "checkPorts"+ id);
	newRule.find("span[id=fromN]").attr("id", "from"+ id);
	newRule.find("input[id=ruleStartWanN]").attr("id", "ruleStartWan"+ id);
	newRule.find("div[id=untilN]").attr("id", "until"+ id);
	newRule.find("input[id=ruleEndWanN]").attr("id", "ruleEndWan"+ id);

	//newRule.find("input[id=checkPortsM]").attr("id", "checkPortsL"+ id);
	newRule.find("span[id=fromN1]").attr("id", "from"+ id);
	newRule.find("input[id=ruleStartLanN]").attr("id", "ruleStartLan"+ id);
	newRule.find("div[id=untilN1]").attr("id", "until"+ id);
	newRule.find("input[id=ruleEndLanN]").attr("id", "ruleEndLan"+ id);
	
	newRule.find("select[id=select_trafficN]").attr("id", "select_traffic"+ id);
	newRule.find("div.minus_icon").bind("click", function(){
		var thisrule = $(this).parents("#rules_list>div");
		deleteRule(thisrule);  	
	});
	
	$("#rules_list").prepend(newRule);

	$("#rules_list #checkPorts"+id).attr("checkedLabel",_("APPLICATIONS_PORT_ON"));
	$("#rules_list #checkPorts"+id).attr("uncheckedLabel",_("APPLICATIONS_PORT_OFF"));
	reloadTextsDiv('rules_list');
	$("#rules_list #checkPorts"+id).attr("checked",true); 
	
	updateRuleForm(newRule);
	
	$("#select_traffic"+id).selectbox();
	changeFlag();
	updateSelectEffects();
	updateScroll();
}

function updateRuleForm(rule){
	var value = rule.find("input[type=checkbox]").attr("checked");
	var from = rule.find(".fromField");
	var until = rule.find(".untilField");
	var from1 = rule.find(".fromField1");
	var until1 = rule.find(".untilField1");
	
	if (value){
		from.find("span").text(_("APPLICATIONS_EMPTY"));
		from.find("span").attr("key","APPLICATIONS_EMPTY");
		from.find("span").css("width",'5px');
		until.css('visibility', 'hidden');
		until.find("input").css('width', '31px');
		from1.find("span").text(_("APPLICATIONS_EMPTY"));
		from1.find("span").attr("key","APPLICATIONS_EMPTY");
		from1.find("span").css("width",'5px');
		until1.css('visibility', 'hidden');
		until1.find("input").css('width', '31px');
				
	}else{
		from.find("span").text(_("APPLICATIONS_RULES_FROM"));
		from.find("span").attr("key","APPLICATIONS_RULES_FROM");
		from.find("span").css("width",'40px');
		until.css('visibility', 'visible');
		until.find("input").css('width', '40px');
		from1.find("span").text(_("APPLICATIONS_RULES_FROM"));
		from1.find("span").attr("key","APPLICATIONS_RULES_FROM");
		from1.find("span").css("width",'40px');
		until1.css('visibility', 'visible');
		until1.find("input").css('width', '40px');
	}
}

function showApplicationSelected(idapp){
	//alert("showApplicationSelected entry!");
	if(flagChange){
		showInfoDialog(_("APPLICATIONS_CONFIRM_LOSE_CHANGES"), false, true,function (resp){
			if (resp == true) {
				if(flagModify){
					if (validateForm()){
						applicationJSON = createApplicationJSON();
						if(applicationJSON != false  ){
							modifyApplication(applicationJSON,reloadList);
							showApp(idapp);
							flagChange = false;
						}
					}					
					renoveSession(); 
				}else{
					if (validateForm()){
						applicationJSON = createApplicationJSON();
						if(applicationJSON != false  ){
							newApplication(applicationJSON,reloadList);
							showApp(idapp);
							flagChange = false;
						}
					}					
					renoveSession(); 
				}
			}else {
				flagChange = false;
				showApp(idapp);
			}
		});	
	}else	showApp(idapp);
}
function showApp(idapp){
	//alert("showAPP entry!");
	flagModify = true;
	idApplicationSelected = idapp;
	loadSelectedAppStyle(idapp);
	$('#acceptApp').unbind('click'); 						
	$('#acceptApp').click(function() {
		modifyApplicationSelected();
	});
	var i=0;
	for (; i < applicationsInfoList.length;i++) {
		var app = applicationsInfoList[i];
		if(app.idApplication == idApplicationSelected){
			//showRules(app)
			showMyRules();
		}
	}
}
function reloadList(success,returnData){
	applicationsInfoList= returnData;
	showPageApplicationsList(currentPage);
}
function loadSelectedAppStyle(idapp){
	
	$('div[class=application_arrow]').css('display', 'none');
	$('div[class=application_selected]').attr("class","application");
	
	$('div[id=arrow'+idapp+']').css('display', 'block');
	$('div[id=arrow'+idapp+']').css('display', 'block');
	$('div[id='+idapp+']').attr("class","application_selected");
}
function showRules(application){
	//alert("showRules entry!");
	$("#rules_list").html("");
	current_rules = application.RULES.length;

	
	
	//adding every rule to the form
	var i=0;
 	for (; i < current_rules; i++) {	
	
		var rule = application.RULES[i];
		var newRule = $("#sample_rule>div").clone();
		newRule.css("display", "block");
		var id = i;
		newRule.attr("id", "rule"+id);
		newRule.attr("idRule", ""+rule.idRule);
		var idrul = id;
		newRule.find("input[id=checkPortsN]").attr("id", "checkPorts"+ id);
		newRule.find("span[id=fromN]").attr("id", "from"+ id);
		newRule.find("input[id=ruleStartWanN]").attr("value", rule.startWan);		//Setting the 'from' port
		newRule.find("input[id=ruleStartWanN]").attr("id", "ruleStartWan"+ id);		
		newRule.find("div[id=untilN]").attr("id", "until"+ id);
		newRule.find("input[id=ruleEndWanN]").attr("value", rule.endWan);
		newRule.find("input[id=ruleEndWanN]").attr("id", "ruleEndWan"+ id);		
		newRule.find("select[id=select_trafficN]").attr("id", "select_traffic"+ id);
		
		
		newRule.find("div.minus_icon").bind("click", function(){
			var thisrule = $(this).parents("#rules_list>div");
			deleteRule(thisrule);
		});
		
		newRule.find("input[id=checkPorts"+id+"]").bind("change" , function(){
			var thisrule = $(this).parents("#rules_list>div");
			if (thisrule!=null && thisrule.length>0)
			updateRuleForm(thisrule);
			changeFlag();	
		});
		
		$("#rules_list").append(newRule);
		
		$("#rules_list #checkPorts"+id).attr("checkedLabel",_("APPLICATIONS_PORT_ON"));
		$("#rules_list #checkPorts"+id).attr("uncheckedLabel",_("APPLICATIONS_PORT_OFF"));
		if(rule.startWan == rule.endWan){
			newRule.find("input[type=checkbox]").attr("checked",true);
			updateRuleForm(newRule);
		}
		
		$("select#select_traffic"+id+" option[value='"+rule.protocol+"']").attr("selected", "selected");
		$("#select_traffic"+id).selectbox();
	}
	load_some_iphone_butons($("#rules_list input[type=checkbox]"));
 	loadNameApplication(application.nameApplication);
 	selectDevicesList(application.ipAssigned);
	reloadTextsDiv('rules_list');	
	//flagChange = true;	
	updateSelectEffects();
	updateScroll();
}

function updateSelectEffects(){

	var rules = $("#rules_list>div");
	var N = rules.length;
	var lastone = null;
	var penultimateOne = null;
	
	//initial status
	rules.find(".jquery-selectbox-moreButton").unbind( "click",behaviourLastSelect);
	rules.find(".jquery-selectbox-moreButton").unbind( "click",behaviourPenultimateSelect);
	rules.find("select").unbind( "change");

	if (N>0) lastone=jQuery(rules[N-1]);
	if (N>1) penultimateOne=jQuery(rules[N-2]);
	if (N>=3){
		lastone.find(".jquery-selectbox-moreButton").bind( "click", behaviourLastSelect);
		penultimateOne.find(".jquery-selectbox-moreButton").bind( "click", behaviourPenultimateSelect);
		
		lastone.find("select").bind( "change", closeLastSelect);
		penultimateOne.find("select").bind( "change", closeLastSelect);
	}
}


function behaviourLastSelect(){
	var select = jQuery(this).parent();
	if (select.hasClass("selectOpen")) {	//hide
		closeLastSelect();
	}
	else{								//show
		openLastSelect(101);
	}
}

function behaviourPenultimateSelect(){
	var select = jQuery(this).parent();
	if (select.hasClass("selectOpen")) {	//hide
		closeLastSelect();
	}
	else{								//show
		openLastSelect(67);
	}
}

function openLastSelect(width){
	var widthLast = "101";
	if (width!=undefined && width>0){
		widthLast = ""+width;
	}

	//adding space for the list of options at the end of the scroll layer	
	$("#rules_list>div:last-child").css("height", widthLast+ "px");
	updateScroll();
	
	jQuery(document).bind('click', addBlurEvent);
}

function closeLastSelect(){
	jQuery(document).unbind('click', addBlurEvent);
	
	//removing not used space at the end of the scroll layer
	$("#rules_list>div:last-child").css("height", "34px");
	updateScroll();
}

function addBlurEvent(e){
	var trgt = e.target;
	var currentListElements = jQuery('.jquery-selectbox-list:visible').parent().find('*').andSelf();
	if(jQuery.inArray(trgt, currentListElements)<0 ) {
		closeLastSelect();
	}
	return false;
}

function deleteRule(rule){
	//alert("deleteRule entry!");
	rule.remove();
	//current_rules--;
	changeFlag();
	updateSelectEffects();
	updateScroll();
}

function newdeleteRule(rule){
	rule.remove();
}

function loadNameApplication(nameApplication){
	$("#application_name").html(nameApplication+"<input id='applicationName'  onkeyup='changeFlag()' style='display:none' name='applicationName' value='"+nameApplication+"'></input>");
 	$('div[id=edit_icon]').css('display', 'block');
 	$("#divNameApp").click(function() {
 		$("#application_name").html("<input id='applicationName' onkeyup='changeFlag()' name='applicationName' maxlength ='17' value='"+nameApplication+"'></input>");
 		$('div[id=edit_icon]').css('display', 'none');
 		$("#applicationName").focus();  
 		$('#divNameApp').unbind("click");
	});
 }
function loadNameNewApplication(){
	$("#application_name").html("<span class='trad' key='APPLICATIONS_NEW_APPLICATION'></span><input onkeyup='changeFlag()' id='applicationName' style='display:none' name='applicationName'></input>");
	$('div[id=edit_icon]').css('display', 'block');
 	$("#divNameApp").click(function() {
 		$("#application_name").html("<input id='applicationName' onkeyup='changeFlag()' name='applicationName' maxlength ='17' ></input>");
 		$('div[id=edit_icon]').css('display', 'none');
 		$("#applicationName").focus();
 		$('#divNameApp').unbind("click");
	});
 	reloadTextsDiv('application_name');
 	$("#applicationName").attr("value",_("APPLICATIONS_NEW_APPLICATION"));
 }

function loadDevicesList(){
		devicesList = allDevices;
		$("#application_device").html("");
		var i=0;
		var htmlDevicesList="<div class='title_grey' style='margin-right: 8px;'><span id='devices_list' class='trad' key='APPLICATIONS_DEVICES_LIST'>Para el dispositivo</span></div><select id='selectDevices' class='select' title='' onchange='changeFlag()'>";
		htmlDevicesList=htmlDevicesList+"<option value='false' icon='false' class='trad' key='APPLICATIONS_DEVICES_NONE'>Ninguno</option>	";
		for (; i < devicesList.length; i++) {	
			device = devicesList[i];
			if(device.interfaceType!="USB"){
				var nameDevice =device.nameDevice;
				if(device.unknown || nameDevice==null || nameDevice==""){
					nameDevice=device.ipAddress;	
				}
				htmlDevicesList=htmlDevicesList+"<option icon="+device.idIcon+" value="+device.ipAddress+"><span>"+nameDevice+"</span></option>	";
			}
		}

		htmlDevicesList=htmlDevicesList+"</select>";
		$("#application_device").append(htmlDevicesList);
		reloadTextsDiv('application_device');
		$("#selectDevices").selectbox();
}
function selectDevicesList(ipAssigned){
		$("#selectDevices").parents('.jquery-selectbox').unselectbox();
		$("select#selectDevices option[value='"+ipAssigned+"']").attr("selected", "selected");
	 	$("#selectDevices").selectbox();
}

function loadApplicationsList(success, returnData){
	//alert("loadApplicationsList entry!");
	if (success){
		showApplicationsList(success, returnData)
		loadNewApplication();
		
	}else{
		showWarning(_(returnData));
	}
	//alert("before close!");
	$.openLoadingMask(1);
	setTimeout(function(){$.closeLoadingMask(1);}, 5000);
	$('#dialog').dialog("close");
	//alert("after close!");
}
function loadNewApplication(){
	loadNameNewApplication();
	$("#rules_list").html("");
 	loadCreateRuleForm();
 	selectDevicesList("false");
 	$('div[class=application_selected]').attr("class","application");
 	$('#acceptApp').unbind('click'); 						
	$('#acceptApp').click(function() {
		createNewApplication();
	});
 	idApplicationSelected =-1;
 	loadDefaultAppListStyle(1);
	load_some_iphone_butons($("#rules_list input[type=checkbox]"));
 	flagChange = false;
 	showPageApplicationsList(1);
 }

function deleteApplicationSelected(){
	//alert("deleteApplicationSelected entry!");
	if (idApplicationSelected!=-1){
		showWarningOptional(_("APPLICATIONS_CONFIRM_DELETE"), function (resp){
			if (resp == true) {
				deleteApplication(idApplicationSelected,loadApplicationsList);
			}
		});	
	}else{
		showWarning(_("APPLICATIONS_WARNING_DELETE"));
	}
	flagChange = false;
	renoveSession();
}
function validateForm(){
	var i=0;
	var nameValue = $("#applicationName").attr("value");
	if (nameValue  == ""){
		showWarning(_("APPLICATIONS_WARNING_NAME_EMPTY"));
		return false;
	}

	var res = true;
	$("#rules_list>div").each( function(index){
		var thisrule = $(this);
		var check = thisrule.find("input[type=checkbox]");
		if (check.attr("checked")){
			if(thisrule.find(".fromField>input").val()==""){
				res = false;		
			}
		}else{
			if(	(thisrule.find(".fromField>input").val()=="") || (thisrule.find(".untilField>input").val()=="")) {
				res = false;		
			}
		}
	});
	
	if(!res){
		showWarning(_("APPLICATIONS_WARNING_PORT_EMPTY"));
		return  false;	
	}
	
	return true;
}
var applicationJSON;
var delApplicationJSON;
function createNewApplication(){
	var completeSaveTime = 0;
	var reloadTime = 0;
	var ruleNum = 0;

	if (applicationsInfoList.length>35){
		showWarning(_("APPLICATIONS_WARNING_MAX_NUMBER_APPS"));
	}else{
		if (validateForm()){
			$('#acceptApp').unbind('click');     
			applicationJSON = createApplicationJSON();
			if(applicationJSON != false  ){
				newApplication(applicationJSON,loadApplicationsList);
			}
			flagChange = false;
			$('#dialog').dialog("close");
			window.parent.$.openLoadingMask(1);
			
			ruleNum = 0;
			$("#rules_list>div").each( function(index){
				ruleNum++;
			});
			if( ruleNum > 5 && ruleNum < 33){
				completeSaveTime = 2000*ruleNum;
				reloadTime = completeSaveTime - 1500;
				setTimeout(function(){window.parent.$.closeLoadingMask(1);}, completeSaveTime);
				setTimeout(function(){window.parent.location.reload();}, reloadTime);
			}
			else{
				setTimeout(function(){window.parent.$.closeLoadingMask(1);}, 10000);
				setTimeout(function(){window.parent.location.reload();}, 8500);
			}
		}
		renoveSession();
	}
	
}

function modifyApplicationSelected(){
	if (validateForm()){
		$('#acceptApp').unbind('click');   
		applicationJSON = createApplicationJSON();
		if(applicationJSON != false  ){
			modifyApplication(applicationJSON,loadApplicationsList);
		}
	}
	renoveSession();
}
var objectApp= new Object();
function createApplicationJSON(){
	//alert("createApplicationJSON entry!");
	objectApp.sessionKey = gblsessionKey;
	//alert("objectApp.sessionKey="+objectApp.sessionKey);
	objectApp.idApplication = idApplicationSelected;
	objectApp.nameApplication = $("#applicationName").val();
	objectApp.ipAssigned = $("#selectDevices").val();
	objectApp.idIcon = $("#selectDevices option[value='"+$("#selectDevices").val()+"']").attr("icon");
	var rules = new Array();
	var k=0;
	$("#rules_list>div").each( function(index){
		var objetcRule = new Object();
		var thisrule = $(this);
		var select_traffic = thisrule.find("select");
		
		if (thisrule!=null && thisrule.length==1){
			objetcRule.ipType = $('#IPType').val();
			objetcRule.idRule   = thisrule.attr("idRule");
			objetcRule.protocol = thisrule.find("select").val();
			objetcRule.startWan	= thisrule.find(".fromField>input").val();
			objetcRule.startLan	= thisrule.find(".fromField1>input").val();
			objetcRule.addr	= thisrule.find(".application_device>input").val();
			if(thisrule.find("input[type=checkbox]").attr("checked")){
				objetcRule.endWan   = objetcRule.startWan;
				//objetcRule.startLan	= objetcRule.startWan;
				//objetcRule.endLan   = objetcRule.endWan;
				objetcRule.endLan   = objetcRule.startLan;
				
			}else{
				objetcRule.endWan = thisrule.find(".untilField>input").val();
				objetcRule.endLan = thisrule.find(".untilField1>input").val();
				//objetcRule.startLan	= objetcRule.startWan;
				//objetcRule.endLan   = objetcRule.endWan;
				if(eval(objetcRule.startWan) > eval(objetcRule.endWan) || eval(objetcRule.startLan) > eval(objetcRule.endLan)){
					showWarning(_("APPLICATIONS_WARNING_RANGE"));
					return false;
				}
			}
			if(objetcRule.addr==""){
				showWarning(_("APPLICATIONS_WARNING_ADDRESS"));
				return false;
			}
			//alert("objetcRule.ipType="+objetcRule.ipType);
			//alert("objetcRule.idRule="+objetcRule.idRule);
			//alert("objetcRule.protocol="+objetcRule.protocol);
			//alert("objetcRule.startWan="+objetcRule.startWan);
			//alert("objetcRule.startLan="+objetcRule.startLan);
			//alert("objetcRule.endWan="+objetcRule.endWan);
			//alert("objetcRule.endLan="+objetcRule.endLan);
			//alert("objetcRule.addr="+objetcRule.addr);
			rules[k]= objetcRule;
			k++;
		}
	});
	
	if(k == 0 ){
		showWarning(_("APPLICATIONS_WARNING_RULES"));
		return false;
	}else{
		objectApp.RULES = rules;
		var applicationJSON = $.toJSON(objectApp);
		applicationJSON="{\"APPLICATION\":"+applicationJSON+"}";

		return applicationJSON;
	}
}
function updateScroll(){	
	setTimeout("loadScroll('#rules_list')",4);
}
function checkPort(obj){
	var port = obj.value;
	if(port!=""){
		if((port<1)||(port>65535)){
			showWarning(_("APPLICATIONS_WARNING_PORT_ERROR"));
			obj.value="";
			return false;
		}
	}
	return true;	
}

function checkIPFormat(address)
{
	var IP = address.value;
	IP = IP.replace(/ /g, "");
	address.value = IP;
	IPsplit = IP.split(".");
	if(IPsplit.length != 4 )
	{
		showWarning(_("INVALID_IPV4_ADDRESS_MSG"));
		address.focus();
		address.value="";
		return (false);
	}
	for(i = 0; i < 4; i++)
		if((isNaN(IPsplit[i])) || (IPsplit[i] == 'undefined') || (IPsplit[i] == "")) 
		{
			showWarning(_("INVALID_IPV4_ADDRESS_MSG"));
			address.focus();
			address.value="";
			return (false);
		} 
		else
		{
			if((parseInt(IPsplit[i], 10) > 255) || (parseInt(IPsplit[i], 10) < 0)) 
			{
				showWarning(_("INVALID_IPV4_ADDRESS_MSG"));
				address.focus();
				address.value="";	
				return (false);
			}
		}
		
	int_add0=parseInt(IPsplit[0], 10);
	int_add3=parseInt(IPsplit[3], 10);			
	if(int_add0 == 0 || int_add0 == 127 || int_add0 > 223 || int_add3 ==0 || int_add3 ==255)
	{
		showWarning(_("INVALID_IPV4_ADDRESS_MSG"));
		address.focus();
		address.value="";
		return (false);
	}		
	return (true);
}

function changeFlag(){
	flagChange = true;
}


//APIS/api_fake.js
var applicationsInfoarray=new Array();
/*----------------------------*/
/*		SESSION MANAGEMENT    */
/*----------------------------*/
function closeSession(callback){
	jQuery.getJSON( '/mhs/APIS/returnJSON.txt', 
		function(returnData, status){
			if(returnData.RETURN.success){
				callback(returnData.RETURN.success,"");
			}else{
				callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
			}
		}
	);
}

/*---------------------------------------*/
/*	 AUTHENTICATION AND PASSWORD CHANGE	 */
/*---------------------------------------*/
function getLoginStatus(callback){
	jQuery.getJSON('/mhs/APIS/returnLoginStatusJSON.txt', 
		function(returnData, status){
			if(returnData.RETURN.success){
				callback(returnData.RETURN.success,returnData.STATUS);
			}else{
				callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
			}
		}
	);	
}
//returnJSON structure contains a passwordJSON structure
function isPasswordDefault(callback){
	jQuery.getJSON( '/mhs/APIS/returnPasswordJSON.txt', 
		function(returnData, status){
			if(returnData.RETURN.success){
				callback(returnData.RETURN.success,returnData.PASSWORD);
			}else{
				callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
			}
		}
	);
}
function authentication(user, password, callback){
	jQuery.getJSON( '/mhs/APIS/returnJSON.txt', 
		function(returnData, status){
			if(returnData.RETURN.success){
				callback(returnData.RETURN.success,"");
			}else{
				callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
			}
		}
	);
}
function changePassword(user,oldPassword,newPassword, callback){
	jQuery.getJSON( '/mhs/APIS/returnJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,"");
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}

/*---------------------------*/
/*	 DEVICES CONFIGURATION 	 */
/*---------------------------*/
//returnJSON structure contains a devicesJSON structure with information about all devices
function listDevices(callback){
		$.ajax({
		  	url: '/mhs/APIS/returnDevicesJSON.txt',
		  	dataType: 'json',
		  	cache: false,
		  	success: function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.DEVICES);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		});
}
 
//returnJSON structure contains a devicesJSON structure with information about all devices to paint networkMap
function modifyDevice(devicesJSON,callback){
	//global variable allDevices
	var allDev=allDevices;
	var i=0;
	for( ;i<allDev.length;i++){
		if(allDev[i].idDevice==idDev){
			allDev[i].nameDevice=nameDevice;
			allDev[i].idIcon=idIconDevice;
			allDev[i].type=typeDevice;
		}
	}
	var devJSON = $.toJSON(allDev);
	devJSON="{\"RETURN\":{\"success\": true},\"DEVICES\":"+devJSON+"}";
	$.ajax({
	  	url: '/mhs/jsps/conf_devices.jsp',
	  	dataType: 'json',
	  	type:'POST',
	  	data: {
			operation: 'modifyDevice',
			JSON: devJSON
		},
		cache: false,
	  	success:function(returnData, status){
					if (returnData.RETURN != undefined && returnData.RETURN.success) {
	 					callback(returnData.RETURN.success,returnData.DEVICES);
	 				}else{
	 					callback(false,"ERROR_GENERAL");
	 				}
	 	},
		error:function(xmlhttprequest, textStatus,errorThrown){
			callback(false,"ERROR_GENERAL");
	 	}
	 	
	});
}

//returnJSON structure contains a devicesJSON structure with information about all devices to paint networkMap
function removeDevice(idDevice,callback){
	//global variable allDevices
	var allDev=allDevices;
	var i=0;
	for( ;i<allDev.length;i++){
		if(allDev[i].idDevice==idDev){
			allDev.splice(i,1);
		}
	}
	var devJSON = $.toJSON(allDev);
	devJSON="{\"RETURN\":{\"success\": true},\"DEVICES\":"+devJSON+"}";
	$.ajax({
	  	url: '/mhs/jsps/conf_devices.jsp',
	  	dataType: 'json',
	  	type:'POST',
	  	data: {
			operation: 'deleteDevice',
			JSON: devJSON
		},
		cache: false,
	  	success:function(returnData, status){
					if (returnData.RETURN != undefined && returnData.RETURN.success) {
	 					callback(returnData.RETURN.success,returnData.DEVICES);
	 				}else{
	 					callback(false,"ERROR_GENERAL");
	 				}
	 	},
		error:function(xmlhttprequest, textStatus,errorThrown){
			callback(false,"ERROR_GENERAL");
	 	}
	 	
	});
	
}
/*-------------------*/
/*		INTERNET   	 */
/*-------------------*/

//returnJSON structure contains an internetJSON structure
function getInternetInfo(callback){
	$.ajax({
		URL: '/mhs/APIS/returnInternetJSON.txt',
		//url: '/mhs/jsps/internet_get.jsp',
		dataType: 'json',
		cache: false,
		success: function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.INTERNET);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		}
	);	
}

//returnJSON structure contains a internetJSON structure
function setInternet(internetJSON, callback){
	var postData = eval ("(" + internetJSON + ")");

/*
	var natStatus;
	var addrStatus;
	
	if(postData.INTERNET.PPP.natvalue){
		natStatus="Enable";
	}else{
		natStatus="Disable";
	}

	if(postData.INTERNET.PPP.dynamic){
		addrStatus="0";
	}else{
		addrStatus="1";
	}
*/
	if(postData.INTERNET.PPP.modeflag==1){
		//alert("username="+postData.INTERNET.PPP.username);
		//alert("password="+postData.INTERNET.PPP.password);
		//alert("isp="+postData.INTERNET.PPP.isp);
		//alert("encap="+postData.INTERNET.PPP.encap);
		//alert("natenable="+postData.INTERNET.PPP.natenable);
	
		$.ajax({
	  		url: '/cgi-bin/mhs/returnInternetJSON.asp',
	  		dataType: 'json',
			type:'post',
			cache: false,
	  		data: {
	  			submitValue: "Apply",
				sessionKey: postData.INTERNET.PPP.sessionKey,
				mode:1,
				pppusername: postData.INTERNET.PPP.username,
				ppppassword: postData.INTERNET.PPP.password,
				pppisp:postData.INTERNET.PPP.isp,
				pppencap:postData.INTERNET.PPP.encap,
				pppnatenable:postData.INTERNET.PPP.natenable
			}
		});
	}
	else if(postData.INTERNET.PPP.modeflag==2){
		//alert("isp="+postData.INTERNET.PPP.isp);
		//alert("encap="+postData.INTERNET.PPP.encap);
		//alert("natenable="+postData.INTERNET.PPP.natenable);
	
		$.ajax({
	  		url: '/cgi-bin/mhs/returnInternetJSON.asp',
	  		dataType: 'json',
			type:'post',
			cache: false,
	  		data: {
	  			submitValue: "Apply",
				sessionKey: postData.INTERNET.PPP.sessionKey,
				mode:2,
				pppisp:postData.INTERNET.PPP.isp,
				pppencap:postData.INTERNET.PPP.encap,
				pppnatenable:postData.INTERNET.PPP.natenable
			}
		});
	}

	jQuery.getJSON( '/mhs/APIS/returnInternetJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
	);
	/*
	$.ajax({
  		url: '/mhs/jsps/internet_set.jsp',
		dataType: 'json',
		data: {
			JSON: internetJSON
  		},
	  	type:'POST',
	  	cache: false,
	  	success: function(returnData, status){
	    	if(returnData.RETURN.success){
	     		callback(returnData.RETURN.success,returnData.INTERNET);
	    	}else{
	     		callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
	    	}
	  	},
	  	error:function(xmlhttprequest, textStatus,errorThrown){
			callback(false,"ERROR_GENERAL");
	  	}
 	}); 
 	*/
}

/*-----------------------*/
/*		APPLICATIONS   	 */
/*-----------------------*/
//returnJSON structure contains an applicationsListJSON structure
function listApplications(callback){
		$.ajax({
		  	url: '/mhs/APIS/returnApplicationsListJSON.txt',
		  	dataType: 'json',
		  	cache: false,
		  	success: function(returnData, status){
				if (returnData.RETURN.success) {
					callback(returnData.RETURN.success,returnData.APPLICATION_LIST);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		});
}

//returnJSON structure contains an applicationsListJSON structure
function listFreeApplications(callback){
	jQuery.getJSON( '/mhs/APIS/returnApplicationsListJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.APPLICATION_LIST);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}
 
//returnJSON structure contains an applicationsListJSON structure
function listAssignedApplications(idDevice,callback){
	jQuery.getJSON( '/mhs/APIS/returnApplicationsListJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.APPLICATION_LIST);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}

//returnJSON structure contains an applicationsJSON structure
function infoApplications(callback){
	$.ajax({
	     url: '/mhs/APIS/returnApplicationsJSON.txt',
	     dataType: 'json',
	     cache: false,
	     success: function(returnData, status){
	    if (returnData.RETURN.success) {
	     applicationsInfoarray = returnData.APPLICATIONS;
	     callback(returnData.RETURN.success,returnData.APPLICATIONS);
	    }else{
	     callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
	    }
	   }
	  });
}
var globalNum=0;
function myNewApplication(ruleNum, postData){
	var i=0;
	var finishFlag="NO";
	for(i=0;i<ruleNum;i++){
		if(i==(ruleNum-1)){
			finishFlag="YES";
		}
		if(i==globalNum){
			$.ajax({
	  			url: '/cgi-bin/mhs/returnApplicationJSON.asp',
	  			dataType: 'asp',
				type:'post',
				cache: false,
	  			data: {
	  				submitValue: "New",
					sessionKey: postData.APPLICATION.sessionKey,
					appName:"User Define",
					flag:finishFlag,
					curNum:i,
					active: "Yes",
					addr: postData.APPLICATION.RULES[i].addr,
					protocol: postData.APPLICATION.RULES[i].protocol,
					startWan: postData.APPLICATION.RULES[i].startWan,
					endWan:postData.APPLICATION.RULES[i].endWan,
					startLan:postData.APPLICATION.RULES[i].startLan,
					endLan:postData.APPLICATION.RULES[i].endLan
				}
			});
			break;
		}
	}
	globalNum++;
}

function newApplication6(applicationJSON,delApplicationJSON,callback){
	var currentId = applicationsInfoarray.length;
	var postData = eval ("(" + applicationJSON + ")");
	var postDelData = eval ("(" + delApplicationJSON + ")");
	var ruleNum =0;
	var delruleNum = 0;
	var i=0;
	ruleNum= postData.APPLICATION.RULES.length;
	delruleNum = postDelData.APPLICATION.RULES.length;

	var data = {
	    sessionKey: postData.APPLICATION.sessionKey,
		active: "Yes",
		icmptype:"destination-unreachable",
		ipType: "IPv6",
		rejecttype:"no-route",
		fwaction:"Permit",
		appName:"User Define",
		srcPrefix:"128",
		dstPrefix:"128"
	};		

	//#####################start delete
	
	if(delruleNum>0){
		data.delFlag0 = "Delete";
		data.deldirName0 = postDelData.APPLICATION.RULES[0].dirName;
		data.delcurNum0 = postDelData.APPLICATION.RULES[0].curNum;
	}
	if(delruleNum>1){
		data.delFlag1 = "Delete";
		data.deldirName1 = postDelData.APPLICATION.RULES[1].dirName;
		data.delcurNum1 = postDelData.APPLICATION.RULES[1].curNum;
	}
	if(delruleNum>2){
		data.delFlag2 = "Delete";
		data.deldirName2 = postDelData.APPLICATION.RULES[2].dirName;
		data.delcurNum2 = postDelData.APPLICATION.RULES[2].curNum;
	}
	if(delruleNum>3){
		data.delFlag3 = "Delete";
		data.deldirName3 = postDelData.APPLICATION.RULES[3].dirName;
		data.delcurNum3 = postDelData.APPLICATION.RULES[3].curNum;
	}
	if(delruleNum>4){
		data.delFlag4 = "Delete";
		data.deldirName4 = postDelData.APPLICATION.RULES[4].dirName;
		data.delcurNum4 = postDelData.APPLICATION.RULES[4].curNum;
	}
	if(delruleNum>5){
		data.delFlag5 = "Delete";
		data.deldirName5 = postDelData.APPLICATION.RULES[5].dirName;
		data.delcurNum5 = postDelData.APPLICATION.RULES[5].curNum;
	}
	if(delruleNum>6){
		data.delFlag6 = "Delete";
		data.deldirName6 = postDelData.APPLICATION.RULES[6].dirName;
		data.delcurNum6 = postDelData.APPLICATION.RULES[6].curNum;
	}
	if(delruleNum>7){
		data.delFlag7 = "Delete";
		data.deldirName7 = postDelData.APPLICATION.RULES[7].dirName;
		data.delcurNum7 = postDelData.APPLICATION.RULES[7].curNum;
	}
	if(delruleNum>8){
		data.delFlag8 = "Delete";
		data.deldirName8 = postDelData.APPLICATION.RULES[8].dirName;
		data.delcurNum8 = postDelData.APPLICATION.RULES[8].curNum;
	}
	if(delruleNum>9){
		data.delFlag9 = "Delete";
		data.deldirName9 = postDelData.APPLICATION.RULES[9].dirName;
		data.delcurNum9 = postDelData.APPLICATION.RULES[9].curNum;
	}
	if(delruleNum>10){
		data.delFlag10 = "Delete";
		data.deldirName10 = postDelData.APPLICATION.RULES[10].dirName;
		data.delcurNum10 = postDelData.APPLICATION.RULES[10].curNum;
	}
	if(delruleNum>11){
		data.delFlag11 = "Delete";
		data.deldirName11 = postDelData.APPLICATION.RULES[11].dirName;
		data.delcurNum11 = postDelData.APPLICATION.RULES[11].curNum;
	}
	if(delruleNum>12){
		data.delFlag12 = "Delete";
		data.deldirName12 = postDelData.APPLICATION.RULES[12].dirName;
		data.delcurNum12 = postDelData.APPLICATION.RULES[12].curNum;
	}
	if(delruleNum>13){
		data.delFlag13 = "Delete";
		data.deldirName13 = postDelData.APPLICATION.RULES[13].dirName;
		data.delcurNum13 = postDelData.APPLICATION.RULES[13].curNum;
	}
	if(delruleNum>14){
		data.delFlag14 = "Delete";
		data.deldirName14 = postDelData.APPLICATION.RULES[14].dirName;
		data.delcurNum14 = postDelData.APPLICATION.RULES[14].curNum;
	}
	if(delruleNum>15){
		data.delFlag15 = "Delete";
		data.deldirName15 = postDelData.APPLICATION.RULES[15].dirName;
		data.delcurNum15 = postDelData.APPLICATION.RULES[15].curNum;
	}
	if(delruleNum>16){
		data.delFlag16 = "Delete";
		data.deldirName16 = postDelData.APPLICATION.RULES[16].dirName;
		data.delcurNum16 = postDelData.APPLICATION.RULES[16].curNum;
	}
	if(delruleNum>17){
		data.delFlag17 = "Delete";
		data.deldirName17 = postDelData.APPLICATION.RULES[17].dirName;
		data.delcurNum17 = postDelData.APPLICATION.RULES[17].curNum;
	}
	if(delruleNum>18){
		data.delFlag18 = "Delete";
		data.deldirName18 = postDelData.APPLICATION.RULES[18].dirName;
		data.delcurNum18 = postDelData.APPLICATION.RULES[18].curNum;
	}
	if(delruleNum>19){
		data.delFlag19 = "Delete";
		data.deldirName19 = postDelData.APPLICATION.RULES[19].dirName;
		data.delcurNum19 = postDelData.APPLICATION.RULES[19].curNum;
	}
	if(delruleNum>20){
		data.delFlag20 = "Delete";
		data.deldirName20 = postDelData.APPLICATION.RULES[20].dirName;
		data.delcurNum20 = postDelData.APPLICATION.RULES[20].curNum;
	}
	if(delruleNum>21){
		data.delFlag21 = "Delete";
		data.deldirName21 = postDelData.APPLICATION.RULES[21].dirName;
		data.delcurNum21 = postDelData.APPLICATION.RULES[21].curNum;
	}
	if(delruleNum>22){
		data.delFlag22 = "Delete";
		data.deldirName22 = postDelData.APPLICATION.RULES[22].dirName;
		data.delcurNum22 = postDelData.APPLICATION.RULES[22].curNum;
	}
	if(delruleNum>23){
		data.delFlag23 = "Delete";
		data.deldirName23 = postDelData.APPLICATION.RULES[23].dirName;
		data.delcurNum23 = postDelData.APPLICATION.RULES[23].curNum;
	}
	if(delruleNum>24){
		data.delFlag24 = "Delete";
		data.deldirName24 = postDelData.APPLICATION.RULES[24].dirName;
		data.delcurNum24 = postDelData.APPLICATION.RULES[24].curNum;
	}
	if(delruleNum>25){
		data.delFlag25 = "Delete";
		data.deldirName25 = postDelData.APPLICATION.RULES[25].dirName;
		data.delcurNum25 = postDelData.APPLICATION.RULES[25].curNum;
	}
	if(delruleNum>26){
		data.delFlag26 = "Delete";
		data.deldirName26 = postDelData.APPLICATION.RULES[26].dirName;
		data.delcurNum26 = postDelData.APPLICATION.RULES[26].curNum;
	}
	if(delruleNum>27){
		data.delFlag27 = "Delete";
		data.deldirName27 = postDelData.APPLICATION.RULES[27].dirName;
		data.delcurNum27 = postDelData.APPLICATION.RULES[27].curNum;
	}
	if(delruleNum>28){
		data.delFlag28 = "Delete";
		data.deldirName28 = postDelData.APPLICATION.RULES[28].dirName;
		data.delcurNum28 = postDelData.APPLICATION.RULES[28].curNum;
	}
	if(delruleNum>29){
		data.delFlag29 = "Delete";
		data.deldirName29 = postDelData.APPLICATION.RULES[29].dirName;
		data.delcurNum29 = postDelData.APPLICATION.RULES[29].curNum;
	}
	if(delruleNum>30){
		data.delFlag30 = "Delete";
		data.deldirName30 = postDelData.APPLICATION.RULES[30].dirName;
		data.delcurNum30 = postDelData.APPLICATION.RULES[30].curNum;
	}
	if(delruleNum>31){
		data.delFlag31 = "Delete";
		data.deldirName31 = postDelData.APPLICATION.RULES[31].dirName;
		data.delcurNum31 = postDelData.APPLICATION.RULES[31].curNum;
	}
	
	//#####################end delete
	
	//#####################start add or edit
	if(ruleNum>0){
		if(postData.APPLICATION.RULES[0].idRule != "-1"){
			data.submitValue0 = "Edit";
			data.curNum0 = postData.APPLICATION.RULES[0].idRule;
			if(postData.APPLICATION.RULES[0].direction == "In"){
				data.dirName0 = postData.APPLICATION.RULES[0].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[0].direction == "Out"){
				data.dirName0 = postData.APPLICATION.RULES[0].interface+"O6";
			}
			data.srcaddr0 = postData.APPLICATION.RULES[0].srcaddr;
			data.dstaddr0 = postData.APPLICATION.RULES[0].dstaddr;
			data.protocol0 = postData.APPLICATION.RULES[0].protocol;
			data.startWan0 = postData.APPLICATION.RULES[0].startWan;
			data.endWan0 = postData.APPLICATION.RULES[0].endWan;
			data.startLan0 = postData.APPLICATION.RULES[0].startLan;
			data.endLan0 = postData.APPLICATION.RULES[0].endLan;
			data.action0 = postData.APPLICATION.RULES[0].action;
		}
		else{
			if(postData.APPLICATION.RULES[0].firadd){
				data.firadd0 = "Yes";
				data.firNum0 = postData.APPLICATION.RULES[0].pvcid+1;
				data.fwtotNum0 = 0;
				data.fwdirName0 = postData.APPLICATION.RULES[0].direction;
				data.fwintfName0 = postData.APPLICATION.RULES[0].interface;
			}
			else{
				data.firadd0 = "No";
			}
			data.submitValue0 = "Add";
			data.action0 = postData.APPLICATION.RULES[0].action;
			data.ruleNum0 = postData.APPLICATION.RULES[0].totNum;
			data.totNum0 = postData.APPLICATION.RULES[0].totNum-1;
		//	data.ipType0 = postData.APPLICATION.RULES[0].ipType;
			data.curNum0 = postData.APPLICATION.RULES[0].idRule;
			if(postData.APPLICATION.RULES[0].direction == "In"){
				data.dirName0 = postData.APPLICATION.RULES[0].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[0].direction == "Out"){
				data.dirName0 = postData.APPLICATION.RULES[0].interface+"O6";
			}
			data.srcaddr0 =  postData.APPLICATION.RULES[0].srcaddr;
			data.dstaddr0 = postData.APPLICATION.RULES[0].dstaddr;
			data.protocol0 = postData.APPLICATION.RULES[0].protocol;
			data.startWan0 = postData.APPLICATION.RULES[0].startWan;
			data.endWan0 = postData.APPLICATION.RULES[0].endWan;
			data.startLan0 = postData.APPLICATION.RULES[0].startLan;
			data.endLan0 = postData.APPLICATION.RULES[0].endLan;
			data.pvcid0 = postData.APPLICATION.RULES[0].pvcid;
		}
	}
	else{
		data.submitValue0 = "None";
	}
	if(ruleNum>1){
		if(postData.APPLICATION.RULES[1].idRule != "-1"){
			data.submitValue1 = "Edit";
			data.curNum1 = postData.APPLICATION.RULES[1].idRule;
			if(postData.APPLICATION.RULES[1].direction == "In"){
				data.dirName1 = postData.APPLICATION.RULES[1].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[1].direction == "Out"){
				data.dirName1 = postData.APPLICATION.RULES[1].interface+"O6";
			}
			data.srcaddr1 = postData.APPLICATION.RULES[1].srcaddr;
			data.dstaddr1 = postData.APPLICATION.RULES[1].dstaddr;
			data.protocol1 = postData.APPLICATION.RULES[1].protocol;
			data.startWan1 = postData.APPLICATION.RULES[1].startWan;
			data.endWan1 = postData.APPLICATION.RULES[1].endWan;
			data.startLan1 = postData.APPLICATION.RULES[1].startLan;
			data.endLan1 = postData.APPLICATION.RULES[1].endLan;
			data.action1 = postData.APPLICATION.RULES[1].action;
		}
		else{
			if(postData.APPLICATION.RULES[1].firadd){
				data.firadd1 = "Yes";
				data.firNum1 = postData.APPLICATION.RULES[1].pvcid+1;
				data.fwtotNum1 = 0;
				data.fwdirName1 = postData.APPLICATION.RULES[1].direction;
				data.fwintfName1 = postData.APPLICATION.RULES[1].interface;
			}
			else{
				data.firadd1 = "No";
			}
			data.submitValue1 = "Add";
			data.action1 = postData.APPLICATION.RULES[1].action;
			data.ruleNum1 = postData.APPLICATION.RULES[1].totNum;
			data.totNum1 = postData.APPLICATION.RULES[1].totNum-1;
		//	data.ipType1 = postData.APPLICATION.RULES[1].ipType;
			data.curNum1 = postData.APPLICATION.RULES[1].idRule;
			if(postData.APPLICATION.RULES[1].direction == "In"){
				data.dirName1 = postData.APPLICATION.RULES[1].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[1].direction == "Out"){
				data.dirName1 = postData.APPLICATION.RULES[1].interface+"O6";
			}
			data.srcaddr1 =  postData.APPLICATION.RULES[1].srcaddr;
			data.dstaddr1 = postData.APPLICATION.RULES[1].dstaddr;
			data.protocol1 = postData.APPLICATION.RULES[1].protocol;
			data.startWan1 = postData.APPLICATION.RULES[1].startWan;
			data.endWan1 = postData.APPLICATION.RULES[1].endWan;
			data.startLan1 = postData.APPLICATION.RULES[1].startLan;
			data.endLan1 = postData.APPLICATION.RULES[1].endLan;
			data.pvcid1 = postData.APPLICATION.RULES[1].pvcid;
		}
	}
	else{
		data.submitValue1 = "None";
	}
	if(ruleNum>2){
		if(postData.APPLICATION.RULES[2].idRule != "-1"){
			data.submitValue2 = "Edit";
			data.curNum2 = postData.APPLICATION.RULES[2].idRule;
			if(postData.APPLICATION.RULES[2].direction == "In"){
				data.dirName2 = postData.APPLICATION.RULES[2].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[2].direction == "Out"){
				data.dirName2 = postData.APPLICATION.RULES[2].interface+"O6";
			}
			data.srcaddr2 = postData.APPLICATION.RULES[2].srcaddr;
			data.dstaddr2 = postData.APPLICATION.RULES[2].dstaddr;
			data.protocol2 = postData.APPLICATION.RULES[2].protocol;
			data.startWan2 = postData.APPLICATION.RULES[2].startWan;
			data.endWan2 = postData.APPLICATION.RULES[2].endWan;
			data.startLan2 = postData.APPLICATION.RULES[2].startLan;
			data.endLan2 = postData.APPLICATION.RULES[2].endLan;
			data.action2 = postData.APPLICATION.RULES[2].action;
		}
		else{
			if(postData.APPLICATION.RULES[2].firadd){
				data.firadd2 = "Yes";
				data.firNum2 = postData.APPLICATION.RULES[2].pvcid+1;
				data.fwtotNum2 = 0;
				data.fwdirName2 = postData.APPLICATION.RULES[2].direction;
				data.fwintfName2 = postData.APPLICATION.RULES[2].interface;
			}
			else{
				data.firadd2 = "No";
			}
			data.submitValue2 = "Add";
			data.action2 = postData.APPLICATION.RULES[2].action;
			data.ruleNum2 = postData.APPLICATION.RULES[2].totNum;
			data.totNum2 = postData.APPLICATION.RULES[2].totNum-1;
		//	data.ipType2 = postData.APPLICATION.RULES[2].ipType;
			data.curNum2 = postData.APPLICATION.RULES[2].idRule;
			if(postData.APPLICATION.RULES[2].direction == "In"){
				data.dirName2 = postData.APPLICATION.RULES[2].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[2].direction == "Out"){
				data.dirName2 = postData.APPLICATION.RULES[2].interface+"O6";
			}
			data.srcaddr2 =  postData.APPLICATION.RULES[2].srcaddr;
			data.dstaddr2 = postData.APPLICATION.RULES[2].dstaddr;
			data.protocol2 = postData.APPLICATION.RULES[2].protocol;
			data.startWan2 = postData.APPLICATION.RULES[2].startWan;
			data.endWan2 = postData.APPLICATION.RULES[2].endWan;
			data.startLan2 = postData.APPLICATION.RULES[2].startLan;
			data.endLan2 = postData.APPLICATION.RULES[2].endLan;
			data.pvcid2 = postData.APPLICATION.RULES[2].pvcid;
		}
	}
	else{
		data.submitValue2 = "None";
	}
	if(ruleNum>3){
		if(postData.APPLICATION.RULES[3].idRule != "-1"){
			data.submitValue3 = "Edit";
			data.curNum3 = postData.APPLICATION.RULES[3].idRule;
			if(postData.APPLICATION.RULES[3].direction == "In"){
				data.dirName3 = postData.APPLICATION.RULES[3].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[3].direction == "Out"){
				data.dirName3 = postData.APPLICATION.RULES[3].interface+"O6";
			}
			data.srcaddr3 = postData.APPLICATION.RULES[3].srcaddr;
			data.dstaddr3 = postData.APPLICATION.RULES[3].dstaddr;
			data.protocol3 = postData.APPLICATION.RULES[3].protocol;
			data.startWan3 = postData.APPLICATION.RULES[3].startWan;
			data.endWan3 = postData.APPLICATION.RULES[3].endWan;
			data.startLan3 = postData.APPLICATION.RULES[3].startLan;
			data.endLan3 = postData.APPLICATION.RULES[3].endLan;
			data.action3 = postData.APPLICATION.RULES[3].action;
		}
		else{
			if(postData.APPLICATION.RULES[3].firadd){
				data.firadd3 = "Yes";
				data.firNum3 = postData.APPLICATION.RULES[3].pvcid+1;
				data.fwtotNum3 = 0;
				data.fwdirName3 = postData.APPLICATION.RULES[3].direction;
				data.fwintfName3 = postData.APPLICATION.RULES[3].interface;
			}
			else{
				data.firadd3 = "No";
			}
			data.submitValue3 = "Add";
			data.action3 = postData.APPLICATION.RULES[3].action;
			data.ruleNum3 = postData.APPLICATION.RULES[3].totNum;
			data.totNum3 = postData.APPLICATION.RULES[3].totNum-1;
		//	data.ipType3 = postData.APPLICATION.RULES[3].ipType;
			data.curNum3 = postData.APPLICATION.RULES[3].idRule;
			if(postData.APPLICATION.RULES[3].direction == "In"){
				data.dirName3 = postData.APPLICATION.RULES[3].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[3].direction == "Out"){
				data.dirName3 = postData.APPLICATION.RULES[3].interface+"O6";
			}
			data.srcaddr3 =  postData.APPLICATION.RULES[3].srcaddr;
			data.dstaddr3 = postData.APPLICATION.RULES[3].dstaddr;
			data.protocol3 = postData.APPLICATION.RULES[3].protocol;
			data.startWan3 = postData.APPLICATION.RULES[3].startWan;
			data.endWan3 = postData.APPLICATION.RULES[3].endWan;
			data.startLan3 = postData.APPLICATION.RULES[3].startLan;
			data.endLan3 = postData.APPLICATION.RULES[3].endLan;
			data.pvcid3 = postData.APPLICATION.RULES[3].pvcid;
		}
	}
	else{
		data.submitValue3 = "None";
	}
	if(ruleNum>4){
		if(postData.APPLICATION.RULES[4].idRule != "-1"){
			data.submitValue4 = "Edit";
			data.curNum4 = postData.APPLICATION.RULES[4].idRule;
			if(postData.APPLICATION.RULES[4].direction == "In"){
				data.dirName4 = postData.APPLICATION.RULES[4].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[4].direction == "Out"){
				data.dirName4 = postData.APPLICATION.RULES[4].interface+"O6";
			}
			data.srcaddr4 = postData.APPLICATION.RULES[4].srcaddr;
			data.dstaddr4 = postData.APPLICATION.RULES[4].dstaddr;
			data.protocol4 = postData.APPLICATION.RULES[4].protocol;
			data.startWan4 = postData.APPLICATION.RULES[4].startWan;
			data.endWan4 = postData.APPLICATION.RULES[4].endWan;
			data.startLan4 = postData.APPLICATION.RULES[4].startLan;
			data.endLan4 = postData.APPLICATION.RULES[4].endLan;
			data.action4 = postData.APPLICATION.RULES[4].action;
		}
		else{
			if(postData.APPLICATION.RULES[4].firadd){
				data.firadd4 = "Yes";
				data.firNum4 = postData.APPLICATION.RULES[4].pvcid+1;
				data.fwtotNum4 = 0;
				data.fwdirName4 = postData.APPLICATION.RULES[4].direction;
				data.fwintfName4 = postData.APPLICATION.RULES[4].interface;
			}
			else{
				data.firadd4 = "No";
			}
			data.submitValue4 = "Add";
			data.action4 = postData.APPLICATION.RULES[4].action;
			data.ruleNum4 = postData.APPLICATION.RULES[4].totNum;
			data.totNum4 = postData.APPLICATION.RULES[4].totNum-1;
		//	data.ipType4 = postData.APPLICATION.RULES[4].ipType;
			data.curNum4 = postData.APPLICATION.RULES[4].idRule;
			if(postData.APPLICATION.RULES[4].direction == "In"){
				data.dirName4 = postData.APPLICATION.RULES[4].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[4].direction == "Out"){
				data.dirName4 = postData.APPLICATION.RULES[4].interface+"O6";
			}
			data.srcaddr4 =  postData.APPLICATION.RULES[4].srcaddr;
			data.dstaddr4 = postData.APPLICATION.RULES[4].dstaddr;
			data.protocol4 = postData.APPLICATION.RULES[4].protocol;
			data.startWan4 = postData.APPLICATION.RULES[4].startWan;
			data.endWan4 = postData.APPLICATION.RULES[4].endWan;
			data.startLan4 = postData.APPLICATION.RULES[4].startLan;
			data.endLan4 = postData.APPLICATION.RULES[4].endLan;
			data.pvcid4 = postData.APPLICATION.RULES[4].pvcid;
		}
	}
	else{
		data.submitValue4 = "None";
	}
	if(ruleNum>5){
		if(postData.APPLICATION.RULES[5].idRule != "-1"){
			data.submitValue5 = "Edit";
			data.curNum5 = postData.APPLICATION.RULES[5].idRule;
			if(postData.APPLICATION.RULES[5].direction == "In"){
				data.dirName5 = postData.APPLICATION.RULES[5].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[5].direction == "Out"){
				data.dirName5 = postData.APPLICATION.RULES[5].interface+"O6";
			}
			data.srcaddr5 = postData.APPLICATION.RULES[5].srcaddr;
			data.dstaddr5 = postData.APPLICATION.RULES[5].dstaddr;
			data.protocol5 = postData.APPLICATION.RULES[5].protocol;
			data.startWan5 = postData.APPLICATION.RULES[5].startWan;
			data.endWan5 = postData.APPLICATION.RULES[5].endWan;
			data.startLan5 = postData.APPLICATION.RULES[5].startLan;
			data.endLan5 = postData.APPLICATION.RULES[5].endLan;
			data.action5 = postData.APPLICATION.RULES[5].action;
		}
		else{
			if(postData.APPLICATION.RULES[5].firadd){
				data.firadd5 = "Yes";
				data.firNum5 = postData.APPLICATION.RULES[5].pvcid+1;
				data.fwtotNum5 = 0;
				data.fwdirName5 = postData.APPLICATION.RULES[5].direction;
				data.fwintfName5 = postData.APPLICATION.RULES[5].interface;
			}
			else{
				data.firadd5 = "No";
			}
			data.submitValue5 = "Add";
			data.action5 = postData.APPLICATION.RULES[5].action;
			data.ruleNum5 = postData.APPLICATION.RULES[5].totNum;
			data.totNum5 = postData.APPLICATION.RULES[5].totNum-1;
		//	data.ipType5 = postData.APPLICATION.RULES[5].ipType;
			data.curNum5 = postData.APPLICATION.RULES[5].idRule;
			if(postData.APPLICATION.RULES[5].direction == "In"){
				data.dirName5 = postData.APPLICATION.RULES[5].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[5].direction == "Out"){
				data.dirName5 = postData.APPLICATION.RULES[5].interface+"O6";
			}
			data.srcaddr5 =  postData.APPLICATION.RULES[5].srcaddr;
			data.dstaddr5 = postData.APPLICATION.RULES[5].dstaddr;
			data.protocol5 = postData.APPLICATION.RULES[5].protocol;
			data.startWan5 = postData.APPLICATION.RULES[5].startWan;
			data.endWan5 = postData.APPLICATION.RULES[5].endWan;
			data.startLan5 = postData.APPLICATION.RULES[5].startLan;
			data.endLan5 = postData.APPLICATION.RULES[5].endLan;
			data.pvcid5 = postData.APPLICATION.RULES[5].pvcid;
		}
	}
	else{
		data.submitValue5 = "None";
	}
	if(ruleNum>6){
		if(postData.APPLICATION.RULES[6].idRule != "-1"){
			data.submitValue6 = "Edit";
			data.curNum6 = postData.APPLICATION.RULES[6].idRule;
			if(postData.APPLICATION.RULES[6].direction == "In"){
				data.dirName6 = postData.APPLICATION.RULES[6].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[6].direction == "Out"){
				data.dirName6 = postData.APPLICATION.RULES[6].interface+"O6";
			}
			data.srcaddr6 = postData.APPLICATION.RULES[6].srcaddr;
			data.dstaddr6 = postData.APPLICATION.RULES[6].dstaddr;
			data.protocol6 = postData.APPLICATION.RULES[6].protocol;
			data.startWan6 = postData.APPLICATION.RULES[6].startWan;
			data.endWan6 = postData.APPLICATION.RULES[6].endWan;
			data.startLan6 = postData.APPLICATION.RULES[6].startLan;
			data.endLan6 = postData.APPLICATION.RULES[6].endLan;
			data.action6 = postData.APPLICATION.RULES[6].action;
		}
		else{
			if(postData.APPLICATION.RULES[6].firadd){
				data.firadd6 = "Yes";
				data.firNum6 = postData.APPLICATION.RULES[6].pvcid+1;
				data.fwtotNum6 = 0;
				data.fwdirName6 = postData.APPLICATION.RULES[6].direction;
				data.fwintfName6 = postData.APPLICATION.RULES[6].interface;
			}
			else{
				data.firadd6 = "No";
			}
			data.submitValue6 = "Add";
			data.action6 = postData.APPLICATION.RULES[6].action;
			data.ruleNum6 = postData.APPLICATION.RULES[6].totNum;
			data.totNum6 = postData.APPLICATION.RULES[6].totNum-1;
		//	data.ipType6 = postData.APPLICATION.RULES[6].ipType;
			data.curNum6 = postData.APPLICATION.RULES[6].idRule;
			if(postData.APPLICATION.RULES[6].direction == "In"){
				data.dirName6 = postData.APPLICATION.RULES[6].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[6].direction == "Out"){
				data.dirName6 = postData.APPLICATION.RULES[6].interface+"O6";
			}
			data.srcaddr6 =  postData.APPLICATION.RULES[6].srcaddr;
			data.dstaddr6 = postData.APPLICATION.RULES[6].dstaddr;
			data.protocol6 = postData.APPLICATION.RULES[6].protocol;
			data.startWan6 = postData.APPLICATION.RULES[6].startWan;
			data.endWan6 = postData.APPLICATION.RULES[6].endWan;
			data.startLan6 = postData.APPLICATION.RULES[6].startLan;
			data.endLan6 = postData.APPLICATION.RULES[6].endLan;
			data.pvcid6 = postData.APPLICATION.RULES[6].pvcid;
		}
	}
	else{
		data.submitValue6 = "None";
	}
	if(ruleNum>7){
		if(postData.APPLICATION.RULES[7].idRule != "-1"){
			data.submitValue7 = "Edit";
			data.curNum7 = postData.APPLICATION.RULES[7].idRule;
			if(postData.APPLICATION.RULES[7].direction == "In"){
				data.dirName7 = postData.APPLICATION.RULES[7].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[7].direction == "Out"){
				data.dirName7 = postData.APPLICATION.RULES[7].interface+"O6";
			}
			data.srcaddr7 = postData.APPLICATION.RULES[7].srcaddr;
			data.dstaddr7 = postData.APPLICATION.RULES[7].dstaddr;
			data.protocol7 = postData.APPLICATION.RULES[7].protocol;
			data.startWan7 = postData.APPLICATION.RULES[7].startWan;
			data.endWan7 = postData.APPLICATION.RULES[7].endWan;
			data.startLan7 = postData.APPLICATION.RULES[7].startLan;
			data.endLan7 = postData.APPLICATION.RULES[7].endLan;
			data.action7 = postData.APPLICATION.RULES[7].action;
		}
		else{
			if(postData.APPLICATION.RULES[7].firadd){
				data.firadd7 = "Yes";
				data.firNum7 = postData.APPLICATION.RULES[7].pvcid+1;
				data.fwtotNum7 = 0;
				data.fwdirName7 = postData.APPLICATION.RULES[7].direction;
				data.fwintfName7 = postData.APPLICATION.RULES[7].interface;
			}
			else{
				data.firadd7 = "No";
			}
			data.submitValue7 = "Add";
			data.action7 = postData.APPLICATION.RULES[7].action;
			data.ruleNum7 = postData.APPLICATION.RULES[7].totNum;
			data.totNum7 = postData.APPLICATION.RULES[7].totNum-1;
		//	data.ipType7 = postData.APPLICATION.RULES[7].ipType;
			data.curNum7 = postData.APPLICATION.RULES[7].idRule;
			if(postData.APPLICATION.RULES[7].direction == "In"){
				data.dirName7 = postData.APPLICATION.RULES[7].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[7].direction == "Out"){
				data.dirName7 = postData.APPLICATION.RULES[7].interface+"O6";
			}
			data.srcaddr7 =  postData.APPLICATION.RULES[7].srcaddr;
			data.dstaddr7 = postData.APPLICATION.RULES[7].dstaddr;
			data.protocol7 = postData.APPLICATION.RULES[7].protocol;
			data.startWan7 = postData.APPLICATION.RULES[7].startWan;
			data.endWan7 = postData.APPLICATION.RULES[7].endWan;
			data.startLan7 = postData.APPLICATION.RULES[7].startLan;
			data.endLan7 = postData.APPLICATION.RULES[7].endLan;
			data.pvcid7 = postData.APPLICATION.RULES[7].pvcid;
		}
	}
	else{
		data.submitValue7 = "None";
	}
	if(ruleNum>8){
		if(postData.APPLICATION.RULES[8].idRule != "-1"){
			data.submitValue8 = "Edit";
			data.curNum8 = postData.APPLICATION.RULES[8].idRule;
			if(postData.APPLICATION.RULES[8].direction == "In"){
				data.dirName8 = postData.APPLICATION.RULES[8].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[8].direction == "Out"){
				data.dirName8 = postData.APPLICATION.RULES[8].interface+"O6";
			}
			data.srcaddr8 = postData.APPLICATION.RULES[8].srcaddr;
			data.dstaddr8 = postData.APPLICATION.RULES[8].dstaddr;
			data.protocol8 = postData.APPLICATION.RULES[8].protocol;
			data.startWan8 = postData.APPLICATION.RULES[8].startWan;
			data.endWan8 = postData.APPLICATION.RULES[8].endWan;
			data.startLan8 = postData.APPLICATION.RULES[8].startLan;
			data.endLan8 = postData.APPLICATION.RULES[8].endLan;
			data.action8 = postData.APPLICATION.RULES[8].action;
		}
		else{
			if(postData.APPLICATION.RULES[8].firadd){
				data.firadd8 = "Yes";
				data.firNum8 = postData.APPLICATION.RULES[8].pvcid+1;
				data.fwtotNum8 = 0;
				data.fwdirName8 = postData.APPLICATION.RULES[8].direction;
				data.fwintfName8 = postData.APPLICATION.RULES[8].interface;
			}
			else{
				data.firadd8 = "No";
			}
			data.submitValue8 = "Add";
			data.action8 = postData.APPLICATION.RULES[8].action;
			data.ruleNum8 = postData.APPLICATION.RULES[8].totNum;
			data.totNum8 = postData.APPLICATION.RULES[8].totNum-1;
		//	data.ipType8 = postData.APPLICATION.RULES[8].ipType;
			data.curNum8 = postData.APPLICATION.RULES[8].idRule;
			if(postData.APPLICATION.RULES[8].direction == "In"){
				data.dirName8 = postData.APPLICATION.RULES[8].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[8].direction == "Out"){
				data.dirName8 = postData.APPLICATION.RULES[8].interface+"O6";
			}
			data.srcaddr8 =  postData.APPLICATION.RULES[8].srcaddr;
			data.dstaddr8 = postData.APPLICATION.RULES[8].dstaddr;
			data.protocol8 = postData.APPLICATION.RULES[8].protocol;
			data.startWan8 = postData.APPLICATION.RULES[8].startWan;
			data.endWan8 = postData.APPLICATION.RULES[8].endWan;
			data.startLan8 = postData.APPLICATION.RULES[8].startLan;
			data.endLan8 = postData.APPLICATION.RULES[8].endLan;
			data.pvcid8 = postData.APPLICATION.RULES[8].pvcid;
		}
	}
	else{
		data.submitValue8 = "None";
	}
	if(ruleNum>9){
		if(postData.APPLICATION.RULES[9].idRule != "-1"){
			data.submitValue9 = "Edit";
			data.curNum9 = postData.APPLICATION.RULES[9].idRule;
			if(postData.APPLICATION.RULES[9].direction == "In"){
				data.dirName9 = postData.APPLICATION.RULES[9].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[9].direction == "Out"){
				data.dirName9 = postData.APPLICATION.RULES[9].interface+"O6";
			}
			data.srcaddr9 = postData.APPLICATION.RULES[9].srcaddr;
			data.dstaddr9 = postData.APPLICATION.RULES[9].dstaddr;
			data.protocol9 = postData.APPLICATION.RULES[9].protocol;
			data.startWan9 = postData.APPLICATION.RULES[9].startWan;
			data.endWan9 = postData.APPLICATION.RULES[9].endWan;
			data.startLan9 = postData.APPLICATION.RULES[9].startLan;
			data.endLan9 = postData.APPLICATION.RULES[9].endLan;
			data.action9 = postData.APPLICATION.RULES[9].action;
		}
		else{
			if(postData.APPLICATION.RULES[9].firadd){
				data.firadd9 = "Yes";
				data.firNum9 = postData.APPLICATION.RULES[9].pvcid+1;
				data.fwtotNum9 = 0;
				data.fwdirName9 = postData.APPLICATION.RULES[9].direction;
				data.fwintfName9 = postData.APPLICATION.RULES[9].interface;
			}
			else{
				data.firadd9 = "No";
			}
			data.submitValue9 = "Add";
			data.action9 = postData.APPLICATION.RULES[9].action;
			data.ruleNum9 = postData.APPLICATION.RULES[9].totNum;
			data.totNum9 = postData.APPLICATION.RULES[9].totNum-1;
		//	data.ipType9 = postData.APPLICATION.RULES[9].ipType;
			data.curNum9 = postData.APPLICATION.RULES[9].idRule;
			if(postData.APPLICATION.RULES[9].direction == "In"){
				data.dirName9 = postData.APPLICATION.RULES[9].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[9].direction == "Out"){
				data.dirName9 = postData.APPLICATION.RULES[9].interface+"O6";
			}
			data.srcaddr9 =  postData.APPLICATION.RULES[9].srcaddr;
			data.dstaddr9 = postData.APPLICATION.RULES[9].dstaddr;
			data.protocol9 = postData.APPLICATION.RULES[9].protocol;
			data.startWan9 = postData.APPLICATION.RULES[9].startWan;
			data.endWan9 = postData.APPLICATION.RULES[9].endWan;
			data.startLan9 = postData.APPLICATION.RULES[9].startLan;
			data.endLan9 = postData.APPLICATION.RULES[9].endLan;
			data.pvcid9 = postData.APPLICATION.RULES[9].pvcid;
		}
	}
	else{
		data.submitValue9 = "None";
	}
	if(ruleNum>10){
		if(postData.APPLICATION.RULES[10].idRule != "-1"){
			data.submitValue10 = "Edit";
			data.curNum10 = postData.APPLICATION.RULES[10].idRule;
			if(postData.APPLICATION.RULES[10].direction == "In"){
				data.dirName10 = postData.APPLICATION.RULES[10].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[10].direction == "Out"){
				data.dirName10 = postData.APPLICATION.RULES[10].interface+"O6";
			}
			data.srcaddr10 = postData.APPLICATION.RULES[10].srcaddr;
			data.dstaddr10 = postData.APPLICATION.RULES[10].dstaddr;
			data.protocol10 = postData.APPLICATION.RULES[10].protocol;
			data.startWan10 = postData.APPLICATION.RULES[10].startWan;
			data.endWan10 = postData.APPLICATION.RULES[10].endWan;
			data.startLan10 = postData.APPLICATION.RULES[10].startLan;
			data.endLan10 = postData.APPLICATION.RULES[10].endLan;
			data.action10 = postData.APPLICATION.RULES[10].action;
		}
		else{
			if(postData.APPLICATION.RULES[10].firadd){
				data.firadd10 = "Yes";
				data.firNum10 = postData.APPLICATION.RULES[10].pvcid+1;
				data.fwtotNum10 = 0;
				data.fwdirName10 = postData.APPLICATION.RULES[10].direction;
				data.fwintfName10 = postData.APPLICATION.RULES[10].interface;
			}
			else{
				data.firadd10 = "No";
			}
			data.submitValue10 = "Add";
			data.action10 = postData.APPLICATION.RULES[10].action;
			data.ruleNum10 = postData.APPLICATION.RULES[10].totNum;
			data.totNum10 = postData.APPLICATION.RULES[10].totNum-1;
		//	data.ipType10 = postData.APPLICATION.RULES[10].ipType;
			data.curNum10 = postData.APPLICATION.RULES[10].idRule;
			if(postData.APPLICATION.RULES[10].direction == "In"){
				data.dirName10 = postData.APPLICATION.RULES[10].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[10].direction == "Out"){
				data.dirName10 = postData.APPLICATION.RULES[10].interface+"O6";
			}
			data.srcaddr10 =  postData.APPLICATION.RULES[10].srcaddr;
			data.dstaddr10 = postData.APPLICATION.RULES[10].dstaddr;
			data.protocol10 = postData.APPLICATION.RULES[10].protocol;
			data.startWan10 = postData.APPLICATION.RULES[10].startWan;
			data.endWan10 = postData.APPLICATION.RULES[10].endWan;
			data.startLan10 = postData.APPLICATION.RULES[10].startLan;
			data.endLan10 = postData.APPLICATION.RULES[10].endLan;
			data.pvcid10 = postData.APPLICATION.RULES[10].pvcid;
		}
	}
	else{
		data.submitValue10 = "None";
	}
	if(ruleNum>11){
		if(postData.APPLICATION.RULES[11].idRule != "-1"){
			data.submitValue11 = "Edit";
			data.curNum11 = postData.APPLICATION.RULES[11].idRule;
			if(postData.APPLICATION.RULES[11].direction == "In"){
				data.dirName11 = postData.APPLICATION.RULES[11].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[11].direction == "Out"){
				data.dirName11 = postData.APPLICATION.RULES[11].interface+"O6";
			}
			data.srcaddr11 = postData.APPLICATION.RULES[11].srcaddr;
			data.dstaddr11 = postData.APPLICATION.RULES[11].dstaddr;
			data.protocol11 = postData.APPLICATION.RULES[11].protocol;
			data.startWan11 = postData.APPLICATION.RULES[11].startWan;
			data.endWan11 = postData.APPLICATION.RULES[11].endWan;
			data.startLan11 = postData.APPLICATION.RULES[11].startLan;
			data.endLan11 = postData.APPLICATION.RULES[11].endLan;
			data.action11 = postData.APPLICATION.RULES[11].action;
		}
		else{
			if(postData.APPLICATION.RULES[11].firadd){
				data.firadd11 = "Yes";
				data.firNum11 = postData.APPLICATION.RULES[11].pvcid+1;
				data.fwtotNum11 = 0;
				data.fwdirName11 = postData.APPLICATION.RULES[11].direction;
				data.fwintfName11 = postData.APPLICATION.RULES[11].interface;
			}
			else{
				data.firadd11 = "No";
			}
			data.submitValue11 = "Add";
			data.action11 = postData.APPLICATION.RULES[11].action;
			data.ruleNum11 = postData.APPLICATION.RULES[11].totNum;
			data.totNum11 = postData.APPLICATION.RULES[11].totNum-1;
		//	data.ipType11 = postData.APPLICATION.RULES[11].ipType;
			data.curNum11 = postData.APPLICATION.RULES[11].idRule;
			if(postData.APPLICATION.RULES[11].direction == "In"){
				data.dirName11 = postData.APPLICATION.RULES[11].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[11].direction == "Out"){
				data.dirName11 = postData.APPLICATION.RULES[11].interface+"O6";
			}
			data.srcaddr11 =  postData.APPLICATION.RULES[11].srcaddr;
			data.dstaddr11 = postData.APPLICATION.RULES[11].dstaddr;
			data.protocol11 = postData.APPLICATION.RULES[11].protocol;
			data.startWan11 = postData.APPLICATION.RULES[11].startWan;
			data.endWan11 = postData.APPLICATION.RULES[11].endWan;
			data.startLan11 = postData.APPLICATION.RULES[11].startLan;
			data.endLan11 = postData.APPLICATION.RULES[11].endLan;
			data.pvcid11 = postData.APPLICATION.RULES[11].pvcid;
		}
	}
	else{
		data.submitValue11 = "None";
	}
	if(ruleNum>12){
		if(postData.APPLICATION.RULES[12].idRule != "-1"){
			data.submitValue12 = "Edit";
			data.curNum12 = postData.APPLICATION.RULES[12].idRule;
			if(postData.APPLICATION.RULES[12].direction == "In"){
				data.dirName12 = postData.APPLICATION.RULES[12].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[12].direction == "Out"){
				data.dirName12 = postData.APPLICATION.RULES[12].interface+"O6";
			}
			data.srcaddr12 = postData.APPLICATION.RULES[12].srcaddr;
			data.dstaddr12 = postData.APPLICATION.RULES[12].dstaddr;
			data.protocol12 = postData.APPLICATION.RULES[12].protocol;
			data.startWan12 = postData.APPLICATION.RULES[12].startWan;
			data.endWan12 = postData.APPLICATION.RULES[12].endWan;
			data.startLan12 = postData.APPLICATION.RULES[12].startLan;
			data.endLan12 = postData.APPLICATION.RULES[12].endLan;
			data.action12 = postData.APPLICATION.RULES[12].action;
		}
		else{
			if(postData.APPLICATION.RULES[12].firadd){
				data.firadd12 = "Yes";
				data.firNum12 = postData.APPLICATION.RULES[12].pvcid+1;
				data.fwtotNum12 = 0;
				data.fwdirName12 = postData.APPLICATION.RULES[12].direction;
				data.fwintfName12 = postData.APPLICATION.RULES[12].interface;
			}
			else{
				data.firadd12 = "No";
			}
			data.submitValue12 = "Add";
			data.action12 = postData.APPLICATION.RULES[12].action;
			data.ruleNum12 = postData.APPLICATION.RULES[12].totNum;
			data.totNum12 = postData.APPLICATION.RULES[12].totNum-1;
		//	data.ipType12 = postData.APPLICATION.RULES[12].ipType;
			data.curNum12 = postData.APPLICATION.RULES[12].idRule;
			if(postData.APPLICATION.RULES[12].direction == "In"){
				data.dirName12 = postData.APPLICATION.RULES[12].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[12].direction == "Out"){
				data.dirName12 = postData.APPLICATION.RULES[12].interface+"O6";
			}
			data.srcaddr12 =  postData.APPLICATION.RULES[12].srcaddr;
			data.dstaddr12 = postData.APPLICATION.RULES[12].dstaddr;
			data.protocol12 = postData.APPLICATION.RULES[12].protocol;
			data.startWan12 = postData.APPLICATION.RULES[12].startWan;
			data.endWan12 = postData.APPLICATION.RULES[12].endWan;
			data.startLan12 = postData.APPLICATION.RULES[12].startLan;
			data.endLan12 = postData.APPLICATION.RULES[12].endLan;
			data.pvcid12 = postData.APPLICATION.RULES[12].pvcid;
		}
	}
	else{
		data.submitValue12 = "None";
	}
	if(ruleNum>13){
		if(postData.APPLICATION.RULES[13].idRule != "-1"){
			data.submitValue13 = "Edit";
			data.curNum13 = postData.APPLICATION.RULES[13].idRule;
			if(postData.APPLICATION.RULES[13].direction == "In"){
				data.dirName13 = postData.APPLICATION.RULES[13].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[13].direction == "Out"){
				data.dirName13 = postData.APPLICATION.RULES[13].interface+"O6";
			}
			data.srcaddr13 = postData.APPLICATION.RULES[13].srcaddr;
			data.dstaddr13 = postData.APPLICATION.RULES[13].dstaddr;
			data.protocol13 = postData.APPLICATION.RULES[13].protocol;
			data.startWan13 = postData.APPLICATION.RULES[13].startWan;
			data.endWan13 = postData.APPLICATION.RULES[13].endWan;
			data.startLan13 = postData.APPLICATION.RULES[13].startLan;
			data.endLan13 = postData.APPLICATION.RULES[13].endLan;
			data.action13 = postData.APPLICATION.RULES[13].action;
		}
		else{
			if(postData.APPLICATION.RULES[13].firadd){
				data.firadd13 = "Yes";
				data.firNum13 = postData.APPLICATION.RULES[13].pvcid+1;
				data.fwtotNum13 = 0;
				data.fwdirName13 = postData.APPLICATION.RULES[13].direction;
				data.fwintfName13 = postData.APPLICATION.RULES[13].interface;
			}
			else{
				data.firadd13 = "No";
			}
			data.submitValue13 = "Add";
			data.action13 = postData.APPLICATION.RULES[13].action;
			data.ruleNum13 = postData.APPLICATION.RULES[13].totNum;
			data.totNum13 = postData.APPLICATION.RULES[13].totNum-1;
		//	data.ipType13 = postData.APPLICATION.RULES[13].ipType;
			data.curNum13 = postData.APPLICATION.RULES[13].idRule;
			if(postData.APPLICATION.RULES[13].direction == "In"){
				data.dirName13 = postData.APPLICATION.RULES[13].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[13].direction == "Out"){
				data.dirName13 = postData.APPLICATION.RULES[13].interface+"O6";
			}
			data.srcaddr13 =  postData.APPLICATION.RULES[13].srcaddr;
			data.dstaddr13 = postData.APPLICATION.RULES[13].dstaddr;
			data.protocol13 = postData.APPLICATION.RULES[13].protocol;
			data.startWan13 = postData.APPLICATION.RULES[13].startWan;
			data.endWan13 = postData.APPLICATION.RULES[13].endWan;
			data.startLan13 = postData.APPLICATION.RULES[13].startLan;
			data.endLan13 = postData.APPLICATION.RULES[13].endLan;
			data.pvcid13 = postData.APPLICATION.RULES[13].pvcid;
		}
	}
	else{
		data.submitValue13 = "None";
	}
	if(ruleNum>14){
		if(postData.APPLICATION.RULES[14].idRule != "-1"){
			data.submitValue14 = "Edit";
			data.curNum14 = postData.APPLICATION.RULES[14].idRule;
			if(postData.APPLICATION.RULES[14].direction == "In"){
				data.dirName14 = postData.APPLICATION.RULES[14].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[14].direction == "Out"){
				data.dirName14 = postData.APPLICATION.RULES[14].interface+"O6";
			}
			data.srcaddr14 = postData.APPLICATION.RULES[14].srcaddr;
			data.dstaddr14 = postData.APPLICATION.RULES[14].dstaddr;
			data.protocol14 = postData.APPLICATION.RULES[14].protocol;
			data.startWan14 = postData.APPLICATION.RULES[14].startWan;
			data.endWan14 = postData.APPLICATION.RULES[14].endWan;
			data.startLan14 = postData.APPLICATION.RULES[14].startLan;
			data.endLan14 = postData.APPLICATION.RULES[14].endLan;
			data.action14 = postData.APPLICATION.RULES[14].action;
		}
		else{
			if(postData.APPLICATION.RULES[14].firadd){
				data.firadd14 = "Yes";
				data.firNum14 = postData.APPLICATION.RULES[14].pvcid+1;
				data.fwtotNum14 = 0;
				data.fwdirName14 = postData.APPLICATION.RULES[14].direction;
				data.fwintfName14 = postData.APPLICATION.RULES[14].interface;
			}
			else{
				data.firadd14 = "No";
			}
			data.submitValue14 = "Add";
			data.action14 = postData.APPLICATION.RULES[14].action;
			data.ruleNum14 = postData.APPLICATION.RULES[14].totNum;
			data.totNum14 = postData.APPLICATION.RULES[14].totNum-1;
		//	data.ipType14 = postData.APPLICATION.RULES[14].ipType;
			data.curNum14 = postData.APPLICATION.RULES[14].idRule;
			if(postData.APPLICATION.RULES[14].direction == "In"){
				data.dirName14 = postData.APPLICATION.RULES[14].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[14].direction == "Out"){
				data.dirName14 = postData.APPLICATION.RULES[14].interface+"O6";
			}
			data.srcaddr14 =  postData.APPLICATION.RULES[14].srcaddr;
			data.dstaddr14 = postData.APPLICATION.RULES[14].dstaddr;
			data.protocol14 = postData.APPLICATION.RULES[14].protocol;
			data.startWan14 = postData.APPLICATION.RULES[14].startWan;
			data.endWan14 = postData.APPLICATION.RULES[14].endWan;
			data.startLan14 = postData.APPLICATION.RULES[14].startLan;
			data.endLan14 = postData.APPLICATION.RULES[14].endLan;
			data.pvcid14 = postData.APPLICATION.RULES[14].pvcid;
		}
	}
	else{
		data.submitValue14 = "None";
	}
	if(ruleNum>15){
		if(postData.APPLICATION.RULES[15].idRule != "-1"){
			data.submitValue15 = "Edit";
			data.curNum15 = postData.APPLICATION.RULES[15].idRule;
			if(postData.APPLICATION.RULES[15].direction == "In"){
				data.dirName15 = postData.APPLICATION.RULES[15].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[15].direction == "Out"){
				data.dirName15 = postData.APPLICATION.RULES[15].interface+"O6";
			}
			data.srcaddr15 = postData.APPLICATION.RULES[15].srcaddr;
			data.dstaddr15 = postData.APPLICATION.RULES[15].dstaddr;
			data.protocol15 = postData.APPLICATION.RULES[15].protocol;
			data.startWan15 = postData.APPLICATION.RULES[15].startWan;
			data.endWan15 = postData.APPLICATION.RULES[15].endWan;
			data.startLan15 = postData.APPLICATION.RULES[15].startLan;
			data.endLan15 = postData.APPLICATION.RULES[15].endLan;
			data.action15 = postData.APPLICATION.RULES[15].action;
		}
		else{
			if(postData.APPLICATION.RULES[15].firadd){
				data.firadd15 = "Yes";
				data.firNum15 = postData.APPLICATION.RULES[15].pvcid+1;
				data.fwtotNum15 = 0;
				data.fwdirName15 = postData.APPLICATION.RULES[15].direction;
				data.fwintfName15 = postData.APPLICATION.RULES[15].interface;
			}
			else{
				data.firadd15 = "No";
			}
			data.submitValue15 = "Add";
			data.action15 = postData.APPLICATION.RULES[15].action;
			data.ruleNum15 = postData.APPLICATION.RULES[15].totNum;
			data.totNum15 = postData.APPLICATION.RULES[15].totNum-1;
		//	data.ipType15 = postData.APPLICATION.RULES[15].ipType;
			data.curNum15 = postData.APPLICATION.RULES[15].idRule;
			if(postData.APPLICATION.RULES[15].direction == "In"){
				data.dirName15 = postData.APPLICATION.RULES[15].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[15].direction == "Out"){
				data.dirName15 = postData.APPLICATION.RULES[15].interface+"O6";
			}
			data.srcaddr15 =  postData.APPLICATION.RULES[15].srcaddr;
			data.dstaddr15 = postData.APPLICATION.RULES[15].dstaddr;
			data.protocol15 = postData.APPLICATION.RULES[15].protocol;
			data.startWan15 = postData.APPLICATION.RULES[15].startWan;
			data.endWan15 = postData.APPLICATION.RULES[15].endWan;
			data.startLan15 = postData.APPLICATION.RULES[15].startLan;
			data.endLan15 = postData.APPLICATION.RULES[15].endLan;
			data.pvcid15 = postData.APPLICATION.RULES[15].pvcid;
		}
	}
	else{
		data.submitValue15 = "None";
	}
	if(ruleNum>16){
		if(postData.APPLICATION.RULES[16].idRule != "-1"){
			data.submitValue16 = "Edit";
			data.curNum16 = postData.APPLICATION.RULES[16].idRule;
			if(postData.APPLICATION.RULES[16].direction == "In"){
				data.dirName16 = postData.APPLICATION.RULES[16].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[16].direction == "Out"){
				data.dirName16 = postData.APPLICATION.RULES[16].interface+"O6";
			}
			data.srcaddr16 = postData.APPLICATION.RULES[16].srcaddr;
			data.dstaddr16 = postData.APPLICATION.RULES[16].dstaddr;
			data.protocol16 = postData.APPLICATION.RULES[16].protocol;
			data.startWan16 = postData.APPLICATION.RULES[16].startWan;
			data.endWan16 = postData.APPLICATION.RULES[16].endWan;
			data.startLan16 = postData.APPLICATION.RULES[16].startLan;
			data.endLan16 = postData.APPLICATION.RULES[16].endLan;
			data.action16 = postData.APPLICATION.RULES[16].action;
		}
		else{
			if(postData.APPLICATION.RULES[16].firadd){
				data.firadd16 = "Yes";
				data.firNum16 = postData.APPLICATION.RULES[16].pvcid+1;
				data.fwtotNum16 = 0;
				data.fwdirName16 = postData.APPLICATION.RULES[16].direction;
				data.fwintfName16 = postData.APPLICATION.RULES[16].interface;
			}
			else{
				data.firadd16 = "No";
			}
			data.submitValue16 = "Add";
			data.action16 = postData.APPLICATION.RULES[16].action;
			data.ruleNum16 = postData.APPLICATION.RULES[16].totNum;
			data.totNum16 = postData.APPLICATION.RULES[16].totNum-1;
		//	data.ipType16 = postData.APPLICATION.RULES[16].ipType;
			data.curNum16 = postData.APPLICATION.RULES[16].idRule;
			if(postData.APPLICATION.RULES[16].direction == "In"){
				data.dirName16 = postData.APPLICATION.RULES[16].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[16].direction == "Out"){
				data.dirName16 = postData.APPLICATION.RULES[16].interface+"O6";
			}
			data.srcaddr16 =  postData.APPLICATION.RULES[16].srcaddr;
			data.dstaddr16 = postData.APPLICATION.RULES[16].dstaddr;
			data.protocol16 = postData.APPLICATION.RULES[16].protocol;
			data.startWan16 = postData.APPLICATION.RULES[16].startWan;
			data.endWan16 = postData.APPLICATION.RULES[16].endWan;
			data.startLan16 = postData.APPLICATION.RULES[16].startLan;
			data.endLan16 = postData.APPLICATION.RULES[16].endLan;
			data.pvcid16 = postData.APPLICATION.RULES[16].pvcid;
		}
	}
	else{
		data.submitValue16 = "None";
	}
	if(ruleNum>17){
		if(postData.APPLICATION.RULES[17].idRule != "-1"){
			data.submitValue17 = "Edit";
			data.curNum17 = postData.APPLICATION.RULES[17].idRule;
			if(postData.APPLICATION.RULES[17].direction == "In"){
				data.dirName17 = postData.APPLICATION.RULES[17].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[17].direction == "Out"){
				data.dirName17 = postData.APPLICATION.RULES[17].interface+"O6";
			}
			data.srcaddr17 = postData.APPLICATION.RULES[17].srcaddr;
			data.dstaddr17 = postData.APPLICATION.RULES[17].dstaddr;
			data.protocol17 = postData.APPLICATION.RULES[17].protocol;
			data.startWan17 = postData.APPLICATION.RULES[17].startWan;
			data.endWan17 = postData.APPLICATION.RULES[17].endWan;
			data.startLan17 = postData.APPLICATION.RULES[17].startLan;
			data.endLan17 = postData.APPLICATION.RULES[17].endLan;
			data.action17 = postData.APPLICATION.RULES[17].action;
		}
		else{
			if(postData.APPLICATION.RULES[17].firadd){
				data.firadd17 = "Yes";
				data.firNum17 = postData.APPLICATION.RULES[17].pvcid+1;
				data.fwtotNum17 = 0;
				data.fwdirName17 = postData.APPLICATION.RULES[17].direction;
				data.fwintfName17 = postData.APPLICATION.RULES[17].interface;
			}
			else{
				data.firadd17 = "No";
			}
			data.submitValue17 = "Add";
			data.action17 = postData.APPLICATION.RULES[17].action;
			data.ruleNum17 = postData.APPLICATION.RULES[17].totNum;
			data.totNum17 = postData.APPLICATION.RULES[17].totNum-1;
		//	data.ipType17 = postData.APPLICATION.RULES[17].ipType;
			data.curNum17 = postData.APPLICATION.RULES[17].idRule;
			if(postData.APPLICATION.RULES[17].direction == "In"){
				data.dirName17 = postData.APPLICATION.RULES[17].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[17].direction == "Out"){
				data.dirName17 = postData.APPLICATION.RULES[17].interface+"O6";
			}
			data.srcaddr17 =  postData.APPLICATION.RULES[17].srcaddr;
			data.dstaddr17 = postData.APPLICATION.RULES[17].dstaddr;
			data.protocol17 = postData.APPLICATION.RULES[17].protocol;
			data.startWan17 = postData.APPLICATION.RULES[17].startWan;
			data.endWan17 = postData.APPLICATION.RULES[17].endWan;
			data.startLan17 = postData.APPLICATION.RULES[17].startLan;
			data.endLan17 = postData.APPLICATION.RULES[17].endLan;
			data.pvcid17 = postData.APPLICATION.RULES[17].pvcid;
		}
	}
	else{
		data.submitValue17 = "None";
	}
	if(ruleNum>18){
		if(postData.APPLICATION.RULES[18].idRule != "-1"){
			data.submitValue18 = "Edit";
			data.curNum18 = postData.APPLICATION.RULES[18].idRule;
			if(postData.APPLICATION.RULES[18].direction == "In"){
				data.dirName18 = postData.APPLICATION.RULES[18].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[18].direction == "Out"){
				data.dirName18 = postData.APPLICATION.RULES[18].interface+"O6";
			}
			data.srcaddr18 = postData.APPLICATION.RULES[18].srcaddr;
			data.dstaddr18 = postData.APPLICATION.RULES[18].dstaddr;
			data.protocol18 = postData.APPLICATION.RULES[18].protocol;
			data.startWan18 = postData.APPLICATION.RULES[18].startWan;
			data.endWan18 = postData.APPLICATION.RULES[18].endWan;
			data.startLan18 = postData.APPLICATION.RULES[18].startLan;
			data.endLan18 = postData.APPLICATION.RULES[18].endLan;
			data.action18 = postData.APPLICATION.RULES[18].action;
		}
		else{
			if(postData.APPLICATION.RULES[18].firadd){
				data.firadd18 = "Yes";
				data.firNum18 = postData.APPLICATION.RULES[18].pvcid+1;
				data.fwtotNum18 = 0;
				data.fwdirName18 = postData.APPLICATION.RULES[18].direction;
				data.fwintfName18 = postData.APPLICATION.RULES[18].interface;
			}
			else{
				data.firadd18 = "No";
			}
			data.submitValue18 = "Add";
			data.action18 = postData.APPLICATION.RULES[18].action;
			data.ruleNum18 = postData.APPLICATION.RULES[18].totNum;
			data.totNum18 = postData.APPLICATION.RULES[18].totNum-1;
		//	data.ipType18 = postData.APPLICATION.RULES[18].ipType;
			data.curNum18 = postData.APPLICATION.RULES[18].idRule;
			if(postData.APPLICATION.RULES[18].direction == "In"){
				data.dirName18 = postData.APPLICATION.RULES[18].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[18].direction == "Out"){
				data.dirName18 = postData.APPLICATION.RULES[18].interface+"O6";
			}
			data.srcaddr18 =  postData.APPLICATION.RULES[18].srcaddr;
			data.dstaddr18 = postData.APPLICATION.RULES[18].dstaddr;
			data.protocol18 = postData.APPLICATION.RULES[18].protocol;
			data.startWan18 = postData.APPLICATION.RULES[18].startWan;
			data.endWan18 = postData.APPLICATION.RULES[18].endWan;
			data.startLan18 = postData.APPLICATION.RULES[18].startLan;
			data.endLan18 = postData.APPLICATION.RULES[18].endLan;
			data.pvcid18 = postData.APPLICATION.RULES[18].pvcid;
		}
	}
	else{
		data.submitValue18 = "None";
	}
	if(ruleNum>19){
		if(postData.APPLICATION.RULES[19].idRule != "-1"){
			data.submitValue19 = "Edit";
			data.curNum19 = postData.APPLICATION.RULES[19].idRule;
			if(postData.APPLICATION.RULES[19].direction == "In"){
				data.dirName19 = postData.APPLICATION.RULES[19].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[19].direction == "Out"){
				data.dirName19 = postData.APPLICATION.RULES[19].interface+"O6";
			}
			data.srcaddr19 = postData.APPLICATION.RULES[19].srcaddr;
			data.dstaddr19 = postData.APPLICATION.RULES[19].dstaddr;
			data.protocol19 = postData.APPLICATION.RULES[19].protocol;
			data.startWan19 = postData.APPLICATION.RULES[19].startWan;
			data.endWan19 = postData.APPLICATION.RULES[19].endWan;
			data.startLan19 = postData.APPLICATION.RULES[19].startLan;
			data.endLan19 = postData.APPLICATION.RULES[19].endLan;
			data.action19 = postData.APPLICATION.RULES[19].action;
		}
		else{
			if(postData.APPLICATION.RULES[19].firadd){
				data.firadd19 = "Yes";
				data.firNum19 = postData.APPLICATION.RULES[19].pvcid+1;
				data.fwtotNum19 = 0;
				data.fwdirName19 = postData.APPLICATION.RULES[19].direction;
				data.fwintfName19 = postData.APPLICATION.RULES[19].interface;
			}
			else{
				data.firadd19 = "No";
			}
			data.submitValue19 = "Add";
			data.action19 = postData.APPLICATION.RULES[19].action;
			data.ruleNum19 = postData.APPLICATION.RULES[19].totNum;
			data.totNum19 = postData.APPLICATION.RULES[19].totNum-1;
		//	data.ipType19 = postData.APPLICATION.RULES[19].ipType;
			data.curNum19 = postData.APPLICATION.RULES[19].idRule;
			if(postData.APPLICATION.RULES[19].direction == "In"){
				data.dirName19 = postData.APPLICATION.RULES[19].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[19].direction == "Out"){
				data.dirName19 = postData.APPLICATION.RULES[19].interface+"O6";
			}
			data.srcaddr19 =  postData.APPLICATION.RULES[19].srcaddr;
			data.dstaddr19 = postData.APPLICATION.RULES[19].dstaddr;
			data.protocol19 = postData.APPLICATION.RULES[19].protocol;
			data.startWan19 = postData.APPLICATION.RULES[19].startWan;
			data.endWan19 = postData.APPLICATION.RULES[19].endWan;
			data.startLan19 = postData.APPLICATION.RULES[19].startLan;
			data.endLan19 = postData.APPLICATION.RULES[19].endLan;
			data.pvcid19 = postData.APPLICATION.RULES[19].pvcid;
		}
	}
	else{
		data.submitValue19 = "None";
	}
	if(ruleNum>20){
		if(postData.APPLICATION.RULES[20].idRule != "-1"){
			data.submitValue20 = "Edit";
			data.curNum20 = postData.APPLICATION.RULES[20].idRule;
			if(postData.APPLICATION.RULES[20].direction == "In"){
				data.dirName20 = postData.APPLICATION.RULES[20].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[20].direction == "Out"){
				data.dirName20 = postData.APPLICATION.RULES[20].interface+"O6";
			}
			data.srcaddr20 = postData.APPLICATION.RULES[20].srcaddr;
			data.dstaddr20 = postData.APPLICATION.RULES[20].dstaddr;
			data.protocol20 = postData.APPLICATION.RULES[20].protocol;
			data.startWan20 = postData.APPLICATION.RULES[20].startWan;
			data.endWan20 = postData.APPLICATION.RULES[20].endWan;
			data.startLan20 = postData.APPLICATION.RULES[20].startLan;
			data.endLan20 = postData.APPLICATION.RULES[20].endLan;
			data.action20 = postData.APPLICATION.RULES[20].action;
		}
		else{
			if(postData.APPLICATION.RULES[20].firadd){
				data.firadd20 = "Yes";
				data.firNum20 = postData.APPLICATION.RULES[20].pvcid+1;
				data.fwtotNum20 = 0;
				data.fwdirName20 = postData.APPLICATION.RULES[20].direction;
				data.fwintfName20 = postData.APPLICATION.RULES[20].interface;
			}
			else{
				data.firadd20 = "No";
			}
			data.submitValue20 = "Add";
			data.action20 = postData.APPLICATION.RULES[20].action;
			data.ruleNum20 = postData.APPLICATION.RULES[20].totNum;
			data.totNum20 = postData.APPLICATION.RULES[20].totNum-1;
		//	data.ipType20 = postData.APPLICATION.RULES[20].ipType;
			data.curNum20 = postData.APPLICATION.RULES[20].idRule;
			if(postData.APPLICATION.RULES[20].direction == "In"){
				data.dirName20 = postData.APPLICATION.RULES[20].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[20].direction == "Out"){
				data.dirName20 = postData.APPLICATION.RULES[20].interface+"O6";
			}
			data.srcaddr20 =  postData.APPLICATION.RULES[20].srcaddr;
			data.dstaddr20 = postData.APPLICATION.RULES[20].dstaddr;
			data.protocol20 = postData.APPLICATION.RULES[20].protocol;
			data.startWan20 = postData.APPLICATION.RULES[20].startWan;
			data.endWan20 = postData.APPLICATION.RULES[20].endWan;
			data.startLan20 = postData.APPLICATION.RULES[20].startLan;
			data.endLan20 = postData.APPLICATION.RULES[20].endLan;
			data.pvcid20 = postData.APPLICATION.RULES[20].pvcid;
		}
	}
	else{
		data.submitValue20 = "None";
	}
	if(ruleNum>21){
		if(postData.APPLICATION.RULES[21].idRule != "-1"){
			data.submitValue21 = "Edit";
			data.curNum21 = postData.APPLICATION.RULES[21].idRule;
			if(postData.APPLICATION.RULES[21].direction == "In"){
				data.dirName21 = postData.APPLICATION.RULES[21].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[21].direction == "Out"){
				data.dirName21 = postData.APPLICATION.RULES[21].interface+"O6";
			}
			data.srcaddr21 = postData.APPLICATION.RULES[21].srcaddr;
			data.dstaddr21 = postData.APPLICATION.RULES[21].dstaddr;
			data.protocol21 = postData.APPLICATION.RULES[21].protocol;
			data.startWan21 = postData.APPLICATION.RULES[21].startWan;
			data.endWan21 = postData.APPLICATION.RULES[21].endWan;
			data.startLan21 = postData.APPLICATION.RULES[21].startLan;
			data.endLan21 = postData.APPLICATION.RULES[21].endLan;
			data.action21 = postData.APPLICATION.RULES[21].action;
		}
		else{
			if(postData.APPLICATION.RULES[21].firadd){
				data.firadd21 = "Yes";
				data.firNum21 = postData.APPLICATION.RULES[21].pvcid+1;
				data.fwtotNum21 = 0;
				data.fwdirName21 = postData.APPLICATION.RULES[21].direction;
				data.fwintfName21 = postData.APPLICATION.RULES[21].interface;
			}
			else{
				data.firadd21 = "No";
			}
			data.submitValue21 = "Add";
			data.action21 = postData.APPLICATION.RULES[21].action;
			data.ruleNum21 = postData.APPLICATION.RULES[21].totNum;
			data.totNum21 = postData.APPLICATION.RULES[21].totNum-1;
		//	data.ipType21 = postData.APPLICATION.RULES[21].ipType;
			data.curNum21 = postData.APPLICATION.RULES[21].idRule;
			if(postData.APPLICATION.RULES[21].direction == "In"){
				data.dirName21 = postData.APPLICATION.RULES[21].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[21].direction == "Out"){
				data.dirName21 = postData.APPLICATION.RULES[21].interface+"O6";
			}
			data.srcaddr21 =  postData.APPLICATION.RULES[21].srcaddr;
			data.dstaddr21 = postData.APPLICATION.RULES[21].dstaddr;
			data.protocol21 = postData.APPLICATION.RULES[21].protocol;
			data.startWan21 = postData.APPLICATION.RULES[21].startWan;
			data.endWan21 = postData.APPLICATION.RULES[21].endWan;
			data.startLan21 = postData.APPLICATION.RULES[21].startLan;
			data.endLan21 = postData.APPLICATION.RULES[21].endLan;
			data.pvcid21 = postData.APPLICATION.RULES[21].pvcid;
		}
	}
	else{
		data.submitValue21 = "None";
	}
	if(ruleNum>22){
		if(postData.APPLICATION.RULES[22].idRule != "-1"){
			data.submitValue22 = "Edit";
			data.curNum22 = postData.APPLICATION.RULES[22].idRule;
			if(postData.APPLICATION.RULES[22].direction == "In"){
				data.dirName22 = postData.APPLICATION.RULES[22].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[22].direction == "Out"){
				data.dirName22 = postData.APPLICATION.RULES[22].interface+"O6";
			}
			data.srcaddr22 = postData.APPLICATION.RULES[22].srcaddr;
			data.dstaddr22 = postData.APPLICATION.RULES[22].dstaddr;
			data.protocol22 = postData.APPLICATION.RULES[22].protocol;
			data.startWan22 = postData.APPLICATION.RULES[22].startWan;
			data.endWan22 = postData.APPLICATION.RULES[22].endWan;
			data.startLan22 = postData.APPLICATION.RULES[22].startLan;
			data.endLan22 = postData.APPLICATION.RULES[22].endLan;
			data.action22 = postData.APPLICATION.RULES[22].action;
		}
		else{
			if(postData.APPLICATION.RULES[22].firadd){
				data.firadd22 = "Yes";
				data.firNum22 = postData.APPLICATION.RULES[22].pvcid+1;
				data.fwtotNum22 = 0;
				data.fwdirName22 = postData.APPLICATION.RULES[22].direction;
				data.fwintfName22 = postData.APPLICATION.RULES[22].interface;
			}
			else{
				data.firadd22 = "No";
			}
			data.submitValue22 = "Add";
			data.action22 = postData.APPLICATION.RULES[22].action;
			data.ruleNum22 = postData.APPLICATION.RULES[22].totNum;
			data.totNum22 = postData.APPLICATION.RULES[22].totNum-1;
		//	data.ipType22 = postData.APPLICATION.RULES[22].ipType;
			data.curNum22 = postData.APPLICATION.RULES[22].idRule;
			if(postData.APPLICATION.RULES[22].direction == "In"){
				data.dirName22 = postData.APPLICATION.RULES[22].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[22].direction == "Out"){
				data.dirName22 = postData.APPLICATION.RULES[22].interface+"O6";
			}
			data.srcaddr22 =  postData.APPLICATION.RULES[22].srcaddr;
			data.dstaddr22 = postData.APPLICATION.RULES[22].dstaddr;
			data.protocol22 = postData.APPLICATION.RULES[22].protocol;
			data.startWan22 = postData.APPLICATION.RULES[22].startWan;
			data.endWan22 = postData.APPLICATION.RULES[22].endWan;
			data.startLan22 = postData.APPLICATION.RULES[22].startLan;
			data.endLan22 = postData.APPLICATION.RULES[22].endLan;
			data.pvcid22 = postData.APPLICATION.RULES[22].pvcid;
		}
	}
	else{
		data.submitValue22 = "None";
	}
	if(ruleNum>23){
		if(postData.APPLICATION.RULES[23].idRule != "-1"){
			data.submitValue23 = "Edit";
			data.curNum23 = postData.APPLICATION.RULES[23].idRule;
			if(postData.APPLICATION.RULES[23].direction == "In"){
				data.dirName23 = postData.APPLICATION.RULES[23].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[23].direction == "Out"){
				data.dirName23 = postData.APPLICATION.RULES[23].interface+"O6";
			}
			data.srcaddr23 = postData.APPLICATION.RULES[23].srcaddr;
			data.dstaddr23 = postData.APPLICATION.RULES[23].dstaddr;
			data.protocol23 = postData.APPLICATION.RULES[23].protocol;
			data.startWan23 = postData.APPLICATION.RULES[23].startWan;
			data.endWan23 = postData.APPLICATION.RULES[23].endWan;
			data.startLan23 = postData.APPLICATION.RULES[23].startLan;
			data.endLan23 = postData.APPLICATION.RULES[23].endLan;
			data.action23 = postData.APPLICATION.RULES[23].action;
		}
		else{
			if(postData.APPLICATION.RULES[23].firadd){
				data.firadd23 = "Yes";
				data.firNum23 = postData.APPLICATION.RULES[23].pvcid+1;
				data.fwtotNum23 = 0;
				data.fwdirName23 = postData.APPLICATION.RULES[23].direction;
				data.fwintfName23 = postData.APPLICATION.RULES[23].interface;
			}
			else{
				data.firadd23 = "No";
			}
			data.submitValue23 = "Add";
			data.action23 = postData.APPLICATION.RULES[23].action;
			data.ruleNum23 = postData.APPLICATION.RULES[23].totNum;
			data.totNum23 = postData.APPLICATION.RULES[23].totNum-1;
		//	data.ipType23 = postData.APPLICATION.RULES[23].ipType;
			data.curNum23 = postData.APPLICATION.RULES[23].idRule;
			if(postData.APPLICATION.RULES[23].direction == "In"){
				data.dirName23 = postData.APPLICATION.RULES[23].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[23].direction == "Out"){
				data.dirName23 = postData.APPLICATION.RULES[23].interface+"O6";
			}
			data.srcaddr23 =  postData.APPLICATION.RULES[23].srcaddr;
			data.dstaddr23 = postData.APPLICATION.RULES[23].dstaddr;
			data.protocol23 = postData.APPLICATION.RULES[23].protocol;
			data.startWan23 = postData.APPLICATION.RULES[23].startWan;
			data.endWan23 = postData.APPLICATION.RULES[23].endWan;
			data.startLan23 = postData.APPLICATION.RULES[23].startLan;
			data.endLan23 = postData.APPLICATION.RULES[23].endLan;
			data.pvcid23 = postData.APPLICATION.RULES[23].pvcid;
		}
	}
	else{
		data.submitValue23 = "None";
	}
	if(ruleNum>24){
		if(postData.APPLICATION.RULES[24].idRule != "-1"){
			data.submitValue24 = "Edit";
			data.curNum24 = postData.APPLICATION.RULES[24].idRule;
			if(postData.APPLICATION.RULES[24].direction == "In"){
				data.dirName24 = postData.APPLICATION.RULES[24].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[24].direction == "Out"){
				data.dirName24 = postData.APPLICATION.RULES[24].interface+"O6";
			}
			data.srcaddr24 = postData.APPLICATION.RULES[24].srcaddr;
			data.dstaddr24 = postData.APPLICATION.RULES[24].dstaddr;
			data.protocol24 = postData.APPLICATION.RULES[24].protocol;
			data.startWan24 = postData.APPLICATION.RULES[24].startWan;
			data.endWan24 = postData.APPLICATION.RULES[24].endWan;
			data.startLan24 = postData.APPLICATION.RULES[24].startLan;
			data.endLan24 = postData.APPLICATION.RULES[24].endLan;
			data.action24 = postData.APPLICATION.RULES[24].action;
		}
		else{
			if(postData.APPLICATION.RULES[24].firadd){
				data.firadd24 = "Yes";
				data.firNum24 = postData.APPLICATION.RULES[24].pvcid+1;
				data.fwtotNum24 = 0;
				data.fwdirName24 = postData.APPLICATION.RULES[24].direction;
				data.fwintfName24 = postData.APPLICATION.RULES[24].interface;
			}
			else{
				data.firadd24 = "No";
			}
			data.submitValue24 = "Add";
			data.action24 = postData.APPLICATION.RULES[24].action;
			data.ruleNum24 = postData.APPLICATION.RULES[24].totNum;
			data.totNum24 = postData.APPLICATION.RULES[24].totNum-1;
		//	data.ipType24 = postData.APPLICATION.RULES[24].ipType;
			data.curNum24 = postData.APPLICATION.RULES[24].idRule;
			if(postData.APPLICATION.RULES[24].direction == "In"){
				data.dirName24 = postData.APPLICATION.RULES[24].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[24].direction == "Out"){
				data.dirName24 = postData.APPLICATION.RULES[24].interface+"O6";
			}
			data.srcaddr24 =  postData.APPLICATION.RULES[24].srcaddr;
			data.dstaddr24 = postData.APPLICATION.RULES[24].dstaddr;
			data.protocol24 = postData.APPLICATION.RULES[24].protocol;
			data.startWan24 = postData.APPLICATION.RULES[24].startWan;
			data.endWan24 = postData.APPLICATION.RULES[24].endWan;
			data.startLan24 = postData.APPLICATION.RULES[24].startLan;
			data.endLan24 = postData.APPLICATION.RULES[24].endLan;
			data.pvcid24 = postData.APPLICATION.RULES[24].pvcid;
		}
	}
	else{
		data.submitValue24 = "None";
	}
	if(ruleNum>25){
		if(postData.APPLICATION.RULES[25].idRule != "-1"){
			data.submitValue25 = "Edit";
			data.curNum25 = postData.APPLICATION.RULES[25].idRule;
			if(postData.APPLICATION.RULES[25].direction == "In"){
				data.dirName25 = postData.APPLICATION.RULES[25].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[25].direction == "Out"){
				data.dirName25 = postData.APPLICATION.RULES[25].interface+"O6";
			}
			data.srcaddr25 = postData.APPLICATION.RULES[25].srcaddr;
			data.dstaddr25 = postData.APPLICATION.RULES[25].dstaddr;
			data.protocol25 = postData.APPLICATION.RULES[25].protocol;
			data.startWan25 = postData.APPLICATION.RULES[25].startWan;
			data.endWan25 = postData.APPLICATION.RULES[25].endWan;
			data.startLan25 = postData.APPLICATION.RULES[25].startLan;
			data.endLan25 = postData.APPLICATION.RULES[25].endLan;
			data.action25 = postData.APPLICATION.RULES[25].action;
		}
		else{
			if(postData.APPLICATION.RULES[25].firadd){
				data.firadd25 = "Yes";
				data.firNum25 = postData.APPLICATION.RULES[25].pvcid+1;
				data.fwtotNum25 = 0;
				data.fwdirName25 = postData.APPLICATION.RULES[25].direction;
				data.fwintfName25 = postData.APPLICATION.RULES[25].interface;
			}
			else{
				data.firadd25 = "No";
			}
			data.submitValue25 = "Add";
			data.action25 = postData.APPLICATION.RULES[25].action;
			data.ruleNum25 = postData.APPLICATION.RULES[25].totNum;
			data.totNum25 = postData.APPLICATION.RULES[25].totNum-1;
		//	data.ipType25 = postData.APPLICATION.RULES[25].ipType;
			data.curNum25 = postData.APPLICATION.RULES[25].idRule;
			if(postData.APPLICATION.RULES[25].direction == "In"){
				data.dirName25 = postData.APPLICATION.RULES[25].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[25].direction == "Out"){
				data.dirName25 = postData.APPLICATION.RULES[25].interface+"O6";
			}
			data.srcaddr25 =  postData.APPLICATION.RULES[25].srcaddr;
			data.dstaddr25 = postData.APPLICATION.RULES[25].dstaddr;
			data.protocol25 = postData.APPLICATION.RULES[25].protocol;
			data.startWan25 = postData.APPLICATION.RULES[25].startWan;
			data.endWan25 = postData.APPLICATION.RULES[25].endWan;
			data.startLan25 = postData.APPLICATION.RULES[25].startLan;
			data.endLan25 = postData.APPLICATION.RULES[25].endLan;
			data.pvcid25 = postData.APPLICATION.RULES[25].pvcid;
		}
	}
	else{
		data.submitValue25 = "None";
	}
	if(ruleNum>26){
		if(postData.APPLICATION.RULES[26].idRule != "-1"){
			data.submitValue26 = "Edit";
			data.curNum26 = postData.APPLICATION.RULES[26].idRule;
			if(postData.APPLICATION.RULES[26].direction == "In"){
				data.dirName26 = postData.APPLICATION.RULES[26].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[26].direction == "Out"){
				data.dirName26 = postData.APPLICATION.RULES[26].interface+"O6";
			}
			data.srcaddr26 = postData.APPLICATION.RULES[26].srcaddr;
			data.dstaddr26 = postData.APPLICATION.RULES[26].dstaddr;
			data.protocol26 = postData.APPLICATION.RULES[26].protocol;
			data.startWan26 = postData.APPLICATION.RULES[26].startWan;
			data.endWan26 = postData.APPLICATION.RULES[26].endWan;
			data.startLan26 = postData.APPLICATION.RULES[26].startLan;
			data.endLan26 = postData.APPLICATION.RULES[26].endLan;
			data.action26 = postData.APPLICATION.RULES[26].action;
		}
		else{
			if(postData.APPLICATION.RULES[26].firadd){
				data.firadd26 = "Yes";
				data.firNum26 = postData.APPLICATION.RULES[26].pvcid+1;
				data.fwtotNum26 = 0;
				data.fwdirName26 = postData.APPLICATION.RULES[26].direction;
				data.fwintfName26 = postData.APPLICATION.RULES[26].interface;
			}
			else{
				data.firadd26 = "No";
			}
			data.submitValue26 = "Add";
			data.action26 = postData.APPLICATION.RULES[26].action;
			data.ruleNum26 = postData.APPLICATION.RULES[26].totNum;
			data.totNum26 = postData.APPLICATION.RULES[26].totNum-1;
		//	data.ipType26 = postData.APPLICATION.RULES[26].ipType;
			data.curNum26 = postData.APPLICATION.RULES[26].idRule;
			if(postData.APPLICATION.RULES[26].direction == "In"){
				data.dirName26 = postData.APPLICATION.RULES[26].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[26].direction == "Out"){
				data.dirName26 = postData.APPLICATION.RULES[26].interface+"O6";
			}
			data.srcaddr26 =  postData.APPLICATION.RULES[26].srcaddr;
			data.dstaddr26 = postData.APPLICATION.RULES[26].dstaddr;
			data.protocol26 = postData.APPLICATION.RULES[26].protocol;
			data.startWan26 = postData.APPLICATION.RULES[26].startWan;
			data.endWan26 = postData.APPLICATION.RULES[26].endWan;
			data.startLan26 = postData.APPLICATION.RULES[26].startLan;
			data.endLan26 = postData.APPLICATION.RULES[26].endLan;
			data.pvcid26 = postData.APPLICATION.RULES[26].pvcid;
		}
	}
	else{
		data.submitValue26 = "None";
	}
	if(ruleNum>27){
		if(postData.APPLICATION.RULES[27].idRule != "-1"){
			data.submitValue27 = "Edit";
			data.curNum27 = postData.APPLICATION.RULES[27].idRule;
			if(postData.APPLICATION.RULES[27].direction == "In"){
				data.dirName27 = postData.APPLICATION.RULES[27].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[27].direction == "Out"){
				data.dirName27 = postData.APPLICATION.RULES[27].interface+"O6";
			}
			data.srcaddr27 = postData.APPLICATION.RULES[27].srcaddr;
			data.dstaddr27 = postData.APPLICATION.RULES[27].dstaddr;
			data.protocol27 = postData.APPLICATION.RULES[27].protocol;
			data.startWan27 = postData.APPLICATION.RULES[27].startWan;
			data.endWan27 = postData.APPLICATION.RULES[27].endWan;
			data.startLan27 = postData.APPLICATION.RULES[27].startLan;
			data.endLan27 = postData.APPLICATION.RULES[27].endLan;
			data.action27 = postData.APPLICATION.RULES[27].action;
		}
		else{
			if(postData.APPLICATION.RULES[27].firadd){
				data.firadd27 = "Yes";
				data.firNum27 = postData.APPLICATION.RULES[27].pvcid+1;
				data.fwtotNum27 = 0;
				data.fwdirName27 = postData.APPLICATION.RULES[27].direction;
				data.fwintfName27 = postData.APPLICATION.RULES[27].interface;
			}
			else{
				data.firadd27 = "No";
			}
			data.submitValue27 = "Add";
			data.action27 = postData.APPLICATION.RULES[27].action;
			data.ruleNum27 = postData.APPLICATION.RULES[27].totNum;
			data.totNum27 = postData.APPLICATION.RULES[27].totNum-1;
		//	data.ipType27 = postData.APPLICATION.RULES[27].ipType;
			data.curNum27 = postData.APPLICATION.RULES[27].idRule;
			if(postData.APPLICATION.RULES[27].direction == "In"){
				data.dirName27 = postData.APPLICATION.RULES[27].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[27].direction == "Out"){
				data.dirName27 = postData.APPLICATION.RULES[27].interface+"O6";
			}
			data.srcaddr27 =  postData.APPLICATION.RULES[27].srcaddr;
			data.dstaddr27 = postData.APPLICATION.RULES[27].dstaddr;
			data.protocol27 = postData.APPLICATION.RULES[27].protocol;
			data.startWan27 = postData.APPLICATION.RULES[27].startWan;
			data.endWan27 = postData.APPLICATION.RULES[27].endWan;
			data.startLan27 = postData.APPLICATION.RULES[27].startLan;
			data.endLan27 = postData.APPLICATION.RULES[27].endLan;
			data.pvcid27 = postData.APPLICATION.RULES[27].pvcid;
		}
	}
	else{
		data.submitValue27 = "None";
	}
	if(ruleNum>28){
		if(postData.APPLICATION.RULES[28].idRule != "-1"){
			data.submitValue28 = "Edit";
			data.curNum28 = postData.APPLICATION.RULES[28].idRule;
			if(postData.APPLICATION.RULES[28].direction == "In"){
				data.dirName28 = postData.APPLICATION.RULES[28].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[28].direction == "Out"){
				data.dirName28 = postData.APPLICATION.RULES[28].interface+"O6";
			}
			data.srcaddr28 = postData.APPLICATION.RULES[28].srcaddr;
			data.dstaddr28 = postData.APPLICATION.RULES[28].dstaddr;
			data.protocol28 = postData.APPLICATION.RULES[28].protocol;
			data.startWan28 = postData.APPLICATION.RULES[28].startWan;
			data.endWan28 = postData.APPLICATION.RULES[28].endWan;
			data.startLan28 = postData.APPLICATION.RULES[28].startLan;
			data.endLan28 = postData.APPLICATION.RULES[28].endLan;
			data.action28 = postData.APPLICATION.RULES[28].action;
		}
		else{
			if(postData.APPLICATION.RULES[28].firadd){
				data.firadd28 = "Yes";
				data.firNum28 = postData.APPLICATION.RULES[28].pvcid+1;
				data.fwtotNum28 = 0;
				data.fwdirName28 = postData.APPLICATION.RULES[28].direction;
				data.fwintfName28 = postData.APPLICATION.RULES[28].interface;
			}
			else{
				data.firadd28 = "No";
			}
			data.submitValue28 = "Add";
			data.action28 = postData.APPLICATION.RULES[28].action;
			data.ruleNum28 = postData.APPLICATION.RULES[28].totNum;
			data.totNum28 = postData.APPLICATION.RULES[28].totNum-1;
		//	data.ipType28 = postData.APPLICATION.RULES[28].ipType;
			data.curNum28 = postData.APPLICATION.RULES[28].idRule;
			if(postData.APPLICATION.RULES[28].direction == "In"){
				data.dirName28 = postData.APPLICATION.RULES[28].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[28].direction == "Out"){
				data.dirName28 = postData.APPLICATION.RULES[28].interface+"O6";
			}
			data.srcaddr28 =  postData.APPLICATION.RULES[28].srcaddr;
			data.dstaddr28 = postData.APPLICATION.RULES[28].dstaddr;
			data.protocol28 = postData.APPLICATION.RULES[28].protocol;
			data.startWan28 = postData.APPLICATION.RULES[28].startWan;
			data.endWan28 = postData.APPLICATION.RULES[28].endWan;
			data.startLan28 = postData.APPLICATION.RULES[28].startLan;
			data.endLan28 = postData.APPLICATION.RULES[28].endLan;
			data.pvcid28 = postData.APPLICATION.RULES[28].pvcid;
		}
	}
	else{
		data.submitValue28 = "None";
	}
	if(ruleNum>29){
		if(postData.APPLICATION.RULES[29].idRule != "-1"){
			data.submitValue29 = "Edit";
			data.curNum29 = postData.APPLICATION.RULES[29].idRule;
			if(postData.APPLICATION.RULES[29].direction == "In"){
				data.dirName29 = postData.APPLICATION.RULES[29].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[29].direction == "Out"){
				data.dirName29 = postData.APPLICATION.RULES[29].interface+"O6";
			}
			data.srcaddr29 = postData.APPLICATION.RULES[29].srcaddr;
			data.dstaddr29 = postData.APPLICATION.RULES[29].dstaddr;
			data.protocol29 = postData.APPLICATION.RULES[29].protocol;
			data.startWan29 = postData.APPLICATION.RULES[29].startWan;
			data.endWan29 = postData.APPLICATION.RULES[29].endWan;
			data.startLan29 = postData.APPLICATION.RULES[29].startLan;
			data.endLan29 = postData.APPLICATION.RULES[29].endLan;
			data.action29 = postData.APPLICATION.RULES[29].action;
		}
		else{
			if(postData.APPLICATION.RULES[29].firadd){
				data.firadd29 = "Yes";
				data.firNum29 = postData.APPLICATION.RULES[29].pvcid+1;
				data.fwtotNum29 = 0;
				data.fwdirName29 = postData.APPLICATION.RULES[29].direction;
				data.fwintfName29 = postData.APPLICATION.RULES[29].interface;
			}
			else{
				data.firadd29 = "No";
			}
			data.submitValue29 = "Add";
			data.action29 = postData.APPLICATION.RULES[29].action;
			data.ruleNum29 = postData.APPLICATION.RULES[29].totNum;
			data.totNum29 = postData.APPLICATION.RULES[29].totNum-1;
		//	data.ipType29 = postData.APPLICATION.RULES[29].ipType;
			data.curNum29 = postData.APPLICATION.RULES[29].idRule;
			if(postData.APPLICATION.RULES[29].direction == "In"){
				data.dirName29 = postData.APPLICATION.RULES[29].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[29].direction == "Out"){
				data.dirName29 = postData.APPLICATION.RULES[29].interface+"O6";
			}
			data.srcaddr29 =  postData.APPLICATION.RULES[29].srcaddr;
			data.dstaddr29 = postData.APPLICATION.RULES[29].dstaddr;
			data.protocol29 = postData.APPLICATION.RULES[29].protocol;
			data.startWan29 = postData.APPLICATION.RULES[29].startWan;
			data.endWan29 = postData.APPLICATION.RULES[29].endWan;
			data.startLan29 = postData.APPLICATION.RULES[29].startLan;
			data.endLan29 = postData.APPLICATION.RULES[29].endLan;
			data.pvcid29 = postData.APPLICATION.RULES[29].pvcid;
		}
	}
	else{
		data.submitValue29 = "None";
	}
	if(ruleNum>30){
		if(postData.APPLICATION.RULES[30].idRule != "-1"){
			data.submitValue30 = "Edit";
			data.curNum30 = postData.APPLICATION.RULES[30].idRule;
			if(postData.APPLICATION.RULES[30].direction == "In"){
				data.dirName30 = postData.APPLICATION.RULES[30].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[30].direction == "Out"){
				data.dirName30 = postData.APPLICATION.RULES[30].interface+"O6";
			}
			data.srcaddr30 = postData.APPLICATION.RULES[30].srcaddr;
			data.dstaddr30 = postData.APPLICATION.RULES[30].dstaddr;
			data.protocol30 = postData.APPLICATION.RULES[30].protocol;
			data.startWan30 = postData.APPLICATION.RULES[30].startWan;
			data.endWan30 = postData.APPLICATION.RULES[30].endWan;
			data.startLan30 = postData.APPLICATION.RULES[30].startLan;
			data.endLan30 = postData.APPLICATION.RULES[30].endLan;
			data.action30 = postData.APPLICATION.RULES[30].action;
		}
		else{
			if(postData.APPLICATION.RULES[30].firadd){
				data.firadd30 = "Yes";
				data.firNum30 = postData.APPLICATION.RULES[30].pvcid+1;
				data.fwtotNum30 = 0;
				data.fwdirName30 = postData.APPLICATION.RULES[30].direction;
				data.fwintfName30 = postData.APPLICATION.RULES[30].interface;
			}
			else{
				data.firadd30 = "No";
			}
			data.submitValue30 = "Add";
			data.action30 = postData.APPLICATION.RULES[30].action;
			data.ruleNum30 = postData.APPLICATION.RULES[30].totNum;
			data.totNum30 = postData.APPLICATION.RULES[30].totNum-1;
		//	data.ipType30 = postData.APPLICATION.RULES[30].ipType;
			data.curNum30 = postData.APPLICATION.RULES[30].idRule;
			if(postData.APPLICATION.RULES[30].direction == "In"){
				data.dirName30 = postData.APPLICATION.RULES[30].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[30].direction == "Out"){
				data.dirName30 = postData.APPLICATION.RULES[30].interface+"O6";
			}
			data.srcaddr30 =  postData.APPLICATION.RULES[30].srcaddr;
			data.dstaddr30 = postData.APPLICATION.RULES[30].dstaddr;
			data.protocol30 = postData.APPLICATION.RULES[30].protocol;
			data.startWan30 = postData.APPLICATION.RULES[30].startWan;
			data.endWan30 = postData.APPLICATION.RULES[30].endWan;
			data.startLan30 = postData.APPLICATION.RULES[30].startLan;
			data.endLan30 = postData.APPLICATION.RULES[30].endLan;
			data.pvcid30 = postData.APPLICATION.RULES[30].pvcid;
		}
	}
	else{
		data.submitValue30 = "None";
	}
	if(ruleNum>31){
		if(postData.APPLICATION.RULES[31].idRule != "-1"){
			data.submitValue31 = "Edit";
			data.curNum31 = postData.APPLICATION.RULES[31].idRule;
			if(postData.APPLICATION.RULES[31].direction == "In"){
				data.dirName31 = postData.APPLICATION.RULES[31].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[31].direction == "Out"){
				data.dirName31 = postData.APPLICATION.RULES[31].interface+"O6";
			}
			data.srcaddr31 = postData.APPLICATION.RULES[31].srcaddr;
			data.dstaddr31 = postData.APPLICATION.RULES[31].dstaddr;
			data.protocol31 = postData.APPLICATION.RULES[31].protocol;
			data.startWan31 = postData.APPLICATION.RULES[31].startWan;
			data.endWan31 = postData.APPLICATION.RULES[31].endWan;
			data.startLan31 = postData.APPLICATION.RULES[31].startLan;
			data.endLan31 = postData.APPLICATION.RULES[31].endLan;
			data.action31 = postData.APPLICATION.RULES[31].action;
		}
		else{
			if(postData.APPLICATION.RULES[31].firadd){
				data.firadd31 = "Yes";
				data.firNum31 = postData.APPLICATION.RULES[31].pvcid+1;
				data.fwtotNum31 = 0;
				data.fwdirName31 = postData.APPLICATION.RULES[31].direction;
				data.fwintfName31 = postData.APPLICATION.RULES[31].interface;
			}
			else{
				data.firadd31 = "No";
			}
			data.submitValue31 = "Add";
			data.action31 = postData.APPLICATION.RULES[31].action;
			data.ruleNum31 = postData.APPLICATION.RULES[31].totNum;
			data.totNum31 = postData.APPLICATION.RULES[31].totNum-1;
		//	data.ipType31 = postData.APPLICATION.RULES[31].ipType;
			data.curNum31 = postData.APPLICATION.RULES[31].idRule;
			if(postData.APPLICATION.RULES[31].direction == "In"){
				data.dirName31 = postData.APPLICATION.RULES[31].interface+"I6";
			}
			else if(postData.APPLICATION.RULES[31].direction == "Out"){
				data.dirName31 = postData.APPLICATION.RULES[31].interface+"O6";
			}
			data.srcaddr31 =  postData.APPLICATION.RULES[31].srcaddr;
			data.dstaddr31 = postData.APPLICATION.RULES[31].dstaddr;
			data.protocol31 = postData.APPLICATION.RULES[31].protocol;
			data.startWan31 = postData.APPLICATION.RULES[31].startWan;
			data.endWan31 = postData.APPLICATION.RULES[31].endWan;
			data.startLan31 = postData.APPLICATION.RULES[31].startLan;
			data.endLan31 = postData.APPLICATION.RULES[31].endLan;
			data.pvcid31 = postData.APPLICATION.RULES[31].pvcid;
		}
	}
	else{
		data.submitValue31 = "None";
	}
	//#####################end add or edit

	var url = "/cgi-bin/mhs/returnApplicationv6JSON.asp";
	var callback;
	callback = function(responseData, textStatus) { };
	$.post(url, data, callback, "asp");
	
	
	jQuery.getJSON( '/mhs/APIS/returnResultJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					infoApplications(callback);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
		
}

//returnJSON structure contains an applicationJSON structure
function newApplication(applicationJSON,callback){
	//alert("newApplication entry!");
	/*objectApp.idApplication = Math.random();
	applicationsInfoList[applicationsInfoList.length]=objectApp;
	var applicationsInfoJSON = $.toJSON(applicationsInfoList);
	applicationsInfoJSON="{\"RETURN\":{\"success\": true},\"APPLICATIONS\":"+applicationsInfoJSON +"}";
	$.ajax({
	  	url: '/mhs/jsps/applications.jsp',
	  	dataType: 'json',
	  	data: {
			JSON: applicationsInfoJSON
		},
		type:"POST",
		cache: false,
		success: function(returnData, status){
			if (returnData.RETURN != undefined && returnData.RETURN.success) {
				callback(returnData.RETURN.success, returnData.APPLICATIONS);
			}
			else {
				callback(returnData.RETURN.success, returnData.RETURN.errorDescription);
			}
		},
		error:function(xmlhttprequest, textStatus,errorThrown){
			callback(false,"ERROR_GENERAL");
		}
	});*/

    var currentId = applicationsInfoarray.length;
	 var postData = eval ("(" + applicationJSON + ")");
	 
	 var ruleNum =0;var i=0;
	 ruleNum= postData.APPLICATION.RULES.length;
	 globalNum = 0;
	 /*
	 var data={
		submitValue: "New",
		appid: currentId+1,
		appname: postData.APPLICATION.nameApplication,
		ipAssigned: postData.APPLICATION.ipAssigned,
		iconstr: postData.APPLICATION.idIcon+ "_1",
		ruleNumber: ruleNum
	 };
	for(i=1;i<ruleNum+1;i++)
	{
		var temp = "protocol"+i;
		data[temp]=postData.APPLICATION.RULES[i-1].protocol;
		    temp = "startWan"+i;
		data[temp]=postData.APPLICATION.RULES[i-1].startWan;
		   temp = "endWan"+i;
		data[temp]=postData.APPLICATION.RULES[i-1].endWan;
	}
	$.ajax({
	  	url: 'returnApplicationJSON.asp',
	  	dataType: 'asp',
		type:'post',
		cache: false,
	  	data: data
	});

	*/
	var finishFlag = "NO";
	//alert("ruleNum="+ruleNum);
	var sh;
	sh=setInterval(myNewApplication(ruleNum, postData),1000);
	
	for(i=0;i<ruleNum;i++){
		//alert("ipType="+postData.APPLICATION.RULES[i].ipType);
		//alert("totNum="+postData.APPLICATION.RULES[i].totNum);
		//alert("idRule="+postData.APPLICATION.RULES[i].idRule);
		//alert("protocol="+postData.APPLICATION.RULES[i].protocol);
		//alert("startWan="+postData.APPLICATION.RULES[i].startWan);
		//alert("endWan="+postData.APPLICATION.RULES[i].endWan);
		//alert("startLan="+postData.APPLICATION.RULES[i].startLan);
		//alert("endLan="+postData.APPLICATION.RULES[i].endLan);
		//alert("addr="+postData.APPLICATION.RULES[i].addr);
		//alert("pvcid="+postData.APPLICATION.RULES[i].pvcid);
		if((i+1)==ruleNum){
			//alert("i="+i);
			finishFlag="YES";
		}
		if(postData.APPLICATION.RULES[i].ipType == "IPv6"){
			if(postData.APPLICATION.RULES[i].protocol=="ALL"){
				postData.APPLICATION.RULES[i].protocol="TCPorUDP";
			}
			if(postData.APPLICATION.RULES[i].idRule != "-1"){
				//alert("IPv6 != -1");
				
				$.ajax({
	  				url: '/cgi-bin/mhs/returnApplicationJSON.asp',
	  				dataType: 'asp',
					type:'post',
					cache: false,
	  				data: {
	  					submitValue: "Edit",
						sessionKey: postData.APPLICATION.sessionKey,
						flag:finishFlag,
						curNum:postData.APPLICATION.RULES[i].idRule,
						dirName:"ppp100In",
						active: "Yes",
						addr: postData.APPLICATION.RULES[i].addr,
						protocol: postData.APPLICATION.RULES[i].protocol,
						startWan: postData.APPLICATION.RULES[i].startWan,
						endWan:postData.APPLICATION.RULES[i].endWan,
						startLan:postData.APPLICATION.RULES[i].startLan,
						endLan:postData.APPLICATION.RULES[i].endLan
					}
				});
				
			}
			else{
				//alert("IPv6 == -1");
				$.ajax({
	  				url: '/cgi-bin/mhs/returnApplicationJSON.asp',
	  				dataType: 'asp',
					type:'post',
					cache: false,
	  				data: {
	  					submitValue: "Add",
						sessionKey: postData.APPLICATION.sessionKey,
						appName:"User Define",
						action:"Permit",
						ruleNum:postData.APPLICATION.RULES[i].totNum,
						totNum:postData.APPLICATION.RULES[i].totNum-1,
						ipType:postData.APPLICATION.RULES[i].ipType,
						flag:finishFlag,
						curNum:postData.APPLICATION.RULES[i].idRule,
						dirName:"ppp100In",
						active: "Yes",
						addr: postData.APPLICATION.RULES[i].addr,
						protocol: postData.APPLICATION.RULES[i].protocol,
						startWan: postData.APPLICATION.RULES[i].startWan,
						endWan:postData.APPLICATION.RULES[i].endWan,
						startLan:postData.APPLICATION.RULES[i].startLan,
						endLan:postData.APPLICATION.RULES[i].endLan,
						pvcid:postData.APPLICATION.RULES[i].pvcid
					}
				});
				
			}
		}
		else{
			//alert("IPv4");
			//alert("flag="+finishFlag);
			//alert("addr="+postData.APPLICATION.RULES[i].addr);
			
			$.ajax({
	  			url: '/cgi-bin/mhs/returnApplicationJSON.asp',
	  			dataType: 'asp',
				type:'post',
				cache: false,
	  			data: {
	  				submitValue: "New",
					sessionKey: postData.APPLICATION.sessionKey,
					appName:"User Define",
					flag:finishFlag,
					curNum:i,
					active: "Yes",
					addr: postData.APPLICATION.RULES[i].addr,
					protocol: postData.APPLICATION.RULES[i].protocol,
					startWan: postData.APPLICATION.RULES[i].startWan,
					endWan:postData.APPLICATION.RULES[i].endWan,
					startLan:postData.APPLICATION.RULES[i].startLan,
					endLan:postData.APPLICATION.RULES[i].endLan
				}
			});
			
		}
	}

       jQuery.getJSON( '/mhs/APIS/returnResultJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
							//alert("success before callback!");
					       infoApplications(callback);
				}else{
					//alert("failed before callback!");
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
	
}

function deleteApplication(idApplication,callback){	
	$.ajax({
	  	url: 'returnApplicationJSON.asp',
	  	dataType: 'json',
		type:'post',
		cache: false,
	  	data: {
	  		submitValue: "Del",
			sessionKey: gblsessionKey,
			delflag:"1",
			appid: idApplication
		}
	});
	
}
 
//returnJSON structure contains an applicationJSON structure
function modifyApplication(applicationJSON,callback){	
	var postData = eval ("(" + applicationJSON + ")");
	var appId = postData.APPLICATION.idApplication;
	 var ruleNum =0;var i=0;
	 ruleNum= postData.APPLICATION.RULES.length;
	 
	
	$.ajax({
	  	url: 'returnApplicationJSON.asp',
	  	dataType: 'json',
		type:'post',
		cache: false,
	  	data: {
	  		submitValue: "Del",
			sessionKey: postData.APPLICATION.sessionKey,	
			delflag :"0",
			appid: appId
		}
	});

	var data={
			submitValue:"New",
			sessionKey: postData.APPLICATION.sessionKey,
			ruleNumber: ruleNum,
			appid: appId,
			appname: postData.APPLICATION.nameApplication,
			ipAssigned: postData.APPLICATION.ipAssigned,
			iconstr: postData.APPLICATION.idIcon+"_1"
			};
	for(i=1;i<ruleNum+1;i++)
	{
		var temp="protocol"+i;
		data[temp]=postData.APPLICATION.RULES[i-1].protocol;
		temp = "startWan"+i;
		data[temp]=postData.APPLICATION.RULES[i-1].startWan;
		temp = "endWan"+i;
		data[temp]=postData.APPLICATION.RULES[i-1].endWan;
	}

	
	$.ajax({
	  	url: 'returnApplicationJSON.asp',
	  	dataType: 'json',
		type:'post',
		cache: false,
	  	data: data
	});
	  			
}

function modifyListAssignedApplications(idDevice,applicationsListJSON,callback){
	var i=0;
	var j=0;
	for( ;j<allApplications.length;j++){
		var appAll = allApplications[j];
		if(appAll.ipAssigned == ipDevice){
			appAll.ipAssigned="false";
			appAll.idIcon="false";
		}
	}
	var allApp=allApplications;
	for(j=0;j<allApp.length;j++){
		for( i=0;i<appAssignedDev.length;i++){
			if(allApp[j].idApplication == appAssignedDev[i].idApplication){
				allApp[j].ipAssigned=appAssignedDev[i].ipAssigned;
				allApp[j].idIcon=appAssignedDev[i].idIcon;
			}
		}
	}
	var appListJSON = $.toJSON(allApp);
	appListJSON="{\"RETURN\":{\"success\": true},\"APPLICATION_LIST\":"+appListJSON+"}";
	$.ajax({
	  	url: '/mhs/jsps/conf_devices.jsp',
	  	dataType: 'json',
	  	data: {
			operation: 'modifyListAssignedApp',
			JSON: appListJSON
		},
		type:'POST',
		cache: false,
	  	success: function(returnData, status){
					if (returnData.RETURN != undefined && returnData.RETURN.success) {
 						callback(returnData.RETURN.success,"");
 					}else{
 						callback(false,"ERROR_GENERAL");
 					}
 		},
		error:function(xmlhttprequest, textStatus,errorThrown){
			callback(false,"ERROR_GENERAL");
 		}
 		
	});
}

/*---------------------------*/
/*		 WIFI AND DHCP   	 */
/*---------------------------*/
//returnJSON structure contains a wifiJSON structure
function getWifiInfo(callback){
	$.ajax({
		url: '/mhs/jsps/wifi_get.jsp',
		dataType: 'json',
		type:'POST',
		cache: false,
		success: function(returnData, status){
			if (returnData.RETURN != undefined && returnData.RETURN.success) {
				callback(returnData.RETURN.success, returnData);
			}
			else {
				callback(returnData.RETURN.success, returnData.RETURN.errorDescription);
			}
		}
	});
}

//returnJSON structure 
function setWifiConfiguration(wifiJSON, callback){
	var postData = eval ("(" + wifiJSON + ")");
	var wifistatus= postData.WIFI.status;
	var channelMode=postData.WIFI.channelMode;
	var ruleNum =0;var i=0;
	var WPS_Status = postData.WPS.status;
	
	ruleNum= postData.RULES.length;	
	
	if(ruleNum == 0){
		{
			var macfltmode = postData.WIFI.macfltmode;
			if ( macfltmode == 1 && WPS_Status != 0){
				alert("MAC Filter mode set to Allow,but there is not any rule,so we disable WPS.");
				WPS_Status = 0; //MAC FLT select allow,but no any rule ,disable WPS
			}
		}
	}
	
	var data = {
		sessionKey: postData.KEY.sessionKey
	};
	
	if(ruleNum > 0){
   			data.MACAddr0 = postData.RULES[ruleNum-1].wifiMac;
			data.MACAction0 = postData.RULES[ruleNum-1].action;
	}else{
	        data.MACAddr0 = "";
			data.MACAction0 = "";
	}

	if(ruleNum > 1){
	        data.MACAddr1 = postData.RULES[ruleNum-2].wifiMac;
			data.MACAction1 = postData.RULES[ruleNum-2].action;
	}
	else{
	        data.MACAddr1 = "";
			data.MACAction1 = "";
	}

	if(ruleNum > 2){
	        data.MACAddr2 = postData.RULES[ruleNum-3].wifiMac;
			data.MACAction2 = postData.RULES[ruleNum-3].action;
	}
	else{
	        data.MACAddr2 = "";
			data.MACAction2 = "";
	}

	if(ruleNum > 3){
	        data.MACAddr3 = postData.RULES[ruleNum-4].wifiMac;
			data.MACAction3 = postData.RULES[ruleNum-4].action;
	}
	else{
	        data.MACAddr3 = "";
			data.MACAction3 = "";
	}

	if(ruleNum > 4){
	        data.MACAddr4 = postData.RULES[ruleNum-5].wifiMac;
			data.MACAction4 = postData.RULES[ruleNum-5].action;
	}
	else{
	        data.MACAddr4 = "";
			data.MACAction4 = "";
	}

	if(ruleNum > 5){
	        data.MACAddr5 = postData.RULES[ruleNum-6].wifiMac;
			data.MACAction5 = postData.RULES[ruleNum-6].action;
	}
	else{
	        data.MACAddr5 = "";
			data.MACAction5 = "";
	}

	if(ruleNum > 6){
	        data.MACAddr6 = postData.RULES[ruleNum-7].wifiMac;
			data.MACAction6 = postData.RULES[ruleNum-7].action;			
	}
	else{
	        data.MACAddr6 = "";
			data.MACAction6 = "";
	}

	if(ruleNum > 7){
	        data.MACAddr7 = postData.RULES[ruleNum-8].wifiMac;
			data.MACAction7 = postData.RULES[ruleNum-8].action;
	}
	else{
	        data.MACAddr7 = "";
			data.MACAction7 = "";
	}

	if(ruleNum > 8){
	        data.MACAddr8 = postData.RULES[ruleNum-9].wifiMac;
			data.MACAction8 = postData.RULES[ruleNum-9].action;
	}
	else{
	        data.MACAddr8 = "";
			data.MACAction8 = "";
	}

	if(ruleNum > 9){
	        data.MACAddr9 = postData.RULES[ruleNum-10].wifiMac;
			data.MACAction9 = postData.RULES[ruleNum-10].action;
	}
	else{
	        data.MACAddr9 = "";
			data.MACAction9 = "";
	}

	if(ruleNum > 10){
	        data.MACAddr10 = postData.RULES[ruleNum-11].wifiMac;
			data.MACAction10 = postData.RULES[ruleNum-11].action;
	}
	else{
	        data.MACAddr10 = "";
			data.MACAction10 = "";
	}

	if(ruleNum > 11){
	        data.MACAddr11 = postData.RULES[ruleNum-12].wifiMac;
			data.MACAction11 = postData.RULES[ruleNum-12].action;
	}
	else{
	        data.MACAddr11 = "";
			data.MACAction11 = "";
	}

	if(ruleNum > 12){
	        data.MACAddr12 = postData.RULES[ruleNum-13].wifiMac;
			data.MACAction12 = postData.RULES[ruleNum-13].action;
	}
	else{
	        data.MACAddr12 = "";
			data.MACAction12 = "";
	}

	if(ruleNum > 13){
	        data.MACAddr13 = postData.RULES[ruleNum-14].wifiMac;
			data.MACAction13 = postData.RULES[ruleNum-14].action;
	}
	else{
	        data.MACAddr13 = "";
			data.MACAction13 = "";
	}

	if(ruleNum > 14){
	        data.MACAddr14 = postData.RULES[ruleNum-15].wifiMac;
			data.MACAction14 = postData.RULES[ruleNum-14].action;
	}
	else{
	        data.MACAddr14 = "";
			data.MACAction14 = "";
	}

	if(ruleNum > 15){
	        data.MACAddr15 = postData.RULES[ruleNum-16].wifiMac;
			data.MACAction15 = postData.RULES[ruleNum-16].action;
	}
	else{
	        data.MACAddr15 = "";
			data.MACAction15 = "";
	}

	if(ruleNum > 16){
	        data.MACAddr16 = postData.RULES[ruleNum-17].wifiMac;
			data.MACAction16 = postData.RULES[ruleNum-17].action;
	}
	else{
	        data.MACAddr16 = "";
			data.MACAction16 = "";
	}

	if(ruleNum > 17){
	        data.MACAddr17 = postData.RULES[ruleNum-18].wifiMac;
			data.MACAction17 = postData.RULES[ruleNum-18].action;
	}
	else{
	        data.MACAddr17 = "";
			data.MACAction17 = "";
	}

	if(ruleNum > 18){
	        data.MACAddr18 = postData.RULES[ruleNum-19].wifiMac;
			data.MACAction18 = postData.RULES[ruleNum-19].action;
	}
	else{
	        data.MACAddr18 = "";
			data.MACAction18 = "";
	}

	if(ruleNum > 19){
	        data.MACAddr19 = postData.RULES[ruleNum-20].wifiMac;
			data.MACAction19 = postData.RULES[ruleNum-20].action;
	}
	else{
	        data.MACAddr19 = "";
			data.MACAction19 = "";
	}

	if(ruleNum > 20){
	        data.MACAddr20 = postData.RULES[ruleNum-21].wifiMac;
			data.MACAction20 = postData.RULES[ruleNum-21].action;
	}
	else{
	        data.MACAddr20 = "";
			data.MACAction20 = "";
	}

	if(ruleNum > 21){
	        data.MACAddr21 = postData.RULES[ruleNum-22].wifiMac;
			data.MACAction21 = postData.RULES[ruleNum-22].action;
	}
	else{
	        data.MACAddr21 = "";
			data.MACAction21 = "";
	}

	if(ruleNum > 22){
	        data.MACAddr22 = postData.RULES[ruleNum-23].wifiMac;
			data.MACAction22 = postData.RULES[ruleNum-23].action;
	}
	else{
	        data.MACAddr22 = "";
			data.MACAction22 = "";
	}

	if(ruleNum > 23){
	        data.MACAddr23 = postData.RULES[ruleNum-24].wifiMac;
			data.MACAction23 = postData.RULES[ruleNum-24].action;
	}
	else{
	        data.MACAddr23 = "";
			data.MACAction23 = "";
	}

	if(ruleNum > 24){
	        data.MACAddr24 = postData.RULES[ruleNum-25].wifiMac;
			data.MACAction24 = postData.RULES[ruleNum-25].action;
	}
	else{
	        data.MACAddr24 = "";
			data.MACAction24 = "";
	}

	if(ruleNum > 25){
	        data.MACAddr25 = postData.RULES[ruleNum-26].wifiMac;
			data.MACAction25 = postData.RULES[ruleNum-26].action;
	}
	else{
	        data.MACAddr25 = "";
			data.MACAction25 = "";
	}

	if(ruleNum > 26){
	        data.MACAddr26 = postData.RULES[ruleNum-27].wifiMac;
			data.MACAction26 = postData.RULES[ruleNum-27].action;
	}
	else{
	        data.MACAddr26 = "";
			data.MACAction26 = "";
	}

	if(ruleNum > 27){
	        data.MACAddr27 = postData.RULES[ruleNum-28].wifiMac;
			data.MACAction27 = postData.RULES[ruleNum-28].action;
	}
	else{
	        data.MACAddr27 = "";
			data.MACAction27 = "";
	}

	if(ruleNum > 28){
	        data.MACAddr28 = postData.RULES[ruleNum-29].wifiMac;
			data.MACAction28 = postData.RULES[ruleNum-29].action;
	}
	else{
	        data.MACAddr28 = "";
			data.MACAction28 = "";
	}

	if(ruleNum > 29){
	        data.MACAddr29 = postData.RULES[ruleNum-30].wifiMac;
			data.MACAction29 = postData.RULES[ruleNum-30].action;
	}
	else{
	        data.MACAddr29 = "";
			data.MACAction29 = "";
	}

	if(ruleNum > 30){
	        data.MACAddr30 = postData.RULES[ruleNum-31].wifiMac;
			data.MACAction30 = postData.RULES[ruleNum-31].action;
	}
	else{
	        data.MACAddr30 = "";
			data.MACAction30 = "";
	}

	if(ruleNum > 31){
	        data.MACAddr31 = postData.RULES[ruleNum-32].wifiMac;
			data.MACAction31 = postData.RULES[ruleNum-32].action;
	}
	else{
	        data.MACAddr31 = "";
			data.MACAction31 = "";
	}

	if(wifistatus){
		postData.WIFI.status=1;
		data.sessionKey 	= 	postData.KEY.sessionKey;
		data.ssidName 		= 	postData.WIFI.ssidName;
		data.wifistatus 	=	postData.WIFI.status;
		data.wifiVisible	=	postData.WIFI.ssidVisibility;
		data.wifiEnable 	=	postData.WIFI.enableWireless;
		data.channelMode	=	postData.WIFI.channelMode;
		data.wifichannel	=	postData.WIFI.channel;
		data.securityMode	=	postData.WIFI.SECURITY.cipherAlgorithm;
		data.EncrypType		=	postData.WIFI.SECURITY.EncrypType;
		data.WEPKey			=	postData.WIFI.SECURITY.passwordWEP;
		data.WPA2Key		=	postData.WIFI.SECURITY.passwordWPA2;
		data.RADIUSServer	=	postData.WIFI.SECURITY.RADIUS_Server;
		data.RADIUSPort		=	postData.WIFI.SECURITY.RADIUS_Port;
		data.RADIUSKey		=	postData.WIFI.SECURITY.RADIUS_Key;
		data.wlFltMacMode	=	postData.WIFI.macfltmode;
		data.WPSStatus		=	WPS_Status;
		data.action			= 	"submit";
	}
	else{
		postData.WIFI.status=0;
		data.wifistatus 	=	postData.WIFI.status;
		data.WPSStatus		=	WPS_Status;
	}
	
	var url = "/mhs_loging.cmd";
	var callback = function(responseData, textStatus){ 
		window.location.href="/mhs_loging.cmd";
	};
	$.post(url, data, callback, "cmd");
	
/*
	$.openLoadingMask(1);
	setTimeout(function(){$.closeLoadingMask(1);}, 15000);	
	closeDialog();
*/	
}

function setWifi5gConfiguration(wifiJSON, callback){
	var postData = eval ("(" + wifiJSON + ")");
	var wifistatus= postData.WIFI.status;
	var channelMode=postData.WIFI.channelMode;
	var ruleNum =0;var i=0;
	var WPS_Status = postData.WPS.status;
    var ssidVisibility = postData.WIFI.ssidVisibility;
	var WscMode  = '<%ejGetExtWl(wlWscMode)%>';
	ruleNum= postData.RULES.length;	
	
	if(ruleNum == 0){
		//var MACAddr0=postData.RULES[0].wifiMac;
		//if(MACAddr0=="")
		{
			var macfltmode = postData.WIFI.macfltmode;

			if ( (macfltmode == "allow" || ssidVisibility == 1) && WscMode != "disabled"){
				//alert("MAC Filter mode set to Allow,but there is not any rule,so we disable WPS.");
				WPS_Status = "disabled"; //MAC FLT select allow,but no any rule ,disable WPS
				alert("El WPS se desactivara automáticamente ya que usted habilitó el filtro de Mac pero lo ha dejado vacío");
			}
			else if ( macfltmode == "disabled" && ssidVisibility == 0 && WscMode != "enabled"){
				WPS_Status = "configured"; //MAC FLT select disabled and no any rule ,enable WPS
				alert("Si se deshabilita el filtro de MAC pero deja la lista vacía, el WPS se activara automáticamente");
			}
			else
			{
				; // For coverity
			}
		}
	}
	
	var data = {
		sessionKey: postData.KEY.sessionKey
	};
	
	if(ruleNum > 0){
   			data.MACAddr0 = postData.RULES[ruleNum-1].wifiMac;
			data.MACAction0 = postData.RULES[ruleNum-1].action;
	}else{
	        data.MACAddr0 = "";
			data.MACAction0 = "";
	}

	if(ruleNum > 1){
	        data.MACAddr1 = postData.RULES[ruleNum-2].wifiMac;
			data.MACAction1 = postData.RULES[ruleNum-2].action;
	}
	else{
	        data.MACAddr1 = "";
			data.MACAction1 = "";
	}

	if(ruleNum > 2){
	        data.MACAddr2 = postData.RULES[ruleNum-3].wifiMac;
			data.MACAction2 = postData.RULES[ruleNum-3].action;
	}
	else{
	        data.MACAddr2 = "";
			data.MACAction2 = "";
	}

	if(ruleNum > 3){
	        data.MACAddr3 = postData.RULES[ruleNum-4].wifiMac;
			data.MACAction3 = postData.RULES[ruleNum-4].action;
	}
	else{
	        data.MACAddr3 = "";
			data.MACAction3 = "";
	}

	if(ruleNum > 4){
	        data.MACAddr4 = postData.RULES[ruleNum-5].wifiMac;
			data.MACAction4 = postData.RULES[ruleNum-5].action;
	}
	else{
	        data.MACAddr4 = "";
			data.MACAction4 = "";
	}

	if(ruleNum > 5){
	        data.MACAddr5 = postData.RULES[ruleNum-6].wifiMac;
			data.MACAction5 = postData.RULES[ruleNum-6].action;
	}
	else{
	        data.MACAddr5 = "";
			data.MACAction5 = "";
	}

	if(ruleNum > 6){
	        data.MACAddr6 = postData.RULES[ruleNum-7].wifiMac;
			data.MACAction6 = postData.RULES[ruleNum-7].action;			
	}
	else{
	        data.MACAddr6 = "";
			data.MACAction6 = "";
	}

	if(ruleNum > 7){
	        data.MACAddr7 = postData.RULES[ruleNum-8].wifiMac;
			data.MACAction7 = postData.RULES[ruleNum-8].action;
	}
	else{
	        data.MACAddr7 = "";
			data.MACAction7 = "";
	}

	if(ruleNum > 8){
	        data.MACAddr8 = postData.RULES[ruleNum-9].wifiMac;
			data.MACAction8 = postData.RULES[ruleNum-9].action;
	}
	else{
	        data.MACAddr8 = "";
			data.MACAction8 = "";
	}

	if(ruleNum > 9){
	        data.MACAddr9 = postData.RULES[ruleNum-10].wifiMac;
			data.MACAction9 = postData.RULES[ruleNum-10].action;
	}
	else{
	        data.MACAddr9 = "";
			data.MACAction9 = "";
	}

	if(ruleNum > 10){
	        data.MACAddr10 = postData.RULES[ruleNum-11].wifiMac;
			data.MACAction10 = postData.RULES[ruleNum-11].action;
	}
	else{
	        data.MACAddr10 = "";
			data.MACAction10 = "";
	}

	if(ruleNum > 11){
	        data.MACAddr11 = postData.RULES[ruleNum-12].wifiMac;
			data.MACAction11 = postData.RULES[ruleNum-12].action;
	}
	else{
	        data.MACAddr11 = "";
			data.MACAction11 = "";
	}

	if(ruleNum > 12){
	        data.MACAddr12 = postData.RULES[ruleNum-13].wifiMac;
			data.MACAction12 = postData.RULES[ruleNum-13].action;
	}
	else{
	        data.MACAddr12 = "";
			data.MACAction12 = "";
	}

	if(ruleNum > 13){
	        data.MACAddr13 = postData.RULES[ruleNum-14].wifiMac;
			data.MACAction13 = postData.RULES[ruleNum-14].action;
	}
	else{
	        data.MACAddr13 = "";
			data.MACAction13 = "";
	}

	if(ruleNum > 14){
	        data.MACAddr14 = postData.RULES[ruleNum-15].wifiMac;
			data.MACAction14 = postData.RULES[ruleNum-14].action;
	}
	else{
	        data.MACAddr14 = "";
			data.MACAction14 = "";
	}

	if(ruleNum > 15){
	        data.MACAddr15 = postData.RULES[ruleNum-16].wifiMac;
			data.MACAction15 = postData.RULES[ruleNum-16].action;
	}
	else{
	        data.MACAddr15 = "";
			data.MACAction15 = "";
	}

	if(ruleNum > 16){
	        data.MACAddr16 = postData.RULES[ruleNum-17].wifiMac;
			data.MACAction16 = postData.RULES[ruleNum-17].action;
	}
	else{
	        data.MACAddr16 = "";
			data.MACAction16 = "";
	}

	if(ruleNum > 17){
	        data.MACAddr17 = postData.RULES[ruleNum-18].wifiMac;
			data.MACAction17 = postData.RULES[ruleNum-18].action;
	}
	else{
	        data.MACAddr17 = "";
			data.MACAction17 = "";
	}

	if(ruleNum > 18){
	        data.MACAddr18 = postData.RULES[ruleNum-19].wifiMac;
			data.MACAction18 = postData.RULES[ruleNum-19].action;
	}
	else{
	        data.MACAddr18 = "";
			data.MACAction18 = "";
	}

	if(ruleNum > 19){
	        data.MACAddr19 = postData.RULES[ruleNum-20].wifiMac;
			data.MACAction19 = postData.RULES[ruleNum-20].action;
	}
	else{
	        data.MACAddr19 = "";
			data.MACAction19 = "";
	}

	if(ruleNum > 20){
	        data.MACAddr20 = postData.RULES[ruleNum-21].wifiMac;
			data.MACAction20 = postData.RULES[ruleNum-21].action;
	}
	else{
	        data.MACAddr20 = "";
			data.MACAction20 = "";
	}

	if(ruleNum > 21){
	        data.MACAddr21 = postData.RULES[ruleNum-22].wifiMac;
			data.MACAction21 = postData.RULES[ruleNum-22].action;
	}
	else{
	        data.MACAddr21 = "";
			data.MACAction21 = "";
	}

	if(ruleNum > 22){
	        data.MACAddr22 = postData.RULES[ruleNum-23].wifiMac;
			data.MACAction22 = postData.RULES[ruleNum-23].action;
	}
	else{
	        data.MACAddr22 = "";
			data.MACAction22 = "";
	}

	if(ruleNum > 23){
	        data.MACAddr23 = postData.RULES[ruleNum-24].wifiMac;
			data.MACAction23 = postData.RULES[ruleNum-24].action;
	}
	else{
	        data.MACAddr23 = "";
			data.MACAction23 = "";
	}

	if(ruleNum > 24){
	        data.MACAddr24 = postData.RULES[ruleNum-25].wifiMac;
			data.MACAction24 = postData.RULES[ruleNum-25].action;
	}
	else{
	        data.MACAddr24 = "";
			data.MACAction24 = "";
	}

	if(ruleNum > 25){
	        data.MACAddr25 = postData.RULES[ruleNum-26].wifiMac;
			data.MACAction25 = postData.RULES[ruleNum-26].action;
	}
	else{
	        data.MACAddr25 = "";
			data.MACAction25 = "";
	}

	if(ruleNum > 26){
	        data.MACAddr26 = postData.RULES[ruleNum-27].wifiMac;
			data.MACAction26 = postData.RULES[ruleNum-27].action;
	}
	else{
	        data.MACAddr26 = "";
			data.MACAction26 = "";
	}

	if(ruleNum > 27){
	        data.MACAddr27 = postData.RULES[ruleNum-28].wifiMac;
			data.MACAction27 = postData.RULES[ruleNum-28].action;
	}
	else{
	        data.MACAddr27 = "";
			data.MACAction27 = "";
	}

	if(ruleNum > 28){
	        data.MACAddr28 = postData.RULES[ruleNum-29].wifiMac;
			data.MACAction28 = postData.RULES[ruleNum-29].action;
	}
	else{
	        data.MACAddr28 = "";
			data.MACAction28 = "";
	}

	if(ruleNum > 29){
	        data.MACAddr29 = postData.RULES[ruleNum-30].wifiMac;
			data.MACAction3 = postData.RULES[ruleNum-30].action;
	}
	else{
	        data.MACAddr29 = "";
			data.MACAction29 = "";
	}

	if(ruleNum > 30){
	        data.MACAddr30 = postData.RULES[ruleNum-31].wifiMac;
			data.MACAction3 = postData.RULES[ruleNum-31].action;
	}
	else{
	        data.MACAddr30 = "";
			data.MACAction30 = "";
	}

	if(ruleNum > 31){
	        data.MACAddr31 = postData.RULES[ruleNum-32].wifiMac;
			data.MACAction3 = postData.RULES[ruleNum-32].action;
	}
	else{
	        data.MACAddr31 = "";
			data.MACAction31 = "";
	}

	if(wifistatus){
		postData.WIFI.status=1;
		data.sessionKey 	= 	postData.KEY.sessionKey;
		data.ssidName 		= 	postData.WIFI.ssidName;
		data.wifistatus 	=	postData.WIFI.status;	
		data.wifiVisible	=	postData.WIFI.ssidVisibility;
		data.wifiEnable 	=	postData.WIFI.enableWireless;			
		data.channelMode	=	postData.WIFI.channelMode;
		data.wifichannel	=	postData.WIFI.channel;
		data.securityMode	=	postData.WIFI.SECURITY.cipherAlgorithm;
		data.EncrypType		=	postData.WIFI.SECURITY.EncrypType;
		data.WEPKey			=	postData.WIFI.SECURITY.passwordWEP;
		data.WPA2Key		=	postData.WIFI.SECURITY.passwordWPA2;
		data.RADIUSServer	=	postData.WIFI.SECURITY.RADIUS_Server;
		data.RADIUSPort		=	postData.WIFI.SECURITY.RADIUS_Port;
		data.RADIUSKey		=	postData.WIFI.SECURITY.RADIUS_Key;
		data.wlFltMacMode	=	postData.WIFI.macfltmode;
		data.WPSStatus		=	WPS_Status;
		data.action			= 	"submit";
	}
	else{
		postData.WIFI.status=0;
		data.wifistatus 	=	postData.WIFI.status;
		data.WPSStatus		=	WPS_Status;
	}
	
	var url = "/mhs_wifi5g.cmd";
	var callback = function(responseData, textStatus){ 
		window.location.href="/mhs_wifi5g.cmd";
	};
	$.post(url, data, callback, "cmd");
	
/*
	$.openLoadingMask(1);
	setTimeout(function(){$.closeLoadingMask(1);}, 15000);	
	closeDialog();
*/
}

//returnJSON structure 
function setWifiSecondConfiguration(wifiJSON, callback){
	var postData = eval ("(" + wifiJSON + ")");
	var wifistatus= postData.WIFI.status;
	var ruleNum =0;var i=0;
	
	var data = {
		sessionKey: postData.KEY.sessionKey
	};

	if(wifistatus){
		postData.WIFI.status=1;
		data.sessionKey 	= 	postData.KEY.sessionKey;
		data.ssidName 		= 	postData.WIFI.ssidName;
		data.wifistatus 	=	postData.WIFI.status;
		data.wifiEnable 	=	postData.WIFI.enableWireless;
		data.securityMode	=	postData.WIFI.SECURITY.cipherAlgorithm;
		data.EncrypType		=	postData.WIFI.SECURITY.EncrypType;
		data.WEPKey			=	postData.WIFI.SECURITY.passwordWEP;
		data.WPA2Key		=	postData.WIFI.SECURITY.passwordWPA2;
		data.RADIUSServer	=	postData.WIFI.SECURITY.RADIUS_Server;
		data.RADIUSPort		=	postData.WIFI.SECURITY.RADIUS_Port;
		data.RADIUSKey		=	postData.WIFI.SECURITY.RADIUS_Key;
		data.action			= 	"submit";
	}
	else{
		postData.WIFI.status=0;
		data.wifistatus 	=	postData.WIFI.status;
	}

	var url = "/mhs_wifisecond.cmd";
	var callback = function(responseData, textStatus){ 
		window.location.href="/mhs_wifisecond.cmd";
	};
	$.post(url, data, callback, "cmd");
	
/*
	$.openLoadingMask(1);
	setTimeout(function(){$.closeLoadingMask(1);}, 15000);	
	closeDialog();
*/	
}

/*---------------------------*/
/*		 LANv4 AND DHCP   	 */
/*---------------------------*/
//returnJSON structure contains a lanv4JSON structure
function getLANv4Info(callback){
	$.ajax({
		url: '/mhs/jsps/wifi_get.jsp',
		dataType: 'json',
		type:'POST',
		cache: false,
		success: function(returnData, status){
			if (returnData.RETURN != undefined && returnData.RETURN.success) {
				callback(returnData.RETURN.success, returnData);
			}
			else {
				callback(returnData.RETURN.success, returnData.RETURN.errorDescription);
			}
		}
	});
}

//returnJSON structure 
function setLANConfiguration(LANJSON, callback){
	var postData = eval ("(" + LANJSON + ")");
	var dhcpstatusv4= postData.DHCPV4.status;


	if(dhcpstatusv4)
	{
	postData.DHCPV4.status=1;
	$.ajax({
	  	url: '/cgi-bin/mhs/returnLANJSON.asp',
	  	dataType: 'json',
		type:'post',
		cache: false,
	  	data: {
	  		submitValue: "Apply",
			sessionKey: postData.KEY.sessionKey,
			IPAddrv4: postData.LANV4.IPAddr,
			Maskv4: postData.LANV4.Mask,
			dhcpstatusv4: postData.DHCPV4.status,		
			poolStartv4: postData.DHCPV4.poolStart,
			PoolSizev4:postData.DHCPV4.PoolSize,
			PrimaryDnsv4: postData.DNSV4.PrimaryDns,
			SecondDnsv4: postData.DNSV4.SecondDns
		}
	});
    }
        else
	{
		postData.DHCPV4.status=0;
		$.ajax({
	  	url: '/cgi-bin/mhs/returnLANJSON.asp',
	  	dataType: 'json',
		type:'post',
		cache: false,
	  	data: {
	  		submitValue: "Apply",
			sessionKey: postData.KEY.sessionKey,
			IPAddrv4: postData.LANV4.IPAddr,
			Maskv4: postData.LANV4.Mask,
			dhcpstatusv4: postData.DHCPV4.status
		}
		});
	}

	var dhcpstatusv6= postData.DHCPV6.status;
	
	if(dhcpstatusv6)
	{
	postData.DHCPV6.status=1;
	$.ajax({
	  	url: '/cgi-bin/mhs/returnLANJSON.asp',
	  	dataType: 'json',
		type:'post',
		cache: false,
	  	data: {
	  		submitValue: "Apply",
			sessionKey: postData.KEY.sessionKey,
			IPAddrv6: postData.LANV6.IPAddr,
			Maskv6: postData.LANV6.Mask,
			dhcpstatusv6: postData.DHCPV6.status,		
			poolStartv6: postData.DHCPV6.poolStart,
			PoolSizev6:postData.DHCPV6.PoolSize,
			auto:postData.DHCPV6.auto,
			PrimaryDnsv6: postData.DNSV6.PrimaryDns,
			SecondDnsv6: postData.DNSV6.SecondDns
		}
	});
    }
        else
	{
		postData.DHCPV6.status=0;
		$.ajax({
	  	url: '/cgi-bin/mhs/returnLANJSON.asp',
	  	dataType: 'json',
		type:'post',
		cache: false,
	  	data: {
	  		submitValue: "Apply",
			sessionKey: postData.KEY.sessionKey,
			IPAddrv6: postData.LANV6.IPAddr,
			Maskv6: postData.LANV6.Mask,
			dhcpstatusv6: postData.DHCPV6.status
		}
	});
}
		$.openLoadingMask(1);
		setTimeout(function(){$.closeLoadingMask(1);}, 18000);	
		closeDialog();
}

/*---------------------------*/
/*		 LANv6 AND DHCP   	 */
/*---------------------------*/
//returnJSON structure contains a lanv4JSON structure
function getLANv6Info(callback){
	$.ajax({
		url: '/mhs/jsps/wifi_get.jsp',
		dataType: 'json',
		type:'POST',
		cache: false,
		success: function(returnData, status){
			if (returnData.RETURN != undefined && returnData.RETURN.success) {
				callback(returnData.RETURN.success, returnData);
			}
			else {
				callback(returnData.RETURN.success, returnData.RETURN.errorDescription);
			}
		}
	});
}

//returnJSON structure 
function setLANv6Configuration(LANv4JSON, callback){
	var postData = eval ("(" + LANv4JSON + ")");
	var dhcpstatus= postData.DHCP.status;
	
	
	if(dhcpstatus)
	{
	postData.DHCP.status=1;
	$.ajax({
	  	url: '/cgi-bin/mhs/returnLANv6JSON.asp',
	  	dataType: 'json',
		type:'post',
		cache: false,
	  	data: {
	  		submitValue: "Apply",
			sessionKey: postData.KEY.sessionKey,
			IPAddr: postData.LAN.IPAddr,
			Mask: postData.LAN.Mask,
			dhcpstatus: postData.DHCP.status,		
			poolStart: postData.DHCP.poolStart,
			PoolSize:postData.DHCP.PoolSize,
			PrimaryDns: postData.DNS.PrimaryDns,
			SecondDns: postData.DNS.SecondDns
		}
	});
    }
        else
	{
		postData.DHCP.status=0;
		$.ajax({
	  	url: '/cgi-bin/mhs/returnLANv6JSON.asp',
	  	dataType: 'json',
		type:'post',
		cache: false,
	  	data: {
	  		submitValue: "Apply",
			sessionKey: postData.KEY.sessionKey,
			IPAddr: postData.LAN.IPAddr,
			Mask: postData.LAN.Mask,
			dhcpstatus: postData.DHCP.status
		}
	});
}
		closeDialog();
}

/*---------------------------*/
/*		 ROUTER AND BRIDGE   	 */
/*---------------------------*/
//returnJSON structure contains a lanv4JSON structure
function getLANv4Info(callback){
	$.ajax({
		url: '/mhs/jsps/wifi_get.jsp',
		dataType: 'json',
		type:'POST',
		cache: false,
		success: function(returnData, status){
			if (returnData.RETURN != undefined && returnData.RETURN.success) {
				callback(returnData.RETURN.success, returnData);
			}
			else {
				callback(returnData.RETURN.success, returnData.RETURN.errorDescription);
			}
		}
	});
}

//returnJSON structure 
function setrouterConfiguration(RouterJSON, callback){
	var postData = eval ("(" + RouterJSON + ")");
	var isp = postData.ROUTER.ISP;

	{                      //Router
		$.ajax({
	  	url: '/cgi-bin/mhs/returnRouterJSON.asp',
	  	dataType: 'json',
		type:'post',
		cache: false,
	  	data: {
	  		submitValue: "Apply",
			isp: postData.ROUTER.ISP,
			encap: postData.ROUTER.ENCAP
		}
	});
	}
		setTimeout("$('#panel_content').load('/cgi-bin/mhs/html/networkMap/network_map.html', function(){reloadTextsDiv('panel_content');});",0);
		$.openLoadingMask(1);
		setTimeout(function(){$.closeLoadingMask(1);}, 5000);			
		closeDialog();
}

/*-------------------*/
/*		  USB   	 */
/*-------------------*/
//returnJSON structure contains a usbJSON structure
function getUSBInfo(serialNumber,callback){
	jQuery.getJSON( '/mhs/APIS/returnUsbJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.USB);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
	);
}
/*----------------------------*/
/*		  Welcome Splash  	  */
/*----------------------------*/
//returnJSON structure contains an welcomeInfoJSON structure
function urlWelcomeSplash(callback){
	jQuery.getJSON( '/mhs/APIS/returnWelcomeInfoJSON.txt', 
			function(returnData, status){
				if(returnData.RETURN.success){
					callback(returnData.RETURN.success,returnData.URL);
				}else{
					callback(returnData.RETURN.success,returnData.RETURN.errorDescription);
				}
			}
		);
}

/*-------------------*/
/*	ChangePassword  	 */
/*-------------------*/
//returnJSON structure 
function setPassConfiguration(passJSON, callback){
	var postData = eval ("(" + passJSON + ")");
	var newpass= postData.PASS.newpass;
	$.ajax({
	  	url: '/cgi-bin/mhs/returnPassJSON.asp',
	  	dataType: 'json',
		type:'post',
		cache: false,
	  	data: {
	  		submitValue: "Apply",
			sessionKey: postData.KEY.sessionKey,
			newpass: postData.PASS.newpass
		}
	});
			closeDialog();
}

function detectAgent() {
	var gAgent = navigator.userAgent;
	var browser;
	if(gAgent.indexOf("MSIE")!=-1) {
		browser = "MSIE";
        }
	return browser;
}
