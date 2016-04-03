module Api{
    export let Url = {
        Add: {
            Ticket: "https://kndr-prokopenko.c9users.io/add/ticket",
            Movie: "https://kndr-prokopenko.c9users.io/add/movie",
            Session: "https://kndr-prokopenko.c9users.io/add/seance"
        },
        Get: {
            Seats: (id) => {
                return `https://kndr-prokopenko.c9users.io/seances/${id}`
            },
            Session: (from, to) => {
                //return `https://kndr-prokopenko.c9users.io/seances/${from}/${to}`
                return `data.json`
            },
            AllHalls: () => {
                return `https://kndr-prokopenko.c9users.io/halls/`
            },
            Hall: (id) => {
                return `https://kndr-prokopenko.c9users.io/halls/${id}`
            },
            MoviesList: () => {
                return "https://kndr-prokopenko.c9users.io/movies"
            }
        },
        Template: {
            Movie: "pages/movie.tpl"
        }
    };
}



