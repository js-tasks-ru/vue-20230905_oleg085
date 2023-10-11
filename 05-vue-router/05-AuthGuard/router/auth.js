import { isAuthenticated } from '../services/authService.js';

export default function auth({ next, to }) {

  return isAuthenticated()
    ? next()
    : next({ name: 'login', query: { from: to.path } })

}
