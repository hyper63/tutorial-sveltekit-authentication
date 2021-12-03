//  Login endpoint

const ghAuthURL = 'https://github.com/login/oauth/authorize'
const clientId = import.meta.env.VITE_CLIENT_ID

export async function get(req) {
  const sessionId = '1234'
  //  Redirect request to GitHub authentication endpoint with CLIENT_ID
  return {
    status: 302,
    headers: {
      location: `${ghAuthURL}?client_id=${clientId}&state=${sessionId}`
    }
  }
}