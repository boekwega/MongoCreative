$(document).ready(function() {

    $("#submitEntry").click(function() {

        console.log("heard the submit entry button click");
        if ($("#name").val() == "" || $("#deed").val() == "") { console.log("You entered an empty name") }
        else {
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
        }
    });

    $("#getDeeds").click(function() {
        var name = $("#query").val();
        var URL = "deed?q=" + name;
        console.log("URL= " + URL)
        $.getJSON(URL, function(data) {
            console.log(data);
            var everything = "<ul>";
            for (var deed in data) {
                com = data[deed];
                everything += "<li> Name: " + com.Name + " -- Deed: " + com.Deed + "</li>";
            }
            everything += "</ul>";
            $("#deeds").html(everything);
        });
    });

    $("#viewNiceListBtn").click(function(e) {
        e.preventDefault();
        console.log("We heard the button click!");
        var url = "names";
        console.log(url);
        $.getJSON(url, function(data) {
            console.log(data);
            // var everything = "<ul>";
            var everything = "<h class=\"w3-green\">Nice List</h>";
            for (var name in data) {
                elmt = data[name];
                // everything += "<li><a href='deedList.html'>" + elmt.Name + "</a></li>";
                everything += "<li>" + elmt.Name + "</li>";
            }
            // everything += "</ul>";
            $("#nameList").html(everything);
        });
        
        

    });


    $("#viewDeedListBtn").click(function(e) {
        e.preventDefault();
        console.log("We heard the button click!");
        var url = "deeds";
        console.log(url);
        $.getJSON(url, function(data) {
            console.log(data);

            var everything = "<h class=\"w3-green\">Good Deeds</h>";
            for (var entry in data) {
                elmt = data[entry];
                everything += "<li>" + elmt.Deed + "</li>";
            }
            $("#deedList").html(everything);
        });
        
    });


    // This is the one that there's no help for
    $("#deleteName").click(function() {

        // $("#deeds").html("");
        console.log("inside deleteName click listener")
        var name = $("#name").val();
        var url = "deed?q=" + name;
        console.log("URL= " + URL)


        // var url = "deed"; //gets all of the deeds
        $.ajax({
            url: url,
            type: "DELETE",
            success: function(data, textStatus) {
                $("#done").html(textStatus);
                console.log(textStatus)
            }
        })

    });


});
