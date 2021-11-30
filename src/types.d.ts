// declare var activeCard: string;

export type Position = {
    x: number,
    y: number
}

export type SelectTypes = {
    name: string, 
    id: string
}

export type BranchTypes = {
    id: string, 
    name: string, 
    type: string, 
}

export type BranchData = {
    filter: SelectTypes[], 
    value: string, 
}

export type BranchProps = {
    id: number, 
    data: BranchData
}

export type FilterData = {
    condition: SelectTypes[], 
    name: SelectTypes[], 
    filter: SelectTypes[], 
    value: string, 
}

export type FilterProps = {
    id: number, 
    data: FilterData
}

export type CardData = {
    id: number, 
    savedId: string, 
    name: string, 
    lefticon: string, 
    desc: string, // description of left card
    templateTitle: string, // which variable is related with the card and it is multi or single selection
    template: string, // description of right card
    begin: string, // begin words of action cards
    hasSelectInput: boolean,  // enable or selecting
    isMulti: boolean, // toggle single or multi selecting
    hasTextInput: boolean, // enable or unable text inputs
    selectedOptions: SelectTypes[], // selected options for action cards
    selectedBranchPoint: BranchTypes[], // selected branch point for the branch cards
    selectedBranches: BranchProps[], // added branches for the branch cards
    selectedFilters: FilterProps[], // added filters for the filter cards
    position: Position, // position of the right cards
    parentId: number, // parent's id
    parentSavedId: string, // parent's savedId
    childrenIds: number[], // contains children's id
    childrenSavedIds: string[], // contains children's savedId
    childrenCnt: number, // children's cnt
    isOpenProps: Boolean, // the propwrap window is opened or closed
    isBranch: boolean, // parent card is branch or not
    addedBranch: string, // displayed on the branch's left-top data, e.g, =18, contains male, ...
}

export type BlockData = {
    id: string, // added Block id
    fields: {
        // bundle_name: string, 
        block_type: string[], 
        // diseases: string[], // Action-Record
        // appointments: string[], 
        // finds: string[], // Action-Elicit
        // dosages: string[], // Action-Prescribe
        // tests: string[], //Action-Order
        // _text_template: string, 
        // output_value: string, 
        // criteria: string, 
        // calculator: string, // Action-Use
        // keypoint: string, //Action-Apply
        // pathway: string, // Action-Link
        // recommendation_match: string, 
        // output_name: string, 
        // condition: string, // Structure-Include
        // references: string[],  //Action-Custom
        edges: string[], 
        // protocol: string[]
    }, 
    createdTime: string
}

export type CardProps = {
    data: CardData
}

export type RightCardProps = {
    data: CardData,
    isMoving: Boolean,
    isSelected: Boolean, 
    updatedId: number, 
    onProp: Function, 
    onDeleteCard: Function, 
    onOver: Function, 
    onLeave: Function, 
    onMouseDown: Function, 
    onMouseMove: Function, 
    onMouseUp: Function
}

export type LeftCardProps = {
    id: number, 
    lefticon: string, 
    name: string, 
    desc: string, 
    selectType: string, 
    targetResource?: string
}

export type ArrowData = {
    id: number, 
    parentId: number, 
    selfId: number, 
    line: string, 
    triangle: string
}

export type ArrowProps = {
    data: ArrowData, 
    isSelected: Boolean
}

export type PropWrapProps = {
    data: boolean, 
    isGlobal: boolean, 
    isHeader: boolean, 
    bundles: BundleType[], 
    protocols: ProtocolType[], 
    selBundle: BundleType|undefined, 
    selProtocol: ProtocolType|undefined, 
    selableProtocols: ProtocolType[], 
    propData: CardData, 
    onDelete: Function, 
    onSave: Function, 
    onSaveBranch: Function, 
    onSaveFilter: Function, 
    onSaveFilterName: Function, 
    onSaveBranchPoint: Function, 
    onGlobalSave: Function, 
    onHeaderOpen: Function, 
    onCloseProperties: Function
}

export type GlobalWrapProps = {
    data: boolean, 
    title: string, 
    subTitle: string
}

export type CanvasProps = {
    isOpenProp: Boolean, 
    cardsData: CardData[], 
    blocksData: BlockData[], 
    selBundle: BundleType|undefined, 
    selProtocol: ProtocolType|undefined, 
    onPropsView: Function, 
    onSaveCards: Function, 
    onSaveBlocks: Function, 
    onDeleteCard: Function
}

export type GlobalData = {
    properties: {
        bundle: BundleType, 
        protocol: ProtocolType
    }, 
    blocks: CardData[]
}

export type BundleType = {
    createdTime: string, 
    fields: {
        name: string, 
        protocols: string[]
    }, 
    id: string
}

export type ProtocolType = {
    createdTime: string, 
    fields: {
        name: string, 
        bundles: string[], 
        id: string, 
    }, 
    id: string
}