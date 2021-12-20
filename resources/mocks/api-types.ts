export interface User { id: number, name: string }

export interface PropertyType { id: number, name: string }

export interface Property {
    id: number,
    userId: number,
    typeId: number,
    name: string,
    rentedFrom: Date | null,
    rentedTo: Date | null
}