/// <reference path="../../typings/browser.d.ts" />
/// <reference path="classes/MovieObject.ts" />
/// <reference path="classes/Api.ts" />
/// <reference path="classes/DetailedInfo.ts" />

    let Movie = new MovieObject(Api.Url.Get.Session("2016-01-01","2016-05-05"),Api.Url.Template.Movie);
    let Details = new DetailedInfo();
    Movie.onLoad = () => {
        Details.Init(Movie.Data);
    };







