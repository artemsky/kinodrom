var Details = $(".details");
var view = {};
function LoadData(id){
    if(!id) return;
    Details.stop(true,true);
    Details.animate({opacity: 0.01}, 200, function(){
        Details.html(view[id].html);
        Details.animate({opacity: 1}, 200);
    });
}
$.getJSON("data.json").done(function(data){
    $.get( "pages/movie.tpl", function( file ) {
          CreateObject(data,file);
          initCarousel();
    });
    
});

function CreateObject(data, template){
    for(var i in data){
        view[data[i].MovieID] = {data:data[i]};
        view[data[i].MovieID]['html'] = ReplaceWithTemplate(template,{
            '{Title}': data[i].Title,
            '{MovieID}': data[i].MovieID,
            '{SessionStarts}': data[i].SessionStarts,
            '{Year}': data[i].Year,
            '{Country}': data[i].Country,
            '{Genre}': data[i].Genre,
            '{Budget}': data[i].Budget,
            '{Time}': data[i].Time,
            '{Translation}': data[i].Lang,
            '{Actors}': data[i].Actors,
            '{About}': data[i].About,
            '{Video}': data[i].Video
        });
        
        for(var s in view[data[i].MovieID].data.Sessions){
            view[data[i].MovieID].data.Sessions[s]['html'] = getSliderItem(data[i].MovieID, data[i].Title, view[data[i].MovieID].data.Sessions[s]);
            view[data[i].MovieID].data.Sessions[s]['UTC'] = Date.parse(view[data[i].MovieID].data.Sessions[s].Session);
        }
    
}
    
}

function ReplaceWithTemplate(str, pattern){
    for(var param in pattern){
        var exp = new RegExp(param, "g");
        str = str.replace(exp, pattern[param]);
    }
     
    return str;
}