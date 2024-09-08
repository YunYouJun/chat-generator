import { DATASETS } from '~~/packages/datasets'

export function getDataSetById(id: string) {
  return DATASETS.find(dataset => dataset.id === id)
}
