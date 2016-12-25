module.exports = {

	generateReference: function(id) {
		var sum = 0;
		for(i = 0; i < id.length; i++) {
			sum += id[id.length - 1 - i] * "731"[i % 3];
		}
		return id + ((10 - sum % 10) % 10);
	}

};

