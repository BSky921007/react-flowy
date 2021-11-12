// declare var activeCard: string;

export type Position = {
    x: number,
    y: number
}

export type SelectTypes = {
    name: string, 
    id: string
}

export type BranchData = {
    name: string, 
    criteria_id: string, 
    source: string, 
    mapper: string, 
    field: string, 
    operator: string, 
    target: string, 
    units: string, 
    care_bundles: string
}

export type BranchProps = {
    id: number, 
    data: BranchData
}

export type FilterData = {
    condition: SelectTypes[], 
    name: SelectTypes[], 
    filter: SelectTypes[], 
    value: string | undefined, 
}

export type FilterProps = {
    id: number, 
    data: FilterData
}

export type PreviewModalData = {
    pathway_id: string, 
}

export type PreviewModalProps = {
    data: RenderedPathwayData,
    onClose: () => void
}

export type CardData = {
    id: number,
    name: string, 
    lefticon: string, 
    desc: string, 
    template: string, 
    begin: string, 
    selectedOptions: SelectTypes[], 
    selectedBranches: BranchProps[], 
    selectedFilters: FilterProps[], 
    position: Position, 
    parentId: number,
    children: number[], 
    childrenCnt: number,
    isOpenProps: Boolean,
    isBranch: boolean, 
    addedBranch: string, 
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
    targetResource: string
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
    data: Boolean, 
    propData: CardData, 
    onDelete: Function, 
    onSave: Function, 
    onSaveBranch: Function, 
    onSaveFilter: Function, 
}

export type CanvasProps = {
    isOpenProp: Boolean, 
    onPropsView: Function, 
    data: CardData[]
}

