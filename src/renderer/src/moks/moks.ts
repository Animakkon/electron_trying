export interface IBreweryType {
  typeName: string;
  description: string;
}

export const BREWERY_TYPES: IBreweryType[] = [
  {
    typeName: 'micro',
    description: 'Most craft breweries. For example, Samual Adams is still considered a micro brewery',
  }, {
    typeName: 'nano',
    description: 'An extremely small brewery which typically only distributes locally'
  }, {
    typeName: 'regional',
    description: 'A regional location of an expanded brewery. Ex. Sierra Nevada’s Asheville, NC location'
  }, {
    typeName: 'brewpub',
    description: 'A beer-focused restaurant or restaurant/bar with a brewery on-premise'
  }, {
    typeName: 'large',
    description: 'A very large brewery. Likely not for visitors. Ex. Miller-Coors. (deprecated)'
  }, {
    typeName: 'planning',
    description: 'A brewery in planning or not yet opened to the public'
  }, {
    typeName: 'bar',
    description: 'A bar. No brewery equipment on premise. (deprecated)'
  }, {
    typeName: 'contract',
    description: 'A brewery that uses another brewery’s equipment'
  }, {
    typeName: 'proprietor',
    description: 'Similar to contract brewing but refers more to a brewery incubator'
  }, {
    typeName: 'closed',
    description: 'A location which has been closed'
  },
]
