import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import LabeledField from './labeled_field';

class ContactForm extends Component {

	handleRestore() {
		const dataSet = this.props.dataSet;
		const data = localStorage.getItem(dataSet);
		this.props.restoreData(dataSet, JSON.parse(data));
	}

	handleSave() {
		const dataSet = this.props.dataSet;
		const data = this.props.form[dataSet].values;
		localStorage.setItem(dataSet, JSON.stringify(data));
	}

	render() {
		return (
			<div className="contact-form">

				<button type="button" className="btn-outline btn-small" onClick={this.handleRestore.bind(this)} >Palauta</button>
				<button type="button" className="btn-outline btn-small" onClick={this.handleSave.bind(this)} >Tallenna</button>

				<LabeledField name="name" label="Nimi" />
				<LabeledField name="address" label="Osoite" />
				<LabeledField name="zip" label="Postinumero" />
				<LabeledField name="city" label="Paikkakunta" />
				<LabeledField name="country" label="Maa" />
				<LabeledField name="email" label="Sähköposti" />
				<LabeledField name="business_id" label="Y-tunnus" />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		form: state.form
	};
}

export default connect(mapStateToProps, actions)(ContactForm);