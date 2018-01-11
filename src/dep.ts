export default class Dep {
  static target: any = null
  subs: any[] = [] //sub 为 watch 对象，以后再定义类型

  addSub(sub: any) {
    this.subs.push(sub)
  }

  notify() {
    this.subs.map((sub) => {
      sub.update()
    })
  }
}
