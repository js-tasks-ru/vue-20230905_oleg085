import { isAuthenticated } from '../services/authService.js';
export default function guest({ next }) {

  if (isAuthenticated()) {
    return next({ name: 'index' })
  }

  return next()
}
