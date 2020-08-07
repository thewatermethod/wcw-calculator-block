import { InnerBlocks, RichText } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n"; // Import __() from wp.i18n
import { FormToggle, SelectControl, TextControl } from "@wordpress/components";

const calculatorField = {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Calculator Field"), // Block title.
	icon: "chart-area", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: {
		defaultValue: {
			type: "string",
			default: "0",
		},
		htmlId: {
			type: "string",
			default: "",
		},
		isEditable: {
			type: "boolean",
			default: true,
		},
		label: {
			type: "string",
			default: "Field label",
		},
		operation: {
			type: "string",
			default: "addition",
		},
	},
	parent: ["wcw/calculator-section"],
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: (props) => {
		const { isSelected, setAttributes } = props;
		const {
			defaultValue,
			htmlId,
			isEditable,
			label,
			operation,
		} = props.attributes;

		return (
			<div className="calculator-field-set">
				<RichText
					tagName="label"
					placeholder={__("Cost of tuition")}
					value={label}
					onChange={(label) => setAttributes({ label })}
					formattingControls={[]}
					htmlFor={htmlId}
				/>

				{isSelected ? (
					<span
						style={{
							display: "block",
							fontFamily: "Andes W04 Regular",
							fontSize: "12px",
							textTransform: "uppercase",
						}}
					>
						<em>Enter the default value here:</em>
					</span>
				) : null}
				<input
					onChange={(e) => {
						setAttributes({ defaultValue: e.target.value });
					}}
					type="number"
					value={defaultValue}
					id={htmlId}
					name={htmlId}
					data-is-editable={isEditable}
					data-operation={operation}
					min="0"
				/>
				{isSelected ? (
					<div
						style={{
							background: "rgb(234, 225, 225)",
							border: "1px solid black",
							margin: "1em 0",
							padding: "0.5em",
						}}
					>
						<TextControl
							label="HTML ID"
							value={htmlId}
							onChange={(htmlId) => setAttributes({ htmlId })}
						/>
						<SelectControl
							label="Operation"
							value={operation}
							options={[
								{ label: "Addition", value: "addition" },
								{ label: "Subtraction", value: "subtraction" },
							]}
							onChange={(operation) => {
								setAttributes({ operation });
							}}
						/>

						<div className="components-base-control">
							<div className="components-base-control__field">
								<label
									style={{ display: "block" }}
									className="components-base-control__label"
									htmlFor="is-editable"
								>
									Is this field editable by the user?
								</label>
								<FormToggle
									id="is-editable"
									checked={isEditable}
									onChange={() => {
										setAttributes({ isEditable: !isEditable });
									}}
								/>
							</div>
						</div>
					</div>
				) : null}

				<div className="calculator-field-hint">
					<InnerBlocks
						allowedBlocks={["core/paragraph"]}
						template={[
							[
								"core/paragraph",
								{ placeholder: "This is the calculator field hint" },
							],
						]}
						templateLock={"all"}
					/>
				</div>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: (props) => {
		const {
			defaultValue,
			htmlId,
			isEditable,
			label,
			operation,
		} = props.attributes;

		return (
			<div className="calculator-field-set">
				<RichText.Content tagName="label" value={label} htmlFor={htmlId} />

				<input
					type="number"
					value={defaultValue}
					id={htmlId}
					name={htmlId}
					data-is-editable={isEditable}
					data-operation={operation}
					min="0"
				/>

				<div className="calculator-field-hint">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
};

export { calculatorField };
