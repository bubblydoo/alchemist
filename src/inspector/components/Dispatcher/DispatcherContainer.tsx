import { connect } from "react-redux";
import { IRootState } from "../../../shared/store";
import { setDispatcherValueAction, addDescriptorAction } from "../../actions/inspectorActions";
import { getDispatcherSnippet } from "../../selectors/dispatcherSelectors";
import { getInspectorSettings } from "../../selectors/inspectorSelectors";

/* eslint-disable quotes */
import React from "react";
import "./Dispatcher.less";
import { Helpers } from "../../classes/Helpers";
import { ITargetReference, IDescriptor, ISettings } from "../../model/types";
import { RawDataConverter } from "../../classes/RawDataConverter";
import { getInitialState } from "../../store/initialState";
import { str as crc } from "crc-32";
// eslint-disable-next-line @typescript-eslint/no-var-requires
import Sval from "sval";
import { Dispatch } from "redux";

class Dispatcher extends React.Component<TDispatcher, Record<string,unknown>> {

	constructor(props: TDispatcher) {
		super(props);

		this.state = {};
	}

	private change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		this.props.setDispatcherValue(e.currentTarget.value);
	}

	private send = async () => {
		try {
			const snippet = this.props.snippet;
			const startTime = Date.now();			
			let data: any;
			try {
				data = await (async function  () {
					const interpreter = new Sval({
						ecmaVer: 9,
						sandBox: false,
					});
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					interpreter.import("uxp", require("uxp"));
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					interpreter.import("os", require("os"));

					interpreter.run(`
						"use strict";
						async function userCode(){${snippet}};
						exports.returnValue = userCode();
					`);
					const res = await interpreter.exports.returnValue;
					return res;
				})();
			} catch (e) {
				data = {error:e.stack};
			}
			const endTime = Date.now();

			const originalReference: ITargetReference = {
				type: "listener",
				data: [{
					subType: "listenerCategory",
					content: {
						filterBy: "off",
						value: "dispatch",
					},
				}],
			};
			const result: IDescriptor = {
				endTime,
				startTime,
				id: Helpers.uuidv4(),
				locked: false,
				//crc:Date.now()+Math.random(),
				crc:crc(JSON.stringify(data||"__empty__")),
				originalData: RawDataConverter.replaceArrayBuffer(data),
				originalReference,
				pinned: false,
				selected: false,
				renameMode: false,
				calculatedReference: data,
				title: "Dispatched",
				descriptorSettings: this.props.settings.initialDescriptorSettings,
			};

			//this.props.setLastHistoryID;
			this.props.onAddDescriptor(result);
		} catch (e) {
			console.error(e);
		}
	}


	public render(): JSX.Element {
		return (
			<div className="Dispatcher">				
				<div className="help">Use <code>{`return`}</code> to add result into descriptor list. E.g. <code>{`return await batchPlay([{_obj:"invert"}])`}</code><br /></div>
				<div className="textareaWrap">
					<span className="placeholder">{this.props.snippet}</span>
					<textarea defaultValue={this.props.snippet} onChange={this.change} maxLength={Number.MAX_SAFE_INTEGER} placeholder={getInitialState().dispatcher.snippets[0].content} />
				</div>
				<div className="button" onClick={this.send}>Send</div>
			</div>
		);
	}
}


type TDispatcher = IDispatcherProps & IDispatcherDispatch

interface IDispatcherProps{
	snippet: string
	settings:ISettings
}

const mapStateToProps = (state: IRootState): IDispatcherProps => ({
	snippet: getDispatcherSnippet(state),
	settings: getInspectorSettings(state),
});

interface IDispatcherDispatch {
	setDispatcherValue: (value: string) => void
	onAddDescriptor: (descriptor: IDescriptor) => void
}

const mapDispatchToProps = (dispatch:Dispatch):IDispatcherDispatch => ({
	setDispatcherValue: (value) => dispatch(setDispatcherValueAction(value)),
	onAddDescriptor: (desc) => dispatch(addDescriptorAction(desc,false)),
});

export const DispatcherContainer = connect<IDispatcherProps, IDispatcherDispatch, Record<string,unknown>, IRootState>(mapStateToProps, mapDispatchToProps)(Dispatcher);