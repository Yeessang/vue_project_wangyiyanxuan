import config from './config'

import {CategoryAxios} from './axios'

import http from '../../util/http'

export default http(CategoryAxios,config.api)