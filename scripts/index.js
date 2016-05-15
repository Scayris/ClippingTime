$( document ).ready(function() {
    console.log( "ready!" );
    
    document.querySelector("#calendar-button").addEventListener('click', posodobiCalendar);
    document.querySelector("#notes_text").style.display = "none";
    document.querySelector("#notes_button").addEventListener('click', addTextField);
    document.querySelector("#remove_notes_button").addEventListener('click', removeTextField);
    document.querySelector("#send_button").addEventListener('click', refresh_bus);
    //schedule();
    lpp("bavarski", "6");
    menjajCitate(j);
});

var j = 0;

var tabela=[
"Positive anything is better than negative nothing.",
 "Live life to the fullest, and focus on the positive.",
 "You cannot have a positive life and negative mind",
 "Happiness is like a kiss. You must share it to enjoy it."];

function menjajCitate(j) {
    setInterval(function(){ $(".citat").text(tabela[j]); j = (j+1)%5; }, 5000);
}

function refresh_bus() {
    var varStation = $("#field-station").val();
    var varTrack = $("#field-track").val();
    
    console.log("potato");
    console.log(varStation);
    console.log(varTrack);
    
    lpp(varStation, varTrack);
}

function lpp(station, track) {
    $.ajaxSetup({
	scriptCharset: "utf-8", //or "ISO-8859-1"
	contentType: "application/json; charset=utf-8",
	headers: {"Accept": "application/json"}
    });

    $.getJSON('http://whateverorigin.org/get?url=' +
	encodeURIComponent('http://www.trola.si/'+station+'/'+track) + '&callback=?',
	function (data) {
	    console.log("> ", data);
	    var response = $.parseHTML(data.contents);
	    console.log("> ", response);
	    var karta = $("#lpp-content");
	    karta.html(response);
    });
}

var posodobiCalendar = function(){
    var email = document.querySelector("#calendar-email").value;

    email = email.replace("@", "%40");
    email = email.replace("#", "%23");

    var prviDel = "https://calendar.google.com/calendar/embed?src=";
    var drugiDel = "&ctz=Europe/Belgrade";
    document.getElementById("calendar-iframe").src=prviDel+email+drugiDel;
}

function schedule() {
    $.ajaxSetup({
	scriptCharset: "utf-8", //or "ISO-8859-1"
	contentType: "application/json; charset=utf-8",
	headers: {"Accept": "application/json"}
    });

    $.getJSON('http://whateverorigin.org/get?url=' + 
	encodeURIComponent('https://urnik.fri.uni-lj.si/timetable/2015_2016_letni/allocations?student=63130144') + '&callback=?',
	function (data) {
	    
	    console.log("> ", data);
	    var response = $.parseHTML(data.contents);
	    console.log("> ", response);
	    
	    var schedule_table = $(response)[22];
	    
	    console.log("> ", schedule_table);
	    
	    var karta = $("#schedule-content");
	    
	    karta.append(schedule_table);
    });
}

var addTextField = function(){
//	alert("clicked");
	$("#notes_text").clone().appendTo("#notes");
	document.querySelector("#notes_text").style.display = "block";
    
}
var removeTextField = function(){
//	alert("clicked");
	$("#notes_text").remove();
}
