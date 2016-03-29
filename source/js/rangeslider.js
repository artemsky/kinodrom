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

$("#seans").ionRangeSlider({
    type: "double",
    grid: true,
    from_shadow: true,
    to_shadow: true,
    values:[
        "19:30", "20:00", "20:30",
        "21:00", "21:30", "22:00",
        "22:30", "23:00", "23:30",
        "0:00", "0:30", "1:00", "1:30"
        ],
    onStart: function(){
        var now = new Date()
                .toLocaleTimeString()
                .slice(0,3) + "00";
        var result = $.inArray(now, this.values);
        this.from_min = result > 0 ? result : 0;
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
    }
      
    
});