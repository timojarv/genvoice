import React from 'react';

import InvoiceForm from './invoice_form';

const handleSubmit = (values) => {
	console.log(values);
};

export default function App(props) {
	return (
		<div id="app" className="grid">
			<h1>Luo uusi lasku</h1>
			<InvoiceForm onSubmit={handleSubmit} />
		</div>
	);
};