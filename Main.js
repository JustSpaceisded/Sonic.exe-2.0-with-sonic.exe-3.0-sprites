function getParameterByName(name, url = window.location.href) {
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
	results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function stripQueryStringAndHashFromPath(url) {
	return url.split("?")[0].split("#")[0];
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

if (window.localStorage.getItem("ThemeNum") == null)
{
	window.localStorage.setItem("ThemeNum",0);
}

var BackgroundThemes;
var ThemeTableLength;

function UpdateTheme()
{
	var Theme = BackgroundThemes[String(window.localStorage.getItem("ThemeNum"))];
	document.getElementById("ThemeButton").innerHTML = "Theme: " + Theme;
	document.getElementById("BackgroundC").style = "position: fixed; height: 100vh; width: 100vw; top: 0px; object-fit: cover; z-index: -1; -moz-user-select: none; -webkit-user-select: none; user-select: none;";
	document.getElementById("BackgroundC").src = "./Assets/Images/Pages/Main/Backgrounds/" + Theme + "Background.png";
	document.getElementById("NavBarBackground").style = style=" position: absolute; width:100%; height: 50px; background-image: url('./Assets/Images/Pages/Main/NavBar/" + Theme + "Bar.png'); background-size: auto 50px;";
	
}

function SetNextTheme()
{
	var Num = Number(window.localStorage.getItem("ThemeNum")) + 1;

	if (Num >= Number(ThemeTableLength))
	{
		window.localStorage.setItem("ThemeNum",0);
	}
	else
	{
		window.localStorage.setItem("ThemeNum",Num);
	}
	
	UpdateTheme();
}

function SetPreviousTheme()
{
	var Num = Number(window.localStorage.getItem("ThemeNum")) - 1;

	if (Num < 0)
	{
		window.localStorage.setItem("ThemeNum",Number(ThemeTableLength) - 1);
	}
	else
	{
		window.localStorage.setItem("ThemeNum",Num);
	}
	
	UpdateTheme();
}

var LoadHTML;

var CurrentHTML;

$(document).ready(function(){
	LoadHTML = function (HTMLFile,Query)
	{
		var OpenLink;
		if (Query)
		{
			OpenLink = stripQueryStringAndHashFromPath(window.location.href) + "?m=" + HTMLFile + "&" + Query;
		}
		else
		{
			OpenLink = stripQueryStringAndHashFromPath(window.location.href) + "?m=" + HTMLFile;
		}
		if (OpenLink != window.location.href)
		{
			window.open(OpenLink,"_self");
		}
	}
	var Opened = getParameterByName("m");
	if (Opened)
	{
		$('#WebContent').load("./Pages/" + Opened + ".html");
	}
	else
	{
		window.open(stripQueryStringAndHashFromPath(window.location.href) + "?m=" + "Home","_self");
	}
	var url = "./ThemesData.json";
	$.getJSON(url, function(data) 
	{
		BackgroundThemes = data;
		ThemeTableLength = Object.keys(data).length;
		UpdateTheme();
	})
});