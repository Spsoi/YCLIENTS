class DateCalendar {
    
    getTimeZone() { // корректировка для возврата времени
        return 10800;
    }

    getDateNow () {
        let Data = new Date();
        let Year = Data.getFullYear();
        let Month = Data.toLocaleDateString('en-US', { month: '2-digit' });
        let Day = Data.toLocaleDateString('en-US', { day: '2-digit' });
        return `${Year}-${Month}-${Day}`;
    }

    getUnixTimeByDate (date) {// если падает 2022-04-04
        let Data = new Date(date);
        return Math.floor((Data.getTime() / 1000) - this.getTimeZone());
    }

    getUnixDateByDateAndTime (date) { // Получаем дату, если падает 2022-04-04 12:00:00
        let Data = new Date(date.split(' ')[0]);
        return Math.floor((Data.getTime() / 1000) - this.getTimeZone()); // return Unix Date
    }

    getUnixTimeByDateAndTime (date) { // получаем время, если падает 2022-04-04 12:00:00
        let unixDate = this.getUnixDateByDateAndTime(date);
        let time = date.split(' ')[1].split(':');
        return unixDate + (time[0] * 60 * 60) + (time[1] * 60);// return Unix Date and Time
    }

    getObjectDateByUnixTime (unix_timestamp) {
        return new Date((unix_timestamp) * 1000) ;
    }

    getHoursByObjectDate (unix_timestamp) {
        let date = this.getObjectDateByUnixTime(unix_timestamp);
        // console.log(date);
        return date.getHours();
    }

    getMinutesByObjectDate (unix_timestamp) {
        let date = this.getObjectDateByUnixTime(unix_timestamp);
        return date.getMinutes();
    }
    getSecondsByObjectDate (unix_timestamp) {
        let date = this.getObjectDateByUnixTime(unix_timestamp);
        return date.getSeconds();
    }

    getObjectDateAndTimeToUnixTime (unix_timestamp) {
        // console.log(unix_timestamp);
        let Data = this.getObjectDateByUnixTime(unix_timestamp) ;
        let Year = Data.getFullYear();
        let Month = Data.toLocaleDateString('en-US', { month: '2-digit' });
        let Day = Data.toLocaleDateString('en-US', { day: '2-digit' });
        let Hour = ("0" + Data.getHours()).slice(-2);
        let Minute = ("0" + Data.getMinutes()).slice(-2);
        let Second = ("0" + Data.getSeconds()).slice(-2);
        return `${Year}-${Month}-${Day} ${Hour}:${Minute}:${Second}`;
    }
    geTimeToUnixTime (unix_timestamp) {
        // console.log(unix_timestamp);
        let Data = this.getObjectDateByUnixTime(unix_timestamp) ;
        let Hour = ("0" + Data.getHours()).slice(-2);
        let Minute = ("0" + Data.getMinutes()).slice(-2);
        let Second = ("0" + Data.getSeconds()).slice(-2);
        return `${Hour}:${Minute}:${Second}`;
    }
}