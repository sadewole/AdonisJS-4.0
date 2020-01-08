'use strict'

const Post = use('App/Models/Post')

class PostController {
  async index({
    view
  }) {

    const posts = await Post.all()


    return view.render('post.index', {
      title: 'Latest Posts',
      posts: posts.toJSON()
    })
  }

  async details({
    params,
    view
  }) {
    const post = await Post.find(params.id)

    return view.render('post.details', {
      post: post
    })
  }

  async add({
    view
  }) {
    return view.render('post.add', {

    })
  }
}

module.exports = PostController
