import { BREWERY_TYPES } from '../moks/moks'
import axios from 'axios'

const URL = 'https://api.openbrewerydb.org/v1/breweries'

function buildBreweryUrl(type: string = BREWERY_TYPES[0].typeName, page: number = 1, pageSize: number = 5 ) {
  return `${URL}?by_type=${type}&page=${page}&per_page=${pageSize}`
}

export default function getBreweriesByTypeAndPage( value?: {
  type?: string,
  page?: number,
  per_page?: number
} = {}) {
  const address = buildBreweryUrl(value.type, value.page, value.per_page)

  return axios.get(address)
}
