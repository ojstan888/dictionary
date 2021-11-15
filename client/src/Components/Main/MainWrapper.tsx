import React from 'react'
import Header from 'app/Components/Header/Header'
import { Footer } from 'app/Components/Footer/Footer'

export const MainWrapper: React.FC<{ isLogged?: boolean }> = ({
  isLogged,
  children,
}) => {
  return (
    <>
      <Header isLogged={isLogged} />
      <main className="main">
        <div className="global-container">{children}</div>
      </main>
      <Footer />
    </>
  )
}
