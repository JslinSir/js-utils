# 一个打印的工具类

# 使用

```js
 import { printHtml } from 'print'
 const printDomRef = document.getElementById('print-dom-id')
 printHtml(printDomRef)

```

# 原理
- 核心： window.print()
- 实现：   
  对传进来的 Node 进行 拷贝  cloneNode
  创建一个容器对打印内容进行包裹 document.createElement('div')  
  设置媒体查询样式，非容器下的节点全部隐藏 @media print  
  打印完在删除样式以及填充的 打印内容




