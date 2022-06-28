import { injectStores } from '@mobx-devtools/tools'

import { RequestsStore } from './RequestsStore'

const requestsStore = new RequestsStore()
injectStores({
  requestsStore,
})

export { requestsStore }
