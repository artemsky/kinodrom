var Details = $(".details");

function LoadData(id){
    if(!id) return;
    Details.animate({opacity: 0.1}, 200);
    $.post("controls/getdetails.php",{
            data: "../"+id+".json",
            template: "../pages/movie.tpl"
        }).done(function(response){
            Details.html(response);
            Details.animate({opacity: 1}, 200);
        });
    
    
}

$.getJSON("data.json").done(function(data){
    var tpl = $("<section>", {class:"details"}).load("pages/movie.tpl", function(){
        CreateObject(data,tpl);
    });
    
});

function CreateObject(data, template){
    var view = {};
    
    for(var i in data)
        view[data[i].MovieID] = ReplaceWithTemplate(template.html(),{
            '{Title}': data[i].Title,
            '{MovieID}': data[i].MovieID,
            '{SessionStart}': data[i].SessionStart,
            '{Year}': data[i].Year,
            '{Country}': data[i].Country,
            '{Genre}': data[i].Genre,
            '{Budget}': data[i].Budget,
            '{Time}': data[i].Time,
            '{Translation}': data[i].Translation,
            '{Actors}': data[i].Actors,
            '{About}': data[i].About,
            '{Video}': data[i].Video
        });
    
}

function ReplaceWithTemplate(str, pattern){
    var result = "";
    for(var param in pattern){
        var exp = new RegExp(param, "g");
        result = str.replace(exp, pattern[param]);
    }
        
    return result;
}