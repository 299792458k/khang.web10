/**
* convert date to format ngay/thang/nam
* @param {dateString} chuỗi ngày
* @returns null
* Created By KhangPC (12/12/2022)
*/
export const convertToVNDate = (dateString) => {
    let res;
    if (dateString) {
        const date = new Date(dateString)
        const resDate = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()
        const resMonth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        res = resDate + '/' + resMonth + '/' + date.getFullYear()
    }
    return res;
}

/**
* convert date to mm/dd/yyyy
* @param {dateString} chuỗi ngày
* @returns null
* Created By KhangPC (12/12/2022)
*/
export const convertToUSDate = (dateString) => {
    let res;
    if (dateString) {
        const dateMonthYearArr = dateString.split('/')
        res = dateMonthYearArr[1] + '-' + dateMonthYearArr[0] + '-' + dateMonthYearArr[2]
    }
    return res;
}

/**
* convert to server date
* @param {dateString} chuỗi ngày
* @returns ngày đã convert
* Created By KhangPC (12/12/2022)
*/
export const convertToServerDate = (dateString) => {
    let res;
    if (dateString) {
        const dateMonthYearArr = dateString.split('/')
        res = dateMonthYearArr[2] + '-' + dateMonthYearArr[1] + '-' + dateMonthYearArr[0] + "T00:00:00"
    }
    return res;
}

/**
* lấy ngày hiện tại dạng ngày-tháng-năm
* @returns ngày hiện tại (mm-dd-yyyy)
* Created By KhangPC (12/12/2022)
*/
export const getCurrentDate = () => {
    const date = new Date(Date.now())
    const dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
    return dateString
}

/**
 * lấy lịch của 1 tháng nào đó
 * @param {năm} year 
 * @param {tháng} month 
 * @returns mảng 2 chiều
 * Created By KhangPC(12/12/2022)
 */
export const getDatesOfMonth = (year, month) => {
    const beginDate = new Date(year, month - 1, 1)
    const lastDate = new Date(year, month, 0)
    const lastDateNumber = lastDate.getDate()
    const dayOfFirstdate = beginDate.getDay()
    const dayOfLastDate = lastDate.getDay()
    const calender = []
    const res = []
    // trước ngày bắt đầu sẽ là null
    if (dayOfFirstdate !== 0) {
        for (let i = 0; i < dayOfFirstdate - 1; i++) {
            calender[i] = null;
        }
        // trường hợp ngày bắt đầu là chủ nhật
    } else {
        for (let i = 0; i < 6; i++) {
            calender[i] = null;
        }
    }
    // sau ngày bắt đầu là null
    for (let i = 1; i <= lastDateNumber; i++) {
        calender.push(i)
    }
    // trường hợp ngày cuối không phải là chủ nhật
    if (dayOfLastDate !== 0) {
        for (let i = 0; i < 7 - dayOfLastDate; i++) {
            calender.push(null)
        }
    }
    // đưa về mảng 2 chiều
    for (let i = 0; i < calender.length / 7; i++) {
        res[i] = []
        for (let j = 0; j < 7; j++) {
            res[i].push(calender[i * 7 + j])
        }
    }
    return res
}

/**
 * kiểm tra string truyền vào có phải là một ngày hợp lệ
 * @param {chuỗi ngày tháng năm} dateString 
 * @returns có hợp lệ hay không 
 * Created By KhangPC(12/12/2022)
 */
export const checkValidDate = (dateString) => {
    let isValid = true;
    let year = dateString.slice(4, 8)
    let month = dateString.slice(2, 4)
    let day = dateString.slice(0, 2)
    let initDay
    let initMonth
    if (day[0] === '0') {
        initDay = day[1]
    } else {
        initDay = day
    }
    if (month[0] === '0') {
        initMonth = month[1]
    } else {
        initMonth = month
    }
    let initYear = year
    const date = month + '/' + day + '/' + year
    const resDate = new Date(date)
    let resYear = resDate.getFullYear()
    let resMonth = resDate.getMonth() + 1
    let resDay = resDate.getDate()
    if (initDay !== resDay.toString() || initMonth !== resMonth.toString() || initYear !== resYear.toString()) {
        isValid = false;
    }
    // kiểm tra ngày có vượt quá ngày hiện tại
    const currDate = new Date(Date.now());
    if (resYear > currDate.getFullYear()) {
        isValid = false;
    } else if (resYear === currDate.getFullYear() && resMonth > currDate.getMonth() + 1) {
        isValid = false;
    } else if (resYear === currDate.getFullYear() && resMonth === currDate.getMonth() + 1 && resDay > currDate.getDate()) {
        isValid = false;
    }
    return isValid;
}