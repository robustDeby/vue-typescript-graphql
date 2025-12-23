import { getToken } from '../auth/index'
import {jwtDecode} from 'jwt-decode'

interface JwtPayload {
  exp: number
}

export function hasValidLocalToken(): boolean {
  const token = getToken()
  if (!token) return false

  try {
    const { exp } = jwtDecode<JwtPayload>(token)
    return exp * 1000 > Date.now()
  } catch {
    return false
  }
}
