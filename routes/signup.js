/**
 * Created by raoul on 17-7-17.
 */
const router = require('koa-router')()

router.prefix('/sigin')

router.get('/', async (ctx, next) => {
  await ctx.render('signup', {})
})
module.exports = router