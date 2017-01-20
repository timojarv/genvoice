import React from 'react';
import { Field } from 'redux-form';

const renderField = ({input, label, type, meta: { touched, error }}) => (
	<span>
		<input {...input} placeholder={label} type={type} className="form-input"/>
	</span>
);

export default function LabeledField(props) {
	return (
		<Field
			label={props.label}
			name={props.name}
			type="text"
			component={renderField}
		/>
	);
}