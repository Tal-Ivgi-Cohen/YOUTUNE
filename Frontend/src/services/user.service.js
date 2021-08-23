import { httpService } from './http.service'

export const userService = {
    login,
    logout,
    signup,
    query,    
    remove,
    update,
    getLoggedinUser,
};

window.userService = userService

function query() {
    return httpService.get(`user`)
}

function remove(userId) {
    return httpService.delete(`user/${userId}`)
}

async function login(credentials) {
    const user = await httpService.post('auth/login', credentials)
    if (user) return _saveLocalUser(user) 
}

async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    if (user) return _saveLocalUser(user)
}


async function logout() {
    sessionStorage.clear()
    return await httpService.post('auth/logout')
}

async function getLoggedinUser(userId) {
    const loggedInUser = await httpService.get(`user/${userId}`);
    return loggedInUser;
}

async function update(user) {
    user = await httpService.put(`user/${user._id}`, user)
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
}

function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}
