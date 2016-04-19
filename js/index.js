var baseUrl = "https://trackerman-api.herokuapp.com";

var clientList = function() {
  var templateScript = $("#client-list-template").html();
  var template = Handlebars.compile(templateScript);

  $.getJSON(baseUrl + "/v1/clients", function( data )  {
    $("#main-view").html(template(data));

    $("#main-view .delete-client").on('click', function(event) {
      var id = $(event.currentTarget).data("index");
      alert("No implementado :P");
      console.log("borrar cliente " + id);
    });
  });
};

var clientFields = ['name', 'lastname', 'email', 'cuil', 'lat', 'lon', 'seller_type', 'phone_number', 'avatar', 'thumbnail'];
var clientEdit = function(id) {
  var templateScript = $("#client-edit-template").html();
  var template = Handlebars.compile(templateScript);

  $.getJSON(baseUrl + "/v1/clients/" + id, function( data )  {
    $("#main-view").html(template(data));
    
    $("#main-view .client-save").on('click', function(event) {
      var postData = {};
      clientFields.forEach(function(clientField) {
        postData[clientField] = $("#main-view form input[name='"+clientField+"']").val();
      });

      $.ajax({
        url: baseUrl + "/v1/clients/" + id,
        type: "PUT",
        contentType: 'application/json',
        data: JSON.stringify(postData)
      }).then(function() {
        document.location = "#/clients";
      });
    });
  });
};

$(window).on('hashchange', function(){
  if (location.hash === "#/clients") {
    return clientList();
  }

  if (location.hash.slice(0,9) === "#/clients") {
    var id = parseInt(location.hash.split("/")[2]);
    clientEdit(id);
  }

});

$(window).on('load', function() {
  if (location.hash === "") {
    document.location = "#/clients";
  } else {
    $(window).trigger("hashchange");
  }
});
