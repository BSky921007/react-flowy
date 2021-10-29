// declare var activeCard: string;

export type Position = {
    x: number,
    y: number
}

export type CardData = {
    id: number,
    lefticon: string, 
    righticon: string, 
    name: string, 
    desc1: string, 
    desc2: string, 
    desc3: string, 
    desc4: string,
    position: Position, 
    parentId: number,
    children: number[], 
    childrenCnt: number
    leftWidth: number, 
    rightWidth: number, 
    childWidth: number, 
}

export type CardProps = {
    data: CardData
}

export type RightCardProps = {
    data: CardData,
    isMoving: Boolean,
    isSelected: Boolean, 
    updatedId: number, 
    onOver: Function, 
    onLeave: Function, 
    onMouseDown: Function, 
    onMouseMove: Function, 
    onMouseUp: Function
}

export type LeftCardProps = {
    id: string, 
    lefticon1: string, 
    lefticon2: string, 
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
