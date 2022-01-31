//  This file exports two functions that run on the server...

import cookie from 'cookie'

//  ...every time a request is received... 
export async function handle({ event, resolve }) {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '')

  //  ...any user for the request is defined by the cookie...
  event.locals.user = cookies.user

  //  ...before the endpoint or page is called...
  const response = await resolve(event)

  //  ...and then the cookie is set or updated...
  response.headers['set-cookie'] = `user=${event.locals.user || ''}; Path=/; HttpOnly`

  return response
}

// ...or whenever a page is rendered the user is returned
export async function getSession(request) {
  return {
    user: request.locals.user
  }
}