//  Endpoint for redirection from GitHub after authorization...

import fetch from 'node-fetch'
const tokenURL = 'https://github.com/login/oauth/access_token'
const userURL = 'https://api.github.com/user'

const clientId = import.meta.env.VITE_CLIENT_ID
const secret = import.meta.env.VITE_CLIENT_SECRET


export async function get({ locals, url }) {
  //  ...uses that code query parameter from GitHub...
  const code = url.searchParams.get('code')
  //  ...to get an access_token for the authorized user from GitHub...
  const accessToken = await getAccessToken(code)
  //  ...to get the user information from Github
  const user = await getUser(accessToken)
  // this mutates the locals object on the request
  // and will be read by the hooks/handle function
  // after the resolve
  locals.user = user.login

  return {
    status: 302,
    headers: {
      location: '/',
      'set-cookie': [`user=${user.login || ''}; Path=/; HttpOnly`]
    }
  }
}

async function getAccessToken(code) {
  const r = await fetch(tokenURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: secret,
      code
    })
  })
  const r_1 = await r.json()
  return r_1.access_token
}

async function getUser(accessToken) {
  const r = await fetch(userURL, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })
  return r.json()
}