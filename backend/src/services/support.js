// class Support {
//     startTime(){
//         const now = new Date();
//         const year = now.getFullYear();
//         const month = now.getMonth() + 1;
//         const day = now.getDate();
//         const hour = now.getHours();
//         const minute = now.getMinutes();
//         const second = now.getSeconds();
//         var start = "";
//         if (hour < 10) start += "0" + hour + ":";
//         else start += hour + ":";
//         if (minute < 10) start += "0" + minute + ":";
//         else start += minute + ":";
//         if (second < 10) start += "0" + second + " ";
//         else start += second + " ";
//         if (day < 10) start += "0" + day + "-";
//         else start += day + "-";
//         if (month < 10) start += "0" + month + "-" + year;
//         else start += month + "-" + year;
//         return start; 
//     }
// }

// module.exports = new Support
class Support {
    startTime(){
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const second = now.getSeconds();
        
        // Định dạng năm-tháng-ngày giờ:phút:giây
        const start = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`;
        
        return start; 
    }
}

module.exports = new Support;