const isPro = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
    baseUrl: isPro ? 'https://webapi.skfxny.com' : 'api/'
}