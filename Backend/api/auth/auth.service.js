const userService = require('../user/user.service')
const logger = require('../../service/logger.service')

async function login(email, password) {
    logger.debug(`auth.service - login with email: ${email}`)
    const user = await userService.getByUserMail(email)
    if (!user) return Promise.reject('Invalid mail or password')
    delete user.password
    return user
}

async function signup(username, password, fullname) {
    logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`)
    if (!username || !password || !fullname) return Promise.reject('fullname, username and password are required!')
    return userService.add({ username, password, fullname})
}

module.exports = {
    signup,
    login,
}