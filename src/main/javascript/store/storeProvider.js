var global_store = undefined

export default {
  init(store){
    global_store = store
  },
  getStore(){
    return global_store
  }
}
