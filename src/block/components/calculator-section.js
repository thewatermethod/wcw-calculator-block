import { InnerBlocks, RichText } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n"; // Import __() from wp.i18n

const calculatorSection = {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Calculator Section"), // Block title.
	icon: "chart-area", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: {
		sectionTitle: {
			type: "string",
			default: "Section Title",
		},
	},
	parent: ["wcw/block-wcw-calculator"],
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
		const { setAttributes } = props;
		const { sectionTitle } = props.attributes;

		return (
			<div className="calculator-section">
				<div className="calculator-left">
					<RichText
						tagName="h3"
						placeholder={__("Section Title")}
						value={sectionTitle}
						onChange={(sectionTitle) => setAttributes({ sectionTitle })}
						formattingControls={[]}
					/>
				</div>

				<div className="calculator-right">
					<InnerBlocks
						allowedBlocks={[
							"wcw/calculator-field",
							"wcw/calculator-section-total",
						]}
						templateLock={false}
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
		const { sectionTitle } = props.attributes;

		return (
			<div className="calculator-section">
				<div className="calculator-left">
					<RichText.Content tagName="h3" value={sectionTitle} />
				</div>

				<div className="calculator-right">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
};

export { calculatorSection };
