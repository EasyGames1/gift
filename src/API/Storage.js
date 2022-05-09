export default class Storage {
    static setUserData = (key, to) => {
        if (localStorage.getItem('user')) {
            try {
                const userData = JSON.parse(localStorage.getItem('user'));
                userData[key] = to;
                localStorage.setItem('user', JSON.stringify(userData));
            } catch (e) {
                alert(e);
            };
        } else {
            try {
                const userData = {[key]: to};
                localStorage.setItem('user', JSON.stringify(userData));
                return false;
            } catch (e) {
                alert(e);
            };
        };
    };
    static getUserData = (key) => {
        if (localStorage.getItem('user')) {
            try {
                if (!key) {
                    return JSON.parse(localStorage.getItem('user'));
                } else {
                    return JSON.parse(localStorage.getItem('user'))[key];
                };
            } catch (e) {
                console.log("Не удалось получить данные.");
            };
        } else {
            return '';
        };
    };
};