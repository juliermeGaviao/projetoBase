import { Entity } from "../interfaces/entity.interface"
import { Sector } from "./sector"

export class Product implements Entity {
  id: number
  setor: Sector
  nome: string
}