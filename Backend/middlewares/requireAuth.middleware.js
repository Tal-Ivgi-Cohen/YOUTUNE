const logger = require('../service/logger.service')

async function requireAuth(req, res, next) {
  if (!req.session || !req.session.user) {
    res.status(401).end('Unauthorized!')
    return
  }
  next()
}

async function requireSinger(req, res, next) {
  const user = req.session.user
  if (!user.isSinger) {
    logger.warn(user.fullname + ' Attempt to perform admin action')
    res.status(403).end('Unauthorized Enough..')
    return
  }
  next()
}

module.exports = {
  requireAuth,
  requireSinger
}
