import * as Analytics from 'firebase/analytics'
import {getAnalytics} from 'firebase/analytics'
import app from './'

const analytics = getAnalytics(app)

export const logEvent = (eventName: string, eventParams?: {[key: string]: any}) => {
  if (process.env.NODE_ENV === 'dev') {
    console.log(`logEvent: ${eventName}`)
  }
  Analytics.logEvent(analytics, eventName, eventParams)
}

