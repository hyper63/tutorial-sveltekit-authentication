//  Logout endpoint

export async function get(req) {
  //  Sets the user equal to null...
  req.locals.user = null
  //  ...and redirect the request back to the home page
  return {
    status: 302,
    headers: {
      location: '/',
      'set-cookie': `user=; expires=Thu, 18 Dec 2013 12:00:00 UTC; Path=/; HttpOnly`
    }
  }
}