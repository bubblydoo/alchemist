import type { ITargetReferenceAM } from "../classes/GetInfo";
import { TState } from "../components/FilterButton/FilterButton";
import { IActionSetUUID, IATNConverterState } from "../../atnDecoder/types/model";
import { Descriptor } from "photoshop";

export type TDialogOptions = "silent" | "dontDisplay" | "display";
export type TModalBehavior = "wait" | "execute" | "fail"
export type TFontSizeSettings = "size-tiny" | "size-small" | "size-default" | "size-bigger" | "size-big" | "size-youMustBeJoking"

export type TSubTypes = "action" | "actionset" | "category" | "channel" | "command" | "document" | "guide" | "history" | "kind" | "layer" | "path" | "property" | "snapshot"|"listenerCategory";
export type TTargetReference = "listener"|"customDescriptor" | "featureData" | "generator" | "overkill" | TPropertyClass;
export type TPropertyClass = "application" | "history" | "snapshot" | "layer" | "path" | "channel" | "document" | "guide" | "action";
export type TPropertyType = "hidden" | "optional" | "default";
export type ITreeDataTabs =  "content" | "difference" | "reference"|"dom"
export type TActiveInspectorTab = ITreeDataTabs;


export type TGenericViewType = "tree" | "raw";
export type TCodeViewType = "generated" | "options";

export type TActiveSection = "descriptors" | "settings";

export type TExportItems = "selected" | "all";
export type TImportItems = "append" | "replace";

//export type TAllTabs = TActiveSection|TActiveInspectorTab

//export type TActiveTargetReference = null|Record<string unknown>|ITargetReferenceApplication|ITargetReferenceCustomDescriptor|ITargetReferenceHistory|ITargetReferenceSnapshot|ITargetReferenceLayer|ITargetReferencePath|ITargetReferenceChannel|ITargetReferenceDocument|ITargetReferenceGuide|ITargetReferenceAction 

export type TPath = (string)[];
export type TCustomDescriptorReference = "notSpecified" | "anySpecified";
export type TBaseProperty = "notSpecified" | "anySpecified";
export type TCategoryReference = "notSpecified" | "anySpecified";
export type THistoryReference = "active" | string;
export type TSnapshotReference = "active" | string;
export type TDocumentReference = "active" | string;
export type TLayerReference = "active" | string;
export type TPathReference = "active" | "vectorMask" | "workPathIndex" | string;
export type TGeneratorReference = "full"
export type TListenerCategoryReference = "notSpecified" | "anySpecified"|"listener"|"reply"|"dispatch";
export type TChannelReference = "active" | TChannelReferenceValid;
export type TChannelReferenceValid = "composite" | "RGB" | "red" | "green" | "blue" | "CMYK" | "black" | "cyan" | "magenta" | "yellow" | "lab" | "lightness" | "a" | "b" | "gray" | "monotone" | "duotone" | "tritone" | "quadtone" | "mask" | "transparencyEnum" | "filterMask" | string;
export type TGuideReference = "" | string;
export type TActionSet = "" | string;
export type TActionItem = "" | string;
export type TActionCommand = "" | string;
export type TFilterEvents = "none" | "include" | "exclude";

export type TSelectDescriptorOperation = "replace" | "add" | "subtract"|"addContinuous"|"subtractContinuous"|"none";

export type TProtoMode = "none" | "uxp" | "advanced" | "all";
export type TDescriptorsGrouping = "none" | "eventName"



export interface IInspectorState {
	version: [number, number, number]
	activeSection: TActiveSection
	selectedReferenceType: TTargetReference
	filterBySelectedReferenceType: TState
	descriptorsGrouping: TDescriptorsGrouping
	targetReference: ITargetReference[]
	settings:ISettings
	inspector:IInspector
	descriptors: IDescriptor[]
	amConvertor: IAMCoverter
	dispatcher: IDispatcher
	atnConverter:IATNConverterState
}

export interface ITargetReference {
	type: TTargetReference
	data: TAllReferenceSubtypes[]
}

export interface IDispatcher{
	snippets: [
		{
			content:string
		}
	]
}


//////

export interface IContentWrapper<T>{
	value: T
	filterBy: TState
}

