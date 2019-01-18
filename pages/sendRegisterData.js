import fetch from 'isomorphic-fetch'

// * snip *

function createBlogPost(data) {
  return fetch('http://api.symfony-3.dev/app_dev.php/posts', {
    method: 'POST',
    mode: 'CORS',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res
  }).catch(err => err)
}

export default createBlogPost
