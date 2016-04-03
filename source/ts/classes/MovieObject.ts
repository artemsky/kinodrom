interface Session {
    Hall : string
    Session: string
    Price : number
    HTML?: string
    UnixTime: number
}
interface IMovieObject {
    MovieID?:  number
    Title : string
    Year: boolean
    SessionStarts : string
    Country: string
    Genre : string
    Budget : number
    Time: number
    Lang: string
    Actors: string
    About: string
    Video: string
    Sessions: Session[]
}
interface IMovieData {
    Data?:IMovieObject
    HTML?:string
}
class MovieObject {
    public Data:Object;
    constructor(data:string, template:string) {
        let MovieData = $.getJSON(data);
        let Template = $.get(template);
        $.when(MovieData, Template)
            .then(this.CreateObject.bind(this), (e) => {
                console.log(`Error occured\n\tCode: ${e.status}\n\tMessage: ${e.statusText.text}`);
            });
    }

    private ReplaceWithTemplate(str:string, pattern) {
        for (let param in pattern)
            str = str.replace(new RegExp(param, "g"), pattern[param]);
        return str;
    }

    private GenerateSliderItem(MovieID, Title, Session) {
        return `<li movie-id="${MovieID}">
                    <section class="poster">
                        <img src="movies/${MovieID}/poster.jpg" alt="${Title}" class="img-responsive">
                        <div class="info bgTitle text-center">
                            <div class="title text-left text-center">${Session.Hall}</div>
                            <div class="price text-left inline-block">${Session.Price}грн.</div>
                            <div class="session text-right inline-block">${new Date(Session.Session).toLocaleTimeString().substring(0, 5)}</div>
                        </div>
                    </section>
                </li>`;
    }

    private CreateObject(movieData, template:string) {
        console.log(movieData);
        let data = movieData[0];
        let nData = {};
        for (let i = data.length; i--;) {
            nData[data[i].MovieID] = {Data: data[i]};
            nData[data[i].MovieID]['html'] = this.ReplaceWithTemplate(template[0], {
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

            let session:Session[] = nData[data[i].MovieID].Data.Sessions;
            for (let s = session.length; s--;) {
                session[s]['HTML'] = this.GenerateSliderItem(data[i].MovieID, data[i].Title, session[s]);
                session[s]['Unix'] = Date.parse(session[s].Session);
            }

        }

        this.Data = nData;
    }

}