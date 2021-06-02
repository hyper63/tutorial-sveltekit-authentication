import cookie from 'cookie'

export async function handle({ request, resolve }) {
  const cookies = cookie.parse(request.headers.cookie || '')

  // code here happends before the endpoint or page is called
  request.locals.user = cookies.user

  const response = await resolve(request)

  // code here happens after the endpoint or page is called
  response.headers['set-cookie'] = `user=${request.locals.user || ''}; Path=/; HttpOnly`

  return response
}

export async function getSession(request) {
  return {
    user: request.locals.user
  }
}