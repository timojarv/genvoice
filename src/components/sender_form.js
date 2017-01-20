import React, { Component } from 'react';
import { FormSection, Field, reduxForm } from 'redux-form';

import ContactForm from './contact_form';
import BankForm from './bank_form';

class SenderForm extends Component {
	render() {
		return (
			<FormSection name="sender" id="sender-form" className="col-6">
				<h3 className="col-6">Lähettäjä</h3>
				<ContactForm dataSet="sender" />
				<h4>Pankkitiedot</h4>
				<BankForm />
			</FormSection>
		);
	}
}

/*SenderForm = reduxForm({
	form: 'sender'
})(SenderForm);*/

export default SenderForm;