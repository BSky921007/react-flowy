// declare var activeCard: string;

export type Position = {
    x: number,
    y: number
}

export type CardData = {
    id: number,
    name: string, 
    lefticon: string, 
    desc: string, 
    desc1: string, 
    desc2: string, 
    desc3: string, 
    desc4: string,
    position: Position, 
    parentId: number,
    children: number[], 
    childrenCnt: number,
    isOpenProps: Boolean
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
    desc: string
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
    onSave: Function
}

export type CanvasProps = {
    isOpenProp: Boolean, 
    onPropsView: Function, 
    data: CardData[]
}
