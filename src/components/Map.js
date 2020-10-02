import React, { useLayoutEffect, useState } from 'react'
import mapbox from 'mapbox-gl'
import styled from 'styled-components'

const MapContainer = styled.div`
  height: 100%;
`

export default function Map() {
  const ref = React.createRef()
  const [map, setMap] = useState(null)

  useLayoutEffect(() => {
    const m = new mapbox.Map({
      container: ref.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 7,
      center: [37.85335, 0.44014],
    })

    setMap(m)

    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [])

  return <MapContainer id='map' ref={ref} />
}