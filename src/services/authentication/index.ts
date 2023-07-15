import api from '@/services/api'
import Http from '@/services/http'

const authenticationService = {
  login: (data: API.LoginReq) => Http.post<API.LoginRes>(api.authentication.login, data)
}

export default authenticationService
