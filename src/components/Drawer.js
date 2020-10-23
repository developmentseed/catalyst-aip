import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Header from './Header'
import LayerControl from './LayerControl'
import theme from '../config/theme'

const Container = styled.section`
  width: ${theme.space[6]}px;
  height: 100%;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.24);
  z-index: 1;
  overflow-y: scroll;
`

export default function Drawer({ country, cc, layerVisibility, toggleLayer }) {
  return (
    <Container>
      <Header country={country} cc={cc} />
      <LayerControl
        toggleLayer={toggleLayer}
        layerVisibility={layerVisibility}
      />
    </Container>
  )
}

Drawer.propTypes = {
  country: PropTypes.string.isRequired,
  cc: PropTypes.string.isRequired,
  layerVisibility: PropTypes.object,
  toggleLayer: PropTypes.func.isRequired,
}