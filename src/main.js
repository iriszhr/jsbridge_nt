import { JsBridge } from "./core/jsBridge"
import nativePath from "./config/nativePath"

console.log('JsBridge', JsBridge, nativePath)
export default new JsBridge()