import Dep from './dep'

export default class observer​​ {
  constructor(mueData: any, key: string) {
    const dep: any = new Dep()
    const property: any = Object.getOwnPropertyDescriptor(mueData, key)

    // 判断当前属性是否已经被劫持
    const getter = property && property.get

    // 被劫持使用 get 否者使用 vlaue 获取属性
    let value = getter ? getter() : property.value

    Object.defineProperty(mueData, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 如果存在订阅者，添加进 dep 里
        if (Dep.target) {
          dep.addSub(Dep.target)
        }
        return value
      },
      set(newVal) {
        // 没做修改则不进行处理
        if (value === newVal) return

        // 修改保存的 default value
        value = newVal
        dep.notify()
      }
    })
  }
}

