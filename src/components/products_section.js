import React, { Component } from 'react';
import { FieldArray, reduxForm } from 'redux-form';

import LabeledField from './labeled_field';

class ProductsSection extends Component {
	renderProducts({fields}) {
		return (
				<ul className="products">
					<li className="row">
						<h2 className="col-8">Tuotteet</h2>
						<button type="button" className="btn-outline col-4" onClick={() => fields.push({})}>Lisää tuote</button>
					</li>
					{fields.map(this.renderProductForm.bind(this, fields))}
				</ul>
		);
	}

	renderProductForm(fields, member, index) {
		return (
			<li key={index} className="product-item row">
				<div className="col-4"><LabeledField name={`${member}.name`} label="Nimi / kuvaus" /></div>
				<div className="col-2"><LabeledField name={`${member}.price`} label="Kappalehinta" /></div>
				<div className="col-2"><LabeledField name={`${member}.tax`} label="Vero %" /></div>
				<div className="col-2"><LabeledField name={`${member}.amount`} label="Määrä" /></div>
				<div className="col-2"><LabeledField name={`${member}.unit`} label="Yksikkö" /></div>
				<div className="col-12"><button type="button" className="btn-outline btn-red" onClick={() => fields.remove(index)}>
					Poista tuote
				</button></div>
			</li>
		);
	}

	render() {
		return (
			<FieldArray name="items" component={this.renderProducts.bind(this)} />
		);
	}
}

export default ProductsSection;