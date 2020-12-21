import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './shared-style'

class FabelioFrontApp extends PolymerElement {
  static get template() {
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
      <style include="shared-style">
      </style>

      <div class="alert alert-primary" role="alert">
        A simple primary alert—check it out!
      </div>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'fabelio-front-app'
      }
    };
  }
}

window.customElements.define('fabelio-front-app', FabelioFrontApp);
