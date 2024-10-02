import React from 'react'
import { Oval } from 'react-loader-spinner'

const AppLoader = () => {
  return (
    <Oval
        height={100}
        width={100}
        color='#00BFFF'
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor='#00BFFF'
        strokeWidth={2}
        strokeWidthSecondary={2} 
    />
  )
}

export default AppLoader
