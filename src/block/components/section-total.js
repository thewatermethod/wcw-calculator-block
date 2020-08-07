import { __ } from "@wordpress/i18n"; // Import __() from wp.i18n
import { InnerBlocks, RichText } from "@wordpress/block-editor";
import { FormToggle } from "@wordpress/components";

const sectionTotal = {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Calculator Section Total"), // Block title.
	icon: "chart-area", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: {
		sectionTitle: {
			type: "string",
			default: "Total so far",
		},
		totalAll: {
			type: "boolean",
			default: true,
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
		const { sectionTitle, htmlId, totalAll } = props.attributes;

		return (
			<React.Fragment>
				{isSelected ? (
					<div className="components-base-control">
						<div className="components-base-control__field">
							<label
								htmlFor="calc-total-all"
								className="components-base-control__label"
							>
								Should this total be the total of all sections?
							</label>
							<p>
								Otherwise, it will be the total of{" "}
								<strong>just this section</strong>.
							</p>

							<div>
								You've selected: "
								{totalAll ? <span>Yes</span> : <span>No</span>}"
							</div>

							<FormToggle
								id="calc-total-all"
								checked={totalAll}
								onChange={() => {
									setAttributes({ totalAll: !totalAll });
								}}
							/>
						</div>
					</div>
				) : null}
				<div className="section-total">
					<RichText
						tagName="label"
						placeholder={__("Total so far")}
						value={sectionTitle}
						onChange={(sectionTitle) => setAttributes({ sectionTitle })}
						formattingControls={[]}
						htmlFor={htmlId}
					/>
					<input
						id={htmlId}
						name={htmlId}
						type="number"
						disabled
						data-total-all={totalAll}
					/>
					<div className="section-total-note">
						<InnerBlocks
							allowedBlocks={["core/paragraph"]}
							template={[["core/paragraph", { placeholder: "Section notes" }]]}
							templateLock={false}
						/>
					</div>
				</div>
			</React.Fragment>
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
		const { sectionTitle, htmlId, totalAll } = props.attributes;

		return (
			<div className="section-total">
				<RichText.Content
					tagName="label"
					value={sectionTitle}
					htmlFor={htmlId}
				/>
				<input
					id={htmlId}
					name={htmlId}
					type="number"
					disabled
					data-total-all={totalAll}
				/>
				<div className="section-total-note">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
};

export { sectionTotal };
