import { Ability } from "./ability";
import { Type } from "./type";
import { Weakness } from "./weakness";

export interface Pokemon {
    id: number,
    name: string,
    category: string,
    height: any,
    weight: any,
    description: string,
    image: string,
    type: Array<Type>,
    abilities: Array<Ability>,
    weaknesses: Array<Weakness>
}
