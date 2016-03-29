// $.getJSON("data.json").done(function(data){
//     var tpl = $("<section>", {class:"details"}).load("pages/movie.tpl", function(){
//         CreateTicketsObject(data,tpl);
//     });
    
// });

$(".details").delegate("button", "click", function(){
   // $("#tiketsModal").attr("movie-id", $(this).attr("movie-id"));
    
    var T = $("#tickets");
    var id = $(this).attr("movie-id");
    T.find(".poster").attr("src", "movies/"+view[id].data.MovieID+"/poster.jpg");
    T.find(".title").text(view[id].data.Title);
    
    
    $.getJSON("seats.json").done(function(data){
        $(".lightPrice").text(data.prices.lightPrice+" грн.");
        $(".heavyPrice").text(data.prices.heavyPrice+" грн.");
        
        var row = 1;
        var html = '<div class="col-md-12">';
        for(var i in data.seats){
            if(data.seats[i].row != row) {
                html+= '</div><div class="col-md-12">';
                row = data.seats[i].row;
            }
                html+=GenerateSeat(data.seats[i]);
        }
        html+='</div>';
        $(".parking .cars").html(html);
    });
});

function GenerateSeat(obj){
   var cls = obj.type != "light" ? " exp" : "";
   var sold = obj.isFree ? "" : " sold nohover";
   if(!obj.isFree) cls = '';
   return '<div class="car'+ cls + sold +'"></div>';
}

$("#tickets").delegate(".car", "click", function(){
    var t, p;
    if($(this).hasClass("exp")){
        t = "Внедорожник";
        p = 120;
    } else{
        t = "Легковик";
        p = 100;
    }
    var ticket = {
        type: t,
        price: p,
        row: $(this).parent().index()+1,
        col: $(this).index()+1,
        getTicket: function(){
            var $this = this;
            return '<div class="ticket-container"><div class="ticket"><div class="name"><h6>Тип:</h6><h6>Ряд:</h6><h6>Место:</h6><h6>Цена:</h6></div><div class="type"><h6>'
                    +$this.type+
                    '</h6><h6>'
                    +$this.row+
                    '</h6><h6>'
                    +$this.col+
                    '</h6><h6>'
                    +$this.price+ 
                    'грн</h6></div></div></div>'
        }
        
    }
    
    if($(this).hasClass("selected")){
        $(this).removeClass("selected");
        if(Tickets.length == 1) Tickets = [];
        else{
            for(var i in Tickets){
                if(Tickets[i].row == ticket.row && Tickets[i].col == ticket.col){
                    Tickets.splice(i,1);
                    break;
                }
            }
        }
        
    }
    else{
       $(this).addClass("selected");
       Tickets.push(ticket);
    }
        
    
    
    PrintTickets();
    
});

var Tickets = [];

function PrintTickets(){
    var target = $("#tickets .checkout");
    if(Tickets.length == 0){
       target.html("");
       $("#tickets .order").hide();
       return;
    }
    $("#tickets .order").show();
    var total = 0;
    target.html("");
    for(var i in Tickets){
        target.append(Tickets[i].getTicket());
        total += Tickets[i].price;
        target.append("<span>+</span>");
    }
    target.find("span:last").html('<span>='+total+' грн.</span>').after('<div class="col-md-12"><button type="button" class="btn btn-danger">Сделать заказ</button></div>');
        
    
}

function TicketsReset(){
    $("#tickets .car").each(function(){
        $(this).removeClass("selected");
    });
    $("#tickets .order").hide();
    $("#tickets .checkout").html("");
    Tickets = [];
}