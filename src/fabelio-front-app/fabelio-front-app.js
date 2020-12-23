import {html, PolymerElement} from '@polymer/polymer/polymer-element.js'
import './shared-style'
import "./header-element"
import "./main-element"
import '@polymer/iron-ajax/iron-ajax.js'

class FabelioFrontApp extends PolymerElement {
  static get template() {
    return html`
      <iron-ajax
        auto
        method="get"
        id="getData"
        url="https://www.mocky.io/v2/5c9105cb330000112b649af8"
        handle-as="json"
        on-response="handleResponse">
      </iron-ajax>
      
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

      <div class="container-fluid" style="padding-bottom: 30px">
        <!-- HEADER -->
        <header-element id="header_element"></header-element>
        <!-- MAIN -->
        <main-element id="main_element"></main-element>
      </div>
    `
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'fabelio-front-app'
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

  handleResponse(e, request) {
    let response = request.response
    this.dataApi = response
    this.dispatchEvent(new CustomEvent('getData', {detail: {data: response}}))
  }
}

window.customElements.define('fabelio-front-app', FabelioFrontApp)
