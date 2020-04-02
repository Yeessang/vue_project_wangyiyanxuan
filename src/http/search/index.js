import config from './config'

import {searchAxios} from './axios'

import http from '../../util/http'

export default http(searchAxios,config.api)