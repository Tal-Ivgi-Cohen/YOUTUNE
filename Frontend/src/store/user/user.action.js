import { userService } from '../../services/user.service.js';

export function loadUsers() {
    return async dispatch => {
        try {
            const users = await userService.query();
            dispatch({ type: 'SET_USERS', users });
        } catch (err) {
            console.log('User Actions: err in loaded users', err);
        }
    };
}

export function loadLoggedInUser() {
    return async dispatch => {
        try {
            const user = await userService.getLoggedInUser();
            if (user) {
                dispatch({ type: 'SET_USER', user });
            }
        } catch (err) {
            console.log('User Actions: err in loaded User', err);
        }
    };
}

export function login(credentials) {
    return async dispatch => {
        try {
            const user = await userService.login(credentials);
            if (user) {
                dispatch({ type: 'LOGIN', user });
            }
        } catch (err) {
        console.log('User Actions: err in login', err);
        }
    };
}

export function logout() {
    return async dispatch => {
        try {
            await userService.logout();
            dispatch({ type: 'LOGOUT' });
        } catch (err) {
          console.log('User Actions: err in logout', err);
        }
    };
}

export function signup(userInfo) {
    return async dispatch => {
        try {
            const user = await userService.signup(userInfo);
            dispatch({ type: 'SIGNUP', user })
        } catch (err) {
        console.log('User Actions: err in signUp', err);
        }
    };
}




