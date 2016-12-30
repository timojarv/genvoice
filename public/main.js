$("form").on('submit', function(e) {
	e.preventDefault();
	var r = $("#recipient"), s = $("#sender");
	var invoice = {
		title: $("#title").val(),
		term: $("#term").val(),
		sender: {
			name: s.find(".name").val(),
			address: s.find(".address").val(),
			zip: s.find(".zip").val(),
			city: s.find(".city").val(),
			country: s.find(".country").val(),
			email: s.find(".email").val(),
			business_id: s.find(".business_id").val(),
			bank: {
				fullname: s.find(".fullname").val(),
				iban: s.find(".iban").val(),
				bic: s.find(".bic").val()
			}
		},
		recipient: {
			name: r.find(".name").val(),
			address: r.find(".address").val(),
			zip: r.find(".zip").val(),
			city: r.find(".city").val(),
			country: r.find(".country").val(),
			email: r.find(".email").val(),
			business_id: r.find(".business_id").val()
		},
		items: []
	};

	var item;

	$(".items > .item").each(function() {
		item = {
			name: $(this).find(".name").val(),
			price: $(this).find(".price").val() || 0,
			tax: $(this).find(".tax").val(),
			amount: $(this).find(".amount").val(),
			unit: $(this).find(".unit").val(),
		};

		invoice.items.push(item);
	});

	$.ajax({
		method: 'POST',
		contentType: "application/json",
		processData: false,
		data: JSON.stringify({invoice: invoice}),
		success: function(data) {
			$("body").append("<a href='" + data.filename + "'>Lataa</a>");
		}
	});
});