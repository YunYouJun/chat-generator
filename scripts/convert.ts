import { collectionTOC } from './config'
import { convertCSVToJSONById } from './utils'

export async function convert() {
  for (const collection of collectionTOC) {
    await convertCSVToJSONById(collection.id)
  }
}

convert()
