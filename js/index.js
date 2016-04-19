var baseUrl = "https://trackerman-api.herokuapp.com";

var clientList = function() {
  var templateScript = $("#client-list-template").html();
  var template = Handlebars.compile(templateScript);

  $.getJSON(baseUrl + "/v1/clients", function( data )  {
    $("#main-view").html(template(data));

    $("#main-view .delete-client").click(function(event) {
      var id = $(event.currentTarget).data("index");
      alert("No implementado :P");
      console.log("borrar cliente " + id);
    });
  });
};

var clientEdit = function(id) {
  alert("No implementado :P");
  document.location = "#/clients";
};

$(window).on('hashchange', function(){
  if (location.hash === "#/clients") {
    return clientList();
  }

  if (location.hash.slice(0,9) === "#/clients") {
    var id = parseInt(location.hash.split()[2]);
    clientEdit(id);
  }

});

$(window).on('load', function() {
  if (location.hash === "") {
    document.location = "#/clients";
  }
});
