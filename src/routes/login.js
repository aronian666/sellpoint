import User from "$lib/db/User";
import { serialize } from 'cookie'

export async function post({ request }) {
  const body = await request.json()
  const { email, password } = body.user
  const user = await User.findOne({ email })
  if (user) {
    const valid = await user.validPassword(password)

    if (valid) {
      const token = user.generateJWT()
      const jwt = serialize("jwt", token, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true })
      return { status: 303, headers: { 'Set-Cookie': jwt, Location: '/' } }
    }

    return { status: 404, body: { error: "Invalid password" } }
  }
  return { status: 404, body: { error: "User not found" } }
}
