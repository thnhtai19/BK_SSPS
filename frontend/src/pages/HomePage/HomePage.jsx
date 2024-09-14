import React from 'react'
import SlidebarComponent from '../../components/SlidebarComponent/SlidebarComponent'
import {WrapperContainer} from './style'

const HomePage = () => {
  return (
    <WrapperContainer>
      <SlidebarComponent curentpage={"1"}/>
    </WrapperContainer>
  )
}

export default HomePage