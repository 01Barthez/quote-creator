import React from 'react'

const LoaderPage: React.FC = () => {
  return (
    <section className="absolute z-20 top-0 left-0 h-screen w-screen flex items-center justify-center">
      <div className="loader"></div>
    </section>
  )
}

export default LoaderPage
