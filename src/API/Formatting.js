export default class Formatting {
    static toDoubleNumber(number) {
        if (number == undefined) {
            return "";
        } else {
            return number > 9 ? number : `0${number}`;
        };
    };
    static fBig (str) {
        try {
            return `${str[0].toUpperCase()}${str.slice(1)}`;
        } catch {
            return str;
        }
    };
    static declOfNum(number, titles) {  
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
    };
};