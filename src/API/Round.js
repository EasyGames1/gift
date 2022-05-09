export default class Round {
    static exact(num, exactly) {
        return Math.round(num * (10 ** exactly)) / (10 ** exactly);
    };
};