export interface ICategory{
	subType:"category"
	content: IContentWrapper<TCategoryReference>
}
export interface IProperty{
	subType:"property"
	content: IContentWrapper<TBaseProperty>
}
export interface ICustomDescriptor{
	subType:"customDescriptor"
	content: IContentWrapper<TCustomDescriptorReference>
}
export interface IHistory{
	subType:"history"
	content: IContentWrapper<THistoryReference>
}
export interface ISnapshot{
	subType:"snapshot"
	content: IContentWrapper<TSnapshotReference>
}
export interface ILayer{
	subType:"layer"
	content: IContentWrapper<TLayerReference>
}
export interface IPath{
	subType:"path"
	content: IContentWrapper<TPathReference>
}
export interface IChannel{
	subType:"channel"
	content: IContentWrapper<TChannelReference>
}
export interface IDocument{
	subType:"document"
	content: IContentWrapper<TDocumentReference>
}
export interface IGuide{
	subType:"guide"
	content: IContentWrapper<TGuideReference>
}
export interface IActionSet{
	subType:"actionset"
	content: IContentWrapper<TActionSet>
}
export interface IActionItem{
	subType:"action"
	content: IContentWrapper<TActionItem>
}
export interface IActionCommand{
	subType:"command"
	content: IContentWrapper<TActionCommand>
}
export interface IGenerator{
	subType:"generator"
	content: IContentWrapper<TGeneratorReference>
}
export interface IListenerCategory{
	subType:"listenerCategory"
	content: IContentWrapper<TListenerCategoryReference>
}

export type TFilterContent = IContentWrapper<TCategoryReference> | IContentWrapper<TBaseProperty> | IContentWrapper<TCustomDescriptorReference> | IContentWrapper<THistoryReference> | IContentWrapper<TSnapshotReference> | IContentWrapper<TLayerReference> | IContentWrapper<TPathReference> | IContentWrapper<TChannelReference> | IContentWrapper<TDocumentReference> | IContentWrapper<TGuideReference> | IContentWrapper<TActionSet> | IContentWrapper<TActionItem> | IContentWrapper<TActionCommand> | IContentWrapper<TGeneratorReference>;

export type TAllReferenceSubtypes = ICategory|IProperty | ICustomDescriptor | IHistory | ISnapshot | ILayer | IPath | IChannel | IDocument | IGuide | IActionSet | IActionItem | IActionCommand|IGenerator|IListenerCategory

/////

export interface ISettings {
	fontSize: TFontSizeSettings
	makeRawDataEasyToInspect: boolean
	selectReferenceBeforeGet: boolean
	autoUpdateInspector: boolean
	groupDescriptors: "none" | "strict"
	searchTerm: string | null
	listenerFilterType: TFilterEvents
	listenerExclude: string[]
	listenerInclude: string[]
	lastHistoryID: number
	autoUpdateListener: boolean
	lastSelectedItem: string | null
	dontShowMarketplaceInfo: boolean
	activeDescriptors: string[]
	properties: IPropertySettings[]
	maximumItems: number
	leftColumnWidthPx: number
	initialDescriptorSettings: IDescriptorSettings
	neverRecordActionNames: string[]
	
	singleQuotes: boolean
	indent: "tab" | "space1" | "space2" | "space3" | "space4" | "space5" | "space6" | "space7" | "space8"
	
	hide_isCommand: boolean
	hideDontRecord: boolean
	hideForceNotify: boolean
}

export interface IDescriptorSettings {
	supportRawDataType: "mixed" | boolean
	dialogOptions: "mixed" | TDialogOptions | null
	modalBehavior: "mixed" | TModalBehavior | null
	synchronousExecution: "mixed" | boolean | null
}

export interface IPropertySettings {
	type: TPropertyClass
	list: IPropertyItem[]
}

export interface IPropertyItem {
	title: string
	stringID: string
	type: TPropertyType
}

export interface IAMCoverter{
	isPresetFileInstalled: boolean
	snippet:string
}

export interface IInspector{
	activeTab: TActiveInspectorTab
	dom: IDOM
	content: IContent
	difference: IDifference
	code: ICode
	info: IReference
}

export interface ICode{
	viewType: "generated"|"options"
}

export interface IDOM{
	treePath: string[]
	autoExpandLevels:number
	expandedTree:TPath[]
}

export interface IContent{
	viewType: TGenericViewType
	treePath: string[]
	autoExpandLevels:number
	expandedTree:TPath[]
}

export interface IDifference{
	viewType: TGenericViewType
	treePath: string[]
	autoExpandLevels:number
	expandedTree:TPath[]
}

export interface IReference {
	showOptionalDocumentReference: boolean
}

export interface IDescriptor{
	id: string
	selected: boolean
	crc:number
	startTime: number
	endTime: number
	pinned: boolean
	locked: boolean
	renameMode:boolean
	title:string
	/** filter settings */
	originalReference: ITargetReference
	/** used for AM */
	calculatedReference: ITargetReferenceAM|Descriptor
	/** content */
	originalData: Descriptor[] | Descriptor
	descriptorSettings: IDescriptorSettings
	groupCount?:number
}

export interface IGetNameOutput{
	typeRef: string
	typeTitle: string
	value: string|null
}