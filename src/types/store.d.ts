declare namespace STORE {
  type CommonState = {
    token: string
  }
  type CommonAction = {
    setToken: (token: CommonState['token']) => void
  }
  type CommonStore = CommonState & CommonAction
}
