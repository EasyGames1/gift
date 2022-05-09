import Formatting from './Formatting';

export default class Time {
    static diffSun(hour1, hour2, minute1, minute2) {
        return (
            hour1 - hour2 > 0
                ? `${hour1 - hour2} ч назад`
                : hour1 === hour2
                    ? minute1 === minute2
                        ? "Сейчас"
                        : minute1 - minute2 > 0
                            ? `${minute1 - minute2} мин назад`
                            : `Через ${minute2 - minute1} мин`
                    : `Через ${hour2 - hour1} ч`
        );
    };
    static unixToDate(unix) {
        return new Date(unix * 1000);
    };
    static msToTime(duration) {
        if (duration == undefined) {
            return '';
        };
        if (duration < 0) {
            duration = -duration;
        };
        const date = new Date(duration);
        return {
            years: date.getUTCFullYear() - 1970,
			months: date.getUTCMonth(),
			days: date.getUTCDate() - 1,
			hours: date.getUTCHours(),
			minutes: date.getUTCMinutes(),
			seconds: date.getUTCSeconds(),
            milliseconds: Math.floor(date.getUTCMilliseconds() / 10)
        };
    };
    static getFullDate() {
        const date = new Date();
        return `${Formatting.toDoubleNumber(date.getDate())}.${Formatting.toDoubleNumber(date.getMonth() + 1)}.${date.getFullYear()}`;
    };
    static getTime() {
        const date = new Date();
        return `${Formatting.toDoubleNumber(date.getHours())}:${Formatting.toDoubleNumber(date.getMinutes())}:${Formatting.toDoubleNumber(date.getSeconds())}`;
    };
    static getDay(day) {
        switch (day) {
            case 0:
                return "Воскресенье";
            case 1:
                return "Понедельник";
            case 2:
                return "Вторник";
            case 3:
                return "Среда";
            case 4:
                return "Четверг";
            case 5:
                return "Пятница";
            case 6:
                return "Суббота";
        };
        return 'Не удалось конвертировать день в строку';
    };
    static getShortDay(day) {
        switch (day) {
            case 0:
                return "ВС";
            case 1:
                return "ПН";
            case 2:
                return "ВТ";
            case 3:
                return "СР";
            case 4:
                return "ЧТ";
            case 5:
                return "ПТ";
            case 6:
                return "СБ";
        };
        return 'Не удалось конвертировать день в строку';
    };
    static getHours() {
        return Formatting.toDoubleNumber(new Date().getHours());
    };
    static getMinutes() {
        return Formatting.toDoubleNumber(new Date().getMinutes());
    };
    static getSeconds() {
        return Formatting.toDoubleNumber(new Date().getSeconds());
    };
    static dateToStr(date, light) {
        let str;
        switch (Number(date.substring(3, 5))) {
            case 1:
                str = "января";
                break;
            case 2:
                str = "февраля";
                break;
            case 3:
                str = "марта";
                break;
            case 4:
                str = "апреля";
                break;
            case 5:
                str = "мая";
                break;
            case 6:
                str = "июня";
                break;
            case 7:
                str = "июля";
                break;
            case 8:
                str = "августа";
                break;
            case 9:
                str = "сентября";
                break;
            case 10:
                str = "октября";
                break;
            case 11:
                str = "ноября";
                break;
            case 12:
                str = "декабря";
                break;
        };
        return `${Number(date.substring(0, 2))} ${str} ${!light ? `${date.slice(-4)} года` : ""}`;
    };
};