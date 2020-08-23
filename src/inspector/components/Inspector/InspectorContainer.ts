import { connect, MapDispatchToPropsFunction } from "react-redux";
import { IInspectorDispatch, IInspectorProps, Inspector } from "./Inspector";
import { setMainTabAction, setModeTabAction } from "../../actions/inspectorActions";
import { getMainTabID, getModeTabID, getActiveDescriptorContent, getActiveDescriptorCalculatedReference, getActiveDescriptorOriginalReference, getSelectedDescriptors, getLeftTreeDiff, getRightTreeDiff, getSecondaryAutoActiveDescriptor, getAutoActiveDescriptor, getRightRawDiff, getLeftRawDiff } from "../../selectors/inspectorSelectors";
import { IRootState } from "../../../shared/store";


const mapStateToProps = (state: IRootState): IInspectorProps => {
	return {
		mainTab: getMainTabID(state),
		modeTab: getModeTabID(state),
		descriptorContent:getActiveDescriptorContent(state),
		originalReference: getActiveDescriptorCalculatedReference(state),
		calculatedReference: getActiveDescriptorOriginalReference(state),
		rightRawDiff: getRightRawDiff(state),
		leftRawDiff: getLeftRawDiff(state),
	};
};

const mapDispatchToProps: MapDispatchToPropsFunction<IInspectorDispatch, Record<string, unknown>> = (dispatch):IInspectorDispatch => {
	return {
		setMainTab: (key) => dispatch(setMainTabAction(key)),
		setModeTab: (key)  => dispatch(setModeTabAction(key)),
	};
};

export const InspectorContainer = connect<IInspectorProps, IInspectorDispatch>(mapStateToProps, mapDispatchToProps)(Inspector);