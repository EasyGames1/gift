import Round from "./Round";

export default class Calculations {
    static imt(height, weight) {
        height /= 100;
        const index = weight / (height * height);
        let str = '';
        let advice = '';
        if (index <= 16) {
            str = "Выраженный дефицит массы тела";
        };
        if (index > 16 && index < 18.5) {
            str = "Недостаточная масса тела";
        };
        if (index >= 18.5 && index <= 25) {
            str = "Норма";
        };
        if (index > 25 && index <= 30) {
            str = "Избыточная масса тела";
        };
        if (index > 30 && index <= 35) {
            str = "Ожирение 1-й степени";
        };
        if (index > 35 && index <= 40) {
            str = "Ожирение 2-й степени";
        };
        if (index > 40) {
            str = "Ожирение 3-й степени";
        };
        if (index <= 18.5) {
            advice = `Наберите хотя бы ${Round.exact((height * height * 18.5) - (height * height * index), 1)} кг.`;
        };
        if (index > 25) {
            advice = `Сбросьте хотя бы ${Round.exact((height * height * index) - (height * height * 25), 1)} кг.`;
        };
        return [str, index, advice];
    };
};