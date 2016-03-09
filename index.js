var URL = require("url")

function embed (url, opts) {
  var id

  url = URL.parse(url, true)

  id = detectYoutube(url)
  if (id) return embed.youtube(id, opts)

  id = detectVimeo(url)
  if (id) return embed.vimeo(id, opts)

  id = detectDailymotion(url)
  if (id) return embed.dailymotion(id, opts)
}

function detectVimeo (url) {
  return (url.hostname == "vimeo.com") ? url.pathname.split("/")[1] : null
}

function detectDailymotion (url) {
  return (url.hostname == "www.dailymotion.com") ? url.pathname.split("/")[2] : null
}

function detectYoutube (url) {
  if (url.hostname.indexOf("youtube.com") > -1) {
    return url.query.v
  }

  if (url.hostname == "youtu.be") {
    return url.pathname.split("/")[1]
  }

  return null
}

embed.vimeo = function (id, opts) {
  return '<iframe width="100%" src="//player.vimeo.com/video/' + id + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
}

embed.dailymotion = function (id, opts) {
  return '<iframe width="100%" src="//www.dailymotion.com/embed/video/' + id + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
}

embed.youtube = function (id, opts) {
  return '<iframe width="100%" src="//www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe>'
}

module.exports = embed
