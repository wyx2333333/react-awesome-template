declare namespace API {
  type LoginReq = {
    name: string
    pwd: string
  }
  type LoginRes = {
    token: string
  }
}
