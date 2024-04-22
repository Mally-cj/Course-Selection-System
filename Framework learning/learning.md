# 前端

## React

react [官方中文文档](https://zh-hans.react.dev/learn)

React 是一个用于构建用户界面的 JavaScript 库，特别适用于构建大型、数据密集且交互性强的网页应用。在 React 的学习页面上，你可以找到关于如何使用 React 的基础知识，包括组件创建、使用 JSX 书写标签、状态管理、以及响应事件等多种主题。页面提供了从基础到高级的内容，帮助开发者通过实例学习如何构建和管理 React 应用的各个方面。
其内容包括：

* 如何创建和嵌套组件
* 如何添加标签和样式
* 如何显示数据
* 如何渲染条件和列表
* 如何对事件做出响应并更新界面
* 如何在组件间共享数据

![官网实例](./截屏2024-04-19%2019.07.42.png )

## vite

Vite 是一个现代化的前端构建工具，它利用浏览器原生的 ES 模块支持来提高开发效率。与传统的打包工具相比，Vite 在开发模式下无需打包，可以直接按需加载模块，极大地提高了开发服务器的启动速度和模块热更新（HMR）的效率。Vite 也通过使用高效的构建工具如 esbuild 预构建依赖，进一步优化了这一过程。在生产环境中，Vite 提供了高效的构建命令和优化策略，确保应用的高性能和最优加载体验。

Vite[官方中文文档](https://vitejs.cn/vite3-cn/guide/)
vite[在线使用链接](https://stackblitz.com/edit/vitejs-vite-fuetff?file=index.html&terminal=dev)

index.html 代码示例

``` html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/main.js"></script>
  </body>
</html>
```

main.js代码示例

``` js
import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))
```


![效果展示](./截屏2024-04-19%2019.16.13.png)

## React 和Vite组件区别

- **React**:
  - 主要用于构建用户界面的 JavaScript 库。
  - 专注于组件化开发，使得大型应用的开发更为模块化和可维护。

- **Vite**:
  - 是一个现代前端开发工具，旨在提供快速的开发启动和构建时间。
  - 主要作为构建工具，使用 Rollup 和 esbuild 进行高效的模块打包和优化。

React 更多关注于如何在浏览器中以组件的方式构建和管理用户界面，而 Vite 则提供了一个高效的开发和构建流程，使得开发者可以更快地开始和构建他们的应用。Vite 可以与 React 结合使用，为 React 应用提供高效的开发环境和优化的生产构建。

## Typescript

TypeScript 是一个基于 JavaScript 的强类型编程语言，它扩展了 JavaScript 通过添加静态类型定义。这使得在编码过程中能够在编辑器内即时发现错误，支持更大规模的项目和更复杂的开发环境。TypeScript 的代码最终会被编译成普通的 JavaScript，因此它可以在任何支持 JavaScript 的平台上运行。它特别适用于开发大型应用，允许开发者逐步添加类型信息以改善现有代码的质量和可维护性。

Typescript  [官方中文文档](https://ts.nodejs.cn/)
Typescript在线编译器 [编译器在线网址]()

``` typescript
interface Book {
  title: string;
  author: string;
  publishedDate: Date;
}

class Library {
  private books: Book[] = [];

  addBook(book: Book): void {
    this.books.push(book);
  }

  displayBooks(): void {
    this.books.forEach(book => {
      console.log(`${book.title} by ${book.author}, published on ${book.publishedDate.toDateString()}`);
    });
  }
}

// Example of using the Library class
const myLibrary = new Library();
myLibrary.addBook({ title: "The Great Gatsby", author: "F. Scott Fitzgerald", publishedDate: new Date("1925-04-10") });
myLibrary.addBook({ title: "1984", author: "George Orwell", publishedDate: new Date("1949-06-08") });

myLibrary.displayBooks();
```

![效果展示](./截屏2024-04-19%2019.30.55.png)

## TanStack_Query

TanStack Query 是一个专为 React 应用设计的数据获取库，主要用于管理服务器状态，如数据抓取、缓存、同步和更新。以下是一个示例，展示了如何使用 React Query 从 GitHub 获取仓库数据：

```javascript
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios
        .get('https://api.github.com/repos/tannerlinsley/react-query')
        .then((res) => res.data),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? 'Updating...' : ''}</div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(<App />)


```

![效果展示](./截屏2024-04-19%2019.43.16.png)


TanStack_Query[官方中文文档](https://cangsdarm.github.io/react-query-web-i18n/react/)

## TanStack Router

## Chakra Ul

Chakra Ul[官方英语文档](https://v1.chakra-ui.com/)

# 后端

## poetry

python包管理[文档推荐](https://zhuanlan.zhihu.com/p/110721747)

## nginx

nginx官方文档[官方链接](https://docshome.gitbook.io/nginx-docs/readme/an-zhuang-nginx)

什么是nginx介绍[知乎推荐](https://zhuanlan.zhihu.com/p/34943332)


# git



# 软件

## vscode

## navicat