class Support {
    startTime(){
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
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
        return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
    };
}

module.exports = new Support;