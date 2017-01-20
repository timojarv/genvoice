import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import LabeledField from './labeled_field';

class InvoiceDetailsForm extends Component {
	render() {
		return (
			<div id="invoice-details" className="row">
				<div className="col-6">
					<LabeledField className="col-6" name="title" label="Laskun otsikko" />
				</div>
				<div className="col-6">
					<LabeledField className="col-6" name="term" label="Maksuehto" />
				</div>
			</div>
		);
	}
}

InvoiceDetailsForm = reduxForm({
	form: 'invoice'
})(InvoiceDetailsForm);

export default InvoiceDetailsForm;