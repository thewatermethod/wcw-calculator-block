/**
 * BLOCK: calculator
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./editor.scss";
import "./style.scss";
import { __ } from "@wordpress/i18n"; // Import __() from wp.i18n
import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks, RichText } from "@wordpress/block-editor";
import { FormToggle } from "@wordpress/components";

import { sectionTotal } from "./components/section-total";
import { calculatorField } from "./components/calculator-field";
import { calculatorSection } from "./components/calculator-section";

registerBlockType("wcw/calculator-section-total", sectionTotal);
registerBlockType("wcw/calculator-field", calculatorField);
registerBlockType("wcw/calculator-section", calculatorSection);

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("wcw/block-wcw-calculator", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Calculator"), // Block title.
	icon: "chart-area", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: {
		blockTitle: {
			type: "string",
			default: "Costs Calculator",
		},
		showTotal: {
			type: "boolean",
			default: true,
		},
	},
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
		const { setAttributes, isSelected } = props;
		const { blockTitle, showTotal } = props.attributes;

		return (
			<React.Fragment>
				<div className={props.className}>
					<RichText
						tagName="h2"
						className="calculator-title"
						placeholder={__("Cost Calculator")}
						value={blockTitle}
						onChange={(blockTitle) => setAttributes({ blockTitle })}
						formattingControls={[]}
					/>

					<InnerBlocks allowedBlocks={["wcw/calculator-section"]} />

					{showTotal ? (
						<div className="calculator-total">
							<span>Total</span>
							<span>$25,000</span>
						</div>
					) : null}

					{isSelected ? (
						<div className="components-base-control">
							<div className="components-base-control__field">
								<label
									style={{ display: "block" }}
									className="components-base-control__label"
									htmlFor="calc_show_total"
								>
									Show total
								</label>
								<FormToggle
									id="calc_show_total"
									checked={showTotal}
									onChange={() => {
										setAttributes({ showTotal: !showTotal });
									}}
								/>
							</div>
						</div>
					) : null}
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
		const { blockTitle, showTotal } = props.attributes;

		return (
			<React.Fragment>
				<div className="wp-block-wcw-block-calculator">
					<RichText.Content
						tagName="h2"
						className="calculator-title"
						value={blockTitle}
					/>

					<InnerBlocks.Content />

					{showTotal ? (
						<div className="calculator-total">
							<span>Total</span>
							<span>$25,000</span>
						</div>
					) : null}
				</div>
			</React.Fragment>
		);
	},
});
