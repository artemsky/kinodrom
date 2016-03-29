var carousel;
$(document).ready(function () {
    var li;
    function getSliderItem(MovieID, Title, data){
        return '<li movie-id="'+ MovieID +'">\
                <section class="poster">\
                  <img src="movies/'+ MovieID +'/poster.jpg" alt="'+ Title +'" class="img-responsive">\
                  <div class="info bgTitle text-center">\
                    <div class="title text-left text-center">'+ data.Hall +'</div>\
                    <div class="text-left inline-block">'+ data.Price +'грн.</div>\
                    <div class="text-right inline-block">'+ data.Session +'</div>\
                  </div>\
                </section>\
              </li>';
    }
    carousel = $("#scrolling ul");
    
    $.getJSON("all.json",function(data){
        $.each(data, function( i, outer ) {
            $.each(outer.Sessions, function( j, inner ){
                carousel.append(getSliderItem(outer.MovieID,outer.Title,inner));
            })
        });
        
        carousel.itemslide({
            duration: 1
        });
        li = carousel.find("li");
        carousel.gotoSlide(Math.floor(li.length/2));
    }).fail(function(a,b,c,d){
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(d);
    });
    
    carousel.on("changeActiveIndex", function(e){
        var id = li ? li.eq(carousel.getActiveIndex()).attr("movie-id") : false;
        LoadData(id);
        
    });
    
});
