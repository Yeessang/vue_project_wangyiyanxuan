import config from './config'

import {homeAxios} from './axios'

import http from '../../util/http'

export default http(homeAxios,config.api)