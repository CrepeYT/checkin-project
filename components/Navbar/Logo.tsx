import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <div>
      <Image src='/assets/images/apps.png' alt={'LOGO'} width={40}
        height={40} ></Image>
    </div>
  )
}

export default Logo