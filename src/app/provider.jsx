'use client'
const { NextUIProvider } = require("@nextui-org/react")

const Provider = ({children}) => {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}

export default Provider