import React, { Component } from 'react';
import { FormSection, Field, reduxForm } from 'redux-form';

import ContactForm from './contact_form';

class RecipientForm extends Component {
	render() {
		return (
			<FormSection name="recipient" id="recipient-form" className="col-6">
				<h3 className="col-6">Vastaanottaja</h3>
				<ContactForm dataSet="recipient" />
			</FormSection>
		);
	}
}

/*RecipientForm = reduxForm({
	form: 'recipient'
})(RecipientForm);*/

export default RecipientForm;