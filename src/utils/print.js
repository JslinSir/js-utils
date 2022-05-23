
const CONTAINER_ID = '_print_container_id_print_root_'


export const printHtml = async (html) => {
    const style = getStyle()
    const container = getContainer(html)
    document.body.appendChild(style)
    document.body.appendChild(container)
    await getLoadPromise(container)
    window.print()
    document.body.removeChild(style)
    document.body.removeChild(container)
  }
  
  // 设置打印样式
  const getStyle = () => {
    const styleContent = `
    #${CONTAINER_ID} {
        display: none;
    }
    @media print {
        body > :not(.${CONTAINER_ID}) {
            display: none;
        }
        html,
        body {
            display: block !important;
        }
        #${CONTAINER_ID} {
            display: flex;
            justify-content: center;
            width: 100%;
            height: 100%;
        }
    }`
    const style = document.createElement('style')
    style.innerHTML = styleContent
    return style
  }
  
  // 清空打印内容
  const cleanPrint = () => {
    const div = document.getElementById(CONTAINER_ID)
    if (div) {
      document.querySelector('body').removeChild(div)
    }
  }
  
  // 新建DOM，将需要打印的内容填充到DOM
  const getContainer = (html) => {
    html = html.cloneNode(true)
    cleanPrint()
    const container = document.createElement('div')
    container.setAttribute('id', CONTAINER_ID)
    container.setAttribute('class', CONTAINER_ID)
    container.appendChild(html)
    return container
  }
  
  // 图片完全加载后再调用打印方法
  const getLoadPromise = (dom) => {
    let imgs = dom.querySelectorAll('img')
    imgs = [].slice.call(imgs)
  
    if (imgs.length === 0) {
      return Promise.resolve()
    }
  
    let finishedCount = 0
    return new Promise((resolve) => {
      function check() {
        // eslint-disable-next-line
        finishedCount++
        if (finishedCount === imgs.length) {
          resolve()
        }
      }
      imgs.forEach((img) => {
        img.addEventListener('load', check)
        img.addEventListener('error', check)
      })
    })
  }
  