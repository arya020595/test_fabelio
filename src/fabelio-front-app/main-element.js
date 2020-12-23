import {html, PolymerElement} from '@polymer/polymer/polymer-element.js'
import './shared-style'
import "./product-list"

class MainElement extends PolymerElement {
  static get template() {
    return html`
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

      <div class="row">
        <div class="container">
          <product-list id="product_list"></product-list>
        </div>
      </div>
    `
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'main-element'
      },
      dataApi: {
        type: Object,
        value: {}
      }
    }
  }

  ready() {
    super.ready()
  }
}

window.customElements.define('main-element', MainElement)
