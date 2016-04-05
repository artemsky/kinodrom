class Tickets{
    private Field:JQuery;
    constructor(
        public Parent:JQuery = $(".details"),
        public Button:JQuery = $(".details button"),
        public Window:JQuery = $("#tiketsModal"))
    {
        Field = $("#tickets")
        this.Init();
        
    }
    
    Init(){
        //Init Button Click
        this.Parent.delegate("button", "click", () => {
            this.Window.modal("show");
        });
        this.Draw();
    }
    
    Draw()){
        
    }
}