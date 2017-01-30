import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../components/search/app'

export default class SearchRouter extends BaseRouter {
  register() {
    this.route('/users/search/', this.decorateApp)
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-search', App)
    next()
  }
}
