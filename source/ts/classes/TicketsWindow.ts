class TicketsWindow{
    private Template:JQuery;
    private Parent:JQuery;
    private Button:JQuery;

    public Field:JQuery;
    public Poster:JQuery;
    public Title:JQuery;
    public Session:JQuery;
    public Hall:JQuery;
    public LowPrice:JQuery;
    public HighPrice:JQuery;
    public Checkout:JQuery;

    constructor(public template:string){
        this.Parent = $(".details");
        this.Button = this.Parent.find("button");
        $.get(template).done((data) =>{
            this.Template = $(data);
        });
    }
    Init(){
        //Template name reduction
        let T = this.Template;
        //Init onClick button
        this.Parent.delegate("button", "click", this.Draw);
        //Attach links to Template object
        this.Field = T.find(".parking .cars");
        this.Poster = T.find(".posterblock");
        this.Title = T.find(".title");
        this.Session = T.find(".session");
        this.Hall = T.find(".place");
        this.LowPrice = T.find(".lightPrice");
        this.HighPrice = T.find(".heavyPrice");
        this.Checkout = T.find(".checkout");
    }
    
    Draw(){
        let MovieID = this.Button.attr("movie-id");
        let SessionID = this.Button.attr("session-id");
        let Data = Movie.Data[MovieID].Data;
        this.Poster.append(`<img src='movies/${MovieID}/poster.jpg' class='poster' />`);
        this.Title.text(Data.Title);
        this.Session.text(new Date(Data.Sessions[SessionID].Unix*1000).toLocaleString().substring(0,16))
        this.Hall.text(Data.Sessions[SessionID].Hall);
        //Get Seats
        $.getJSON("seats.json").done((data) =>{
            this.LowPrice.text(`${data.prices.lightPrice} грн.`);
            this.HighPrice.text(`${data.prices.heavyPrice} грн.`);

            let Park = this.GeneretePark(data.seats);
            this.Field.html(Park);


            this.Checkout.text();
            });


    }

    private GeneretePark(obj){
        let row = 1;
        let html = '<div class="col-md-12">';
        for(let i in obj){
            if(obj[i].row != row) {
                html+= '</div><div class="col-md-12">';
                row = obj[i].row;
            }
            html+=this.GenerateSeat(obj[i]);
        }
        html+='</div>';
        return html;
    }

    private GenerateSeat(obj){
        let cls = obj.type != "light" ? " exp" : "";
        let sold = obj.isFree ? "" : " sold nohover";
        if(!obj.isFree) cls = '';
        return '<div class="car'+ cls + sold +'"></div>';
    }


}