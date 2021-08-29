import {AppRegistry} from 'react-native'
import * as appConfig from './app.json'
import App from './src/App'

AppRegistry.registerComponent(appConfig.name, () => App)

AppRegistry.runApplication(appConfig.name, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
})