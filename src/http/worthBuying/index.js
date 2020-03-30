import config from './config'

import {worthBuyingAxios} from './axios'

import http from '../../util/http'

export default http(worthBuyingAxios,config.api)