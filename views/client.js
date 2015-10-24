
$(document).ready(function(){
  var url = "https://brew-fridge.herokuapp.com/";
  //var url = "http://localhost:5000";
  var data = {on: true};

  $.get(url+"/state", function(data){
    $(".result").html(data.body);
  })

 function start () {
    console.log("start blir kalt");
    $.post( url+"/start", function(data){
      console.log("jajajaja");
      var html = data === 'OK' ? 'OVN ER PÅ' : 'FAIL';
     $( ".result" ).html(html);
  });
}

function stop () {
  console.log("stopp blir kalt");
  $.post( url+"/stop", function (data) {
    var html = data === 'OK' ? 'OVN ER AV' : 'FAIL'
   $( ".result" ).html(html);
 });
}

 $('.startbutton').click(start);
 $('.stopbutton').click(stop);
});
