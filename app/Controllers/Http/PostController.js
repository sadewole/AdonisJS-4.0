'use strict'

// Import model
const Post = use('App/Models/Post')
// import validator
const {
  validate
} = use('Validator')

class PostController {
  // list viewer
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
    return view.render('post.add')
  }
  // create new item
  async store({
    request,
    response,
    session
  }) {
    // validation input
    const validation = await validate(request.all(), {
      title: 'required|min:3|max:255',
      body: 'required|min:3'
    })

    if (validation.fails()) {
      session.withErrors(validate.messages()).flashAll()
      return response.redirect('back')
    }

    const post = new Post()

    post.title = request.input('title')
    post.body = request.input('body')

    await post.save()
    session.flash({
      notification: 'Post added!'
    })

    return response.redirect('/posts')
  }

  // get edit post
  async edit({
    params,
    view
  }) {
    const post = await Post.find(params.id)
    return view.render('post.edit', {
      post: post
    })
  }

  async update({
    params,
    request,
    response,
    session
  }) {
    // validation input
    const validation = await validate(request.all(), {
      title: 'required|min:3|max:255',
      body: 'required|min:3'
    })

    if (validation.fails()) {
      session.withErrors(validate.messages()).flashAll()
      return response.redirect('back')
    }

    const post = await Post.find(params.id)

    post.title = request.input('title')
    post.body = request.input('body')

    await post.save()

    session.flash({
      notification: 'Post Updated!'
    })

    return response.redirect('/posts')
  }

  // delete post
  async destroy({
    params,
    session,
    response
  }) {
    const post = await Post.find(params.id)

    await post.delete()

    session.flash({
      notification: 'Post Deleted!'
    })

    return response.redirect('/posts')
  }
}

module.exports = PostController
