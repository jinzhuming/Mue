import Dep from './dep'

export default class Watcher {
  reg: RegExp = /\{\{(.*)\}\}/
  node: DocumentFragment | null = null
  sourceValue: string = ''
  key: string = ''
  mue: any = {}
  attribute: Attr | null = null

  constructor(node: DocumentFragment, mue: any, key: string, sourceValue: string, attribute?: Attr) {
    Dep.target = this
    this.node = node
    this.sourceValue = sourceValue
    this.key = key
    this.mue = mue
    this.attribute = attribute || null
    this.update()
    Dep.target = null
  }

  update() {
    if (this.node) {
      this.node.nodeValue = this.sourceValue.replace(this.reg, this.mue[this.key])
    }
    if (this.attribute) {
      this.attribute.value = this.sourceValue.replace(this.reg, this.mue[this.key])
    }
    // if (typeof this.sourceValue === 'string') {
    // }
  }
}
