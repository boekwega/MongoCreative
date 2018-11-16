$(document).ready(function() {
    $("#submintEntry").click(function() {
        var myobj = { Name: $("#name").val(), Deed: $("#deed").val() };
        jobj = JSON.stringify(myobj);
        $("#json").text(jobj);
        console.log(jobj)
        var url = "deed";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                $("#done").html(textStatus);
            }
        })
    });

    $("#getDeeds").click(function() {
        var name = $("#query").val();
        var URL = "deed?q=" + name;
        console.log("URL= "+URL)
        $.getJSON(URL, function(data) {
            console.log(data);
            var everything = "<ul>";
            for (var deed in data) {
                com = data[deed];
                everything += "<li> Name: " + com.Name + " -- Deed: " + com.Deed + "</li>";
            }
            everything += "</ul>";
            $("#deeds").html(everything);
        })
    })
    
    // This is the one that there's no help for
    $("#deleteName").click(function(){
        
        // $("#deeds").html("");
        
        var name = $("#query").val();
        var url = "deed?q=" + name;
        console.log("URL= "+URL)
        
        
        // var url = "deed"; //gets all of the deeds
        $.ajax({
            url: url,
            type: "DELETE",
            success: function(data, textStatus) {
                $("#done").html(textStatus);
            }
        })
        
    })

});


