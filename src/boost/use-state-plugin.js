/**
 * component instance state cast
 */
export default {
  install: (app, options) => {
    app.directive('state', {
      mounted (el, binding, vnode, oldVnode) {
        console.log('el', el, binding);
      }
    });
  }
}
