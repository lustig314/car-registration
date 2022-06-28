declare module '*.png'
declare module '*.svg'
declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }

  const classNames: IClassNames
  const content: string
  export = classNames
  export = content
}
