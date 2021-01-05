import {html, PolymerElement} from '@polymer/polymer/polymer-element.js'
import './shared-style'

class HeaderElement extends PolymerElement {
  static get template() {
    return html`
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

      <style>
        .wrapper_checkbox {
          padding: 20px 20px; 
          background-color: white;
          z-index: 99;
          right: 0;
          margin: 0 15px;
          left: 0;
          border: 1px solid #ced4da;
          position: absolute;
        }

        #searchProduct {
          color: white; font-weight: bold; 
          border: 0;
          outline: 0;
          background: transparent;
          border-bottom: 1px solid white; 
          width:100%; 
          height: calc(1.5em + .75rem + 2px); 
          padding: .375rem 4px;
          font-size: 1.5rem;
        }

        #searchProduct::placeholder {
          color: white;
          opacity: 1;
          font-size: 1.5rem;
        }

        .is_hidden {
          display: none;
        }

        .form-check {
          padding: 5px 0 !important;
        }

        .form-check-input {
          margin-left: 50px !important;
        }

        select {
          cursor: pointer;
        }
      </style>
      
      <div id="wrapper_header" class="row" style="background-color: dodgerblue; padding: 30px 0;">
        <div class="container">
          <div class="row">
            <div class="col-md-6" style="margin-bottom:30px">
              <input type="input" id="searchProduct" placeholder="Search Furniture"/>
            </div>
            <div class="col-md-6"></div>
          </div>
          <div class="row">
            <div class="col-md-6">
                <input style="cursor:pointer" type="text" class="form-control" name="furniture_style" id="furniture_style" placeholder="Furniture Style" readonly>
                <div class="wrapper_checkbox is_hidden" id="wrapper_checkbox_furniture_style">
                  <template id="listProduct" is="dom-repeat" items="{{SelectFurniture}}">
                    <div style="display:flex; align-items: baseline;">
                      <label style="display:flex; flex:1">
                        [[item]]
                      </label>
                      <div style="display:flex; flex:1; justify-content: flex-end;"><input type="checkbox" class="checkboxFurniture" value="[[item]]" id="checkboxFurniture[[index]]"></div>
                    </div>
                  </template>
                </div>
            </div>
            <div class="col-md-6">
              <input style="cursor:pointer" type="text" class="form-control" name="delivery_time" id="delivery_time" placeholder="Delivery Time" readonly>
              <div class="wrapper_checkbox is_hidden" id="wrapper_checkbox_delivery_time">
              <template id="listProduct" is="dom-repeat" items="{{SelectDeliveryTime}}">
                <div style="display:flex; align-items: baseline;">
                  <label style="display:flex; flex:1">
                    [[item.label]]
                  </label>
                  <div style="display:flex; flex:1; justify-content: flex-end;"><input type="checkbox" class="checkboxDeliveryTime" value="[[item.value]]" id="checkboxDeliveryTime[[index]]"></div>
                </div>
              </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
  static get properties() {
    return {
      dataApi: {
        type: Array,
        value: []
      },
      keywordValue: {
        type: String,
        value: ""
      },
      SelectFurniture: {
        type: Array,
        value: []
      },
      listSelectFurniture: {
        type: Array,
        value: []
      },
      SelectDeliveryTime: {
        type: Array,
        value: [
          {
            label: "1 week",
            value: 7
          },
          {
            label: "2 weeks",
            value: 14
          },
          {
            label: "1 month",
            value: 30
          },
          {
            label: "More",
            value: 31
          }
        ]
      },
      ListSelectDeliveryTime: {
        type: Array,
        value: []
      },
      fabelio_front_app: {
        type: String,
        value: document.getElementById("fabelio_front")
      },
    }
  }

  ready() {
    super.ready()
    this.fabelio_front_app.addEventListener('getData', (e)=> {
      this.SelectFurniture = e.detail.data.furniture_styles
      this.dataApi = e.detail.data.products
    })

    this.$.wrapper_header.addEventListener("click", (e)=>{
      if(e.target.id == "furniture_style") {
        this.$.wrapper_checkbox_furniture_style.classList.toggle("is_hidden")
      }

      if(e.target.id == "delivery_time") {
        this.$.wrapper_checkbox_delivery_time.classList.toggle("is_hidden")
      }

      if (e.target.className == "checkboxFurniture") {
        this.PopulateListSelectFurniture(e)
      }

      if(e.target.className == "checkboxDeliveryTime") {
        this.PopulateListSelectDeliveryTime(e)
      }
    })
    
    this.$.searchProduct.addEventListener("input", (e)=>{
      this.keywordValue = this.$.searchProduct.value.toLowerCase()
      this.mergeFilter()
    })
  }

  PopulateListSelectFurniture(e) {
    if(e.target.checked) {
      this.listSelectFurniture.push(e.target.value)
    } else {
      var index = this.listSelectFurniture.indexOf(e.target.value)
      if (index !== -1) {
        this.listSelectFurniture.splice(index, 1)
      }
    }
    this.mergeFilter()
  }

  PopulateListSelectDeliveryTime(e) {
    if(e.target.checked) {
      this.ListSelectDeliveryTime.push(e.target.value)
    } else {
      var index = this.ListSelectDeliveryTime.indexOf(e.target.value)
      if (index !== -1) {
        this.ListSelectDeliveryTime.splice(index, 1)
      }
    }
    this.mergeFilter()
  }

  mergeFilter() {
    let resultFilter =  this.dataApi.filter(element => this.filterByKeyword(element))
                                    .filter(element => this.FilterByFurniture(element))
                                    .filter(element => this.FilterByDelivery(element))
    this.rewriteOriginalData(resultFilter)
  }

  filterByKeyword(element){
    if(this.keywordValue.length == 0) {
      return element
    } else {
      return element.name.toLowerCase().indexOf(this.keywordValue) > -1
    }
  }

  FilterByFurniture(element) {
    if(this.listSelectFurniture.length == 0) {
      return element
    } else {
      return element.furniture_style.some(x => this.listSelectFurniture.indexOf(x) > -1)
    }
  }

  FilterByDelivery(element) {
    if(this.ListSelectDeliveryTime.length == 0) {
      return element
    } else {
      return this.ListSelectDeliveryTime.some(x => parseInt(element.delivery_time) <= parseInt(x))
    }
  }

  rewriteOriginalData(resultFilter) {
    let product_list = this.fabelio_front_app.$.main_element.$.product_list

    product_list.set('dataApi', resultFilter.map(item => {
      return {delivery_time: `${item.delivery_time} Days`, description: `${item.description.substring(0, 114)}...`, furniture_style: item.furniture_style, name: item.name, price: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.price)}
    }));
  }
}

window.customElements.define('header-element', HeaderElement)