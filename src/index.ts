import Parser from './parser'
import Observer from './observer'

class Mue {
  $el: Node | null = null

  constructor(args: any) {
    const that: any = this
    Object.keys(args).map((key: string) => {
      that[`${key}`] = args[key]
    })

    // 挂载节点
    this.$el = document.querySelectorAll(args.el)[0]

    if (!this.$el) {
      throw Error('Did not find the element')
    }
    if (this.$el.nodeType !== 1) {
      throw Error('Not a legal element')
    }

    // oberver
    Object.keys(this).map((key) => {
      if (key !== '$el') {
        new Observer(this, key)
      }
    })

    // 准备解析器
    const parser = new Parser(this, this.$el)

    // 获取解析过的文档片段，插入根节点下
    this.$el.appendChild(parser.parseFragment)
  }
}

const text: any = new Mue({
  el: '#app',
  test: 1
})

setTimeout(() => {
  text.test += 1
}, 2000)
