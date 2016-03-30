var Month = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Мая",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря"
    ],
    Days = [
        "Пн", 
        "Вт", 
        "Ср", 
        "Чт", 
        "Пт", 
        "Сб", 
        "Вск"
    ],
    SeanseValues = [
        "19:30", "20:00", "20:30",
        "21:00", "21:30", "22:00",
        "22:30", "23:00", "23:30",
        "0:00", "0:30", "1:00", "1:30"
        ];

function getDays(){
    var date = new Date(),
        startDay = date.getDay() - 1,
        endDay = Days.length;
    
    var result = Days.slice(startDay, endDay);
    Days.slice(0, startDay).forEach(function(el){
        result.push(el);
    })
    
    return result;
}

function daysInMonth(day) {
    var date = new Date();
    var maxDays = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    if(day > maxDays) return day - maxDays;
    return day;
}

var SeansBetween = {
    date: 0,
    fromTime: SeanseValues[0],
    toTime: SeanseValues[SeanseValues.length-1],
    fromUTC: function(){
        return this.getDate(this.fromTime);
    },
    toUTC: function(){
        return this.getDate(this.toTime);
    },
    timeConvert:function(time){
        var times = time.split(":");
        return (parseInt(times[1], 10) + (parseInt(times[0], 10)* 60))*60;
    },
    getDate: function(time){
        var date = Date.parse(this.date);
        var UTCtime = this.timeConvert(time);
        if(UTCtime < 21600)
            date = date + 86400*1000;
        return date + UTCtime*1000;
    },
    id:{},
    flag: true
};

function getFilms(){

    var utc;
    var id = {};
    for(var i in view){
        for(var s in view[i].data.Sessions){
            utc = view[i].data.Sessions[s].UTC;
            if(utc <= SeansBetween.toUTC() && utc >= SeansBetween.fromUTC()){
                try{
                    id[i].push(s);
                }catch(err){
                    id[i] = [];
                    id[i].push(s);
                }
                //carousel.append(view[i].data.Sessions[s].html);
            }
        }
    }
    if(SeansBetween.flag){
        SeansBetween.id = id;
        SeansBetween.flag = false;
    }
    if(_.isEqual(SeansBetween.id,id))
        return;
    SeansBetween.id = id;
    carousel.html("")
    for(var ii in SeansBetween.id){
        for(var ss in SeansBetween.id[ii]){
            carousel.append(view[ii].data.Sessions[ss].html);
        }
    }
    carousel.reload();
}

$("#seans").ionRangeSlider({
    type: "double",
    grid: true,
    from_shadow: true,
    to_shadow: true,
    values:SeanseValues,
    onStart: function(){
        var now = new Date()
                .toLocaleTimeString()
                .slice(0,3) + "00";
        var result = $.inArray(now, this.values);
        this.from_min = result > 0 ? result : 0;
    },
    onChange: function(time){
     SeansBetween.fromTime = time.from_value;
     SeansBetween.toTime = time.to_value;
     getFilms();
    }
    
});

var seans = $("#seans").data("ionRangeSlider");
var fromBak = seans.options.from_min;
$("#day").ionRangeSlider({
    type: "single",
    grid: true,
    min: 0,
    max: 6,
    grid_num: 3,
    prettify: function(num){
        var date = new Date();
        var day = date.getDate() + num;
        var month = date.getMonth();
        var maxDays = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
        if(day > maxDays) {
            day -= maxDays;
            month++;
        }
        SeansBetween.date = date.getFullYear() + "-" + (month+1) + "-" + day;
        return getDays()[num] + ' ' + day + ' ' + Month[month];

    },
    onStart: function(){
        this.from = new Date().getDay();
    },
    onChange: function(num){
        if(num.from > 0){
           seans.update({
                from: 0,
                from_min: 0
            });
        }else{
            seans.update({
                from_min: fromBak
            });
            seans.reset();
        }
        getFilms();
    }
      
    
});