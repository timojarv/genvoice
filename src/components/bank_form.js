import React, { Component } from 'react';
import { FormSection, Field, reduxForm } from 'redux-form';

import LabeledField from './labeled_field';

class BankForm extends Component {
	render() {
		return (
			<FormSection name="bank">
				<LabeledField name="fullname" label="Saajan nimi" />
				<LabeledField name="iban" label="IBAN" />
				<LabeledField name="bic" label="BIC" />
			</FormSection>
		);
	}
}

/*BankForm = reduxForm({
	form: 'bank'
})(BankForm);*/

export default BankForm;