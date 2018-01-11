import Watcher from './watcher'

export default class Parser {
  mue: any =  null
  reg: RegExp = /\{\{(.*)\}\}/
  parseFragment: DocumentFragment = document.createDocumentFragment()
  constructor(mue: any, domNode: Node) {
    // 获取 mue 对象
    this.mue = mue

    // 创建一个 document fragment，把 dom 放入 fragment 中进行操作，避免多次 dom 插入操作
    const fragment: DocumentFragment = document.createDocumentFragment()
    Array.apply(null, domNode.childNodes).map((childNode: Node) => fragment.appendChild(childNode))

    // 获取解析过指令("{{}}") 的 fragment
    this.parseFragment = this.parse(fragment)
  }

  setText(node: DocumentFragment, nodeValue: string, key: string) {
    new Watcher(node, this.mue, key, node.nodeValue || '')
  }

  setArrt(node: DocumentFragment, attributeValue: string, key: string, attribute: Attr) {
    new Watcher(node, this.mue, key, attributeValue, attribute)
  }

  parse(fragmentNode: DocumentFragment): DocumentFragment {
    // 匹配 "{{}}" 指令
    const reg: RegExp = this.reg
    const mue: any = this.mue

    Array.apply(null, fragmentNode.childNodes).map((childNode: DocumentFragment) => {
      // 解析内容是文本节点
      const nodeValue: string = childNode.nodeValue || ''

      // 如果匹配到花括号
      if (childNode.nodeType == 3 && reg.test(nodeValue)) {
        const key: string = RegExp.$1 || ''

        // 替换花括号
        if (mue[key]) {
          this.setText(childNode, nodeValue, key)
        }
        return
      }

      // 如果是普通节点，还需要解析节点 attributes 信息
      if (childNode.nodeType === 1 && childNode.attributes.length) {
        Array.apply(null, childNode.attributes).map((attribute: Attr) => {
          console.log(attribute.value)
          const attributeValue: string = attribute.value || ''
          // 如果匹配到花括号
          if (reg.test(attributeValue)) {
            const key: string = RegExp.$1

            // 替换花括号
            if (mue[key]) {
              this.setArrt(childNode, attributeValue, key, attribute)
            }
          }
        })
      }

      // 如果有子节点,再把子节点遍历处理
      if (childNode.childNodes.length) {
        const childFragment: DocumentFragment = this.parse(childNode)
      }
    })

    return fragmentNode
  }
}
