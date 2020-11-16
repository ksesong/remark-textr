var visit = require('unist-util-visit')
var otextr = require('textr')

module.exports = textr

function textr(options) {
  var settings = options || {}
  var tf = otextr(settings.options || {})

  tf.use.apply(tf, (settings.plugins || []).map(load))

  return transform

  function transform(tree) {
    visit(tree, 'text', visitorText)
    visit(tree, 'link', visitorLink)
    visit(tree, 'image', visitorImage)
  }

  function visitorText(node) {
    node.value = tf(node.value)
  }
  function visitorLink(node) {
    if (node.title !== null) {
      node.title = tf(node.title)
    }
  }
  function visitorImage(node) {
    if (node.title !== null) {
      node.title = tf(node.title)
    }
    if (node.alt !== null) {
      node.alt = tf(node.alt)
    }
  }
}

function load(fn) {
  return typeof fn === 'string' ? require(fn) : fn
}
