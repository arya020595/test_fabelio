import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './shared-style'

class ProductList extends PolymerElement {
  static get template() {
    return html`
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

      <style>
        #wrapper_list_product {
          margin-top: 30px
        }
      </style>

      <div class="row">
        <template id="listProduct" is="dom-repeat" items="{{dataApi}}">
          <div class="col-md-6" id="wrapper_list_product">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6"><div class="card-title"><b>[[item.name]]</b></div></div>
                  <div class="col-md-6" style="text-align: right; color: orange;"><b>[[item.price]]</b></div>
                </div>
                <p class="card-text">[[item.description]]</p>
                <p class="card-text">
                <template is="dom-repeat" items="{{item.furniture_style}}" as="sub_item">
                  <a href="#">[[sub_item]]</a><template is="dom-if" if="[[!isEqualTo(item.furniture_style, sub_item)]]">,</template>
                </template>
                </p>
                <div style="text-align: right" class="card_footer">
                  <a href="#"><b>[[item.delivery_time]]</b></a>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    `
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'product-list'
      },
      dataApi: {
        type: Array,
        value: []
      },
      data_temp: {
        type: Array,
        value: []
      },
    };
  }

  ready() {
    super.ready()
    let fabelio_front_app = document.getElementById("fabelio_front")
    
    fabelio_front_app.addEventListener('getData', (e)=> {
      this.dataApi = e.detail.data.products.map(item => {
        return {delivery_time: `${item.delivery_time} Days`, description: `${item.description.substring(0, 114)}...`, furniture_style: item.furniture_style, name: item.name, price: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.price)}
      })
      this.data_temp = this.dataApi
    })
  }

  isEqualTo(items, item) {
    return (items[items.length - 1] === item)
  }
}

window.customElements.define('product-list', ProductList)
