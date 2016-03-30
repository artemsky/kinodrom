var carousel;
function getSliderItem(MovieID, Title, data){
    var date = new Date(data.Session).toLocaleTimeString().substring(0,5);
    return '<li movie-id="'+ MovieID +'">\
            <section class="poster">\
              <img src="movies/'+ MovieID +'/poster.jpg" alt="'+ Title +'" class="img-responsive">\
              <div class="info bgTitle text-center">\
                <div class="title text-left text-center">'+ data.Hall +'</div>\
                <div class="price text-left inline-block">'+ data.Price +'грн.</div>\
                <div class="session text-right inline-block">'+ date +'</div>\
              </div>\
            </section>\
          </li>';
}
carousel = $("#scrolling ul");

function initCarousel(){
    for(var i in view){
        for(var s in view[i].data.Sessions){
            carousel.append(view[i].data.Sessions[s].html);
        }
    }
    carousel.itemslide({
        duration: 1
    });
    carousel.gotoSlide(Math.floor(carousel.children().length/2));
}

carousel.on("changeActiveIndex", function(e){
    var id = $(e.target).children().eq(carousel.getActiveIndex()).attr("movie-id");
    
    TicketsReset();
    LoadData(id);
    
});
