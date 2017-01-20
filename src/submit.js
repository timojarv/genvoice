import 'whatwg-fetch';

export default function submit(values) {
	const body = JSON.stringify({
		invoice: values
	});
	console.log("Sending: ", body);
	const invoiceGenerated = fetch('/', {
		method: 'POST',
		body: body,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	});
	return invoiceGenerated
		.then(response => response.json())
		.then(json => console.log(json));
};