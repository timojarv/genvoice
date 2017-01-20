import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import InvoiceDetailsForm from './invoice_details_form';
import SenderForm from './sender_form';
import RecipientForm from './recipient_form';
import ProductsSection from './products_section';

import submit from '../submit';

const InvoiceForm	= (props) => (
	<form id="invoice-form" onSubmit={props.handleSubmit(submit)}>
		<InvoiceDetailsForm />
		<SenderForm />
		<RecipientForm />
		<ProductsSection />
		<button type="submit" className="btn">Luo lasku</button>
	</form>
);

export default reduxForm({
	form: 'invoice'
})(InvoiceForm);