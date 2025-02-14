import CTA from '@/components/custom/utils/CTA'
import Logo from '@/components/custom/utils/Logo'
import ModeToogle from '@/components/custom/utils/ModeToogle'
import React from 'react'

const Navbar: React.FC = () => {
  return (
    <nav className='sticky top-0 left-0 z-50 shadow-sm shadow-foreground/10 py-0 bg-background'>
      <div className='container flex items-center justify-between'>
        <Logo />

        <div className='flex items-center gap-4 ' >
          <CTA url='/new-projet' />
          <ModeToogle />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
