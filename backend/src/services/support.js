class Support {
    startTime(data){
        const now = new Date();
        const year = now.getFullYear();
        const month = data;
        const day = now.getDate();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        var start = "";
        if (hour < 10) start += "0" + hour + ":";
        else start += hour + ":";
        if (minute < 10) start += "0" + minute + ":";
        else start += minute + ":";
        if (second < 10) start += "0" + second + " ";
        else start += second + " ";
        if (day < 10) start += "0" + day + "-";
        else start += day + "-";
        if (month < 10) start += "0" + month + "-" + year;
        else start += month + "-" + year;
        return start; 
    }
    
    getCurrentFormattedDateTime() {
        const now = new Date();
    
        const pad = (num) => num.toString().padStart(2, '0');
    
        const hours = pad(now.getHours());
        const minutes = pad(now.getMinutes());
        const seconds = pad(now.getSeconds());
    
        const day = pad(now.getDate());
        const month = pad(now.getMonth() + 1);
        const year = now.getFullYear();
    
        return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`; //hh:mm:ss dd-mm-yyyy
    }    

    checkLastDayOfCurrentMonth = () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        return today.getDate() === lastDayOfMonth;
    }

    getmonth = (time) => {
        return parseInt(time.split(' ')[1].split('-')[1]);
    }

    getSemester = (month, year) => {
        if (month >= 8 && month <= 12) return (year - 2000) * 10 + 1;
        if (month >= 1 && month <= 5) return (year - 2000) * 10 + 2;
        return (year - 2000) * 10 + 3;
    }
    
}

module.exports = new Support;
