export default class Weather {
    static degToStr(deg) {
        if (deg >= 0 && deg <= 22) {
            return "северный";
        } else if (deg >= 23 && deg <= 67) {
            return "северо-восточный";
        } else if (deg >= 68 && deg <= 112) {
            return "восточный";
        } else if (deg >= 113 && deg <= 157) {
            return "юго-восточный";
        } else if (deg >= 158 && deg <= 202) {
            return "южный";
        } else if (deg >= 203 && deg <= 247) {
            return "юго-западный";
        } else if (deg >= 248 && deg <= 292) {
            return "западный";
        } else if (deg >= 293 && deg <= 337) {
            return "северо-западный";
        } else if (deg >= 338 && deg <= 360) {
            return "северный";
        };
    };
};