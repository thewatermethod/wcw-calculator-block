const handleCalculatorFieldChange = (eventTarget, calculator) => {
	if (parseInt(eventTarget.value) == NaN) {
		eventTarget.value = 0;
	}

	eventTarget.dataset.eventAttached = "true";
	handleCalculations(calculator);
};

const handleCalculations = (calculator) => {
	// reset total to zero
	let total = 0;
	updateTotal(calculator, total);

	// handle each section one by one
	const sections = calculator.querySelectorAll(".calculator-section");

	sections.forEach((section) => {
		const sectionTotal = handleCalculationsBySection(calculator, section);
		total += sectionTotal;
	});

	//update total with new total
	updateTotal(calculator, total);
};

const handleCalculationsBySection = (calculator, section) => {
	let sectionTotal = 0;
	const fields = section.querySelectorAll(".calculator-field-set input");

	fields.forEach((field) => {
		const isEditable = field.dataset.isEditable == "true";
		const eventAttached = field.dataset.eventAttached == "true";

		let value = parseInt(field.value);

		if (field.dataset.operation == "subtraction") {
			value = value * -1;
		}

		if (!isEditable) {
			field.setAttribute("disabled", "disabled");
		}

		sectionTotal += value;

		if (isEditable && !eventAttached) {
			field.addEventListener("change", (e) => {
				handleCalculatorFieldChange(e.target, calculator);
			});
		}
	});

	const totals = section.querySelectorAll(".section-total input");

	totals.forEach((total) => {
		const totalAll = "true" == total.dataset.totalAll;

		if (!totalAll) {
			total.setAttribute("value", sectionTotal);
		}
	});

	return sectionTotal;
};

const calculator = () => {
	const calculators = document.querySelectorAll(
		`.wp-block-wcw-block-calculator`
	);

	// its a calculator not a crocodile
	calculators.forEach((crocodile) => {
		handleCalculations(crocodile);
	});
};

const updateTotal = (calculator, total) => {
	calculator.querySelector(
		".calculator-total span:nth-child(2)"
	).innerText = total;

	const sectionTotals = calculator.querySelectorAll(
		`input[data-total-all="true"]`
	);
	sectionTotals.forEach((sectionTotal) => {
		sectionTotal.value = total;
	});
};

calculator();
