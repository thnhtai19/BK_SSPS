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
    
    formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Tháng bắt đầu từ 0, nên cần +1
        const year = date.getFullYear();
        return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`; //11:14:25 05-10-2024
    };

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
