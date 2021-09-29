import devConfig from './dev'
import prodConfig from './production'

let config = {
    ...(process.env.NODE_ENV === 'production' ? prodConfig : devConfig)
   
}
export default config