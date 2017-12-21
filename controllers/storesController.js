const express = require('express')
const router = express.Router({mergeParams: true})

const User = require('../db/models/User')

router.get('/', (request, response) => {
  const userId = request.params.userId

  User.findById(userId)
    .then((user) => {
      response.render('stores/index', {
        userFullName: `${user.firstName} ${user.lastName}`,
        userId: user._id,
        stores: user.stores
      })
    })
})

router.get('/new', (request, response) => {
  const userId = request.params.userId

  response.render('stores/new', {
    userId
  })
})

router.post('/', (request, response) => {
  const userId = request.params.userId
  const newStore = request.body

  User.findById(userId)
    .then((user) => {
      user.stores.push(newStore)
      return user.save()
    })
    .then(() => {
      response.redirect(`/users/${userId}/stores`)
    })

})

module.exports = router