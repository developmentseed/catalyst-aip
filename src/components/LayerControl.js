import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@reach/accordion'
import '@reach/accordion/styles.css'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import styled from 'styled-components'

import Checkbox from './Checkbox'
import { ChevronDown, ChevronUp, Plus, Minus } from '../icons'
import theme from '../config/theme'
import uicontrols from '../config/uicontrols'

const { space, colors } = theme

export default function LayerControl({ toggleLayer, layerVisibility }) {
  const [indices, setIndices] = useState([0, 1])
  function toggleAccordionItem(toggledIndex) {
    if (indices.includes(toggledIndex)) {
      setIndices(
        indices.filter((currentIndex) => currentIndex !== toggledIndex)
      )
    } else {
      setIndices([...indices, toggledIndex].sort())
    }
  }

  return (
    <Accordion index={indices} onChange={toggleAccordionItem}>
      {uicontrols.map((group, index) => (
        <FirstLevelPanel
          key={group.id}
          label={group.label}
          icon={group.icon}
          description={group.description}
          controls={group.controls}
          indices={indices}
          index={index}
          toggleLayer={toggleLayer}
          layerVisibility={layerVisibility}
        />
      ))}
    </Accordion>
  )
}

LayerControl.propTypes = {
  toggleLayer: PropTypes.func.isRequired,
  layerVisibility: PropTypes.object.isRequired,
}

const ControlItemContainer = styled.label`
  color: ${colors.primary};
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontSizes[2]}pt;
  font-weight: ${theme.fontWeights.body};

  background-color: ${colors.muted};
  border-bottom: 1px solid ${colors.background};

  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${space[3]}px;
  padding: ${space[3]}px;
`

function ControlItem({ id, label, toggleLayer, layerVisibility }) {
  return (
    <ControlItemContainer htmlFor={id}>
      <Checkbox
        id={id}
        onChange={() => toggleLayer(id)}
        checked={layerVisibility[id]}
      />
      {label}
    </ControlItemContainer>
  )
}

ControlItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  toggleLayer: PropTypes.func.isRequired,
  layerVisibility: PropTypes.object.isRequired,
}

const ToggleButton = styled.button`
  appearance: none;
  background: 0;
  border: 0;
  padding: 0 ${space[2]}px;
  flex-grow: 1;
  flex-shrink: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${space[3]}px;
  width: fit-content;
`

const FirstLevelHeader = styled.div`
  align-items: center;
  padding: ${space[3]}px ${space[2]}px;
  display: flex;
  border-left: ${(props) =>
    props.hasSelectedLayers
      ? `5px solid ${colors.highlight}`
      : `5px solid ${colors.background}`};
  border-top: 1px solid ${colors.accent};
  border-bottom: ${(props) =>
    props.isOpen ? 0 : `1px solid ${theme.colors.accent}`};
  margin: -1px 0 0 -1px; // to collapse neighboring borders
`

const FirstLevelHeading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  h2 {
    margin: 0;
    color: ${colors.primary};
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes[3]}pt;
    font-weight: ${theme.fontWeights.heading};
    text-align: start;
  }

  p {
    margin: 0;
    color: ${colors.text};
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes[0]}pt;
    font-weight: ${theme.fontWeights.body};
    text-align: start;
  }
`

const Panel = styled.div`
  &:focus {
    outline: none;
  }
`

const IconContainer = styled.div`
  background-color: ${(props) =>
    props.hasSelectedLayers ? `${colors.offlight}` : `${colors.muted}`};
  border-radius: 4px;
  width: 32px;
  height: 32px;
`

const getHasSelectedLayers = (controls, layerVisibility) => {
  const selectedLayerIds = Object.keys(layerVisibility).filter(
    (key) => layerVisibility[key]
  )

  const hasFirstLevelSelection = (group) =>
    Object.keys(group).some((key) => selectedLayerIds.includes(key))

  const hasSecondLevelSelection = (group) =>
    Object.values(group)
      .filter((control) => !!control.subcontrols)
      .some((control) => hasFirstLevelSelection(control.subcontrols))

  return hasFirstLevelSelection(controls) || hasSecondLevelSelection(controls)
}

function FirstLevelPanel({
  label,
  icon: Icon,
  description,
  controls,
  indices,
  index,
  toggleLayer,
  layerVisibility,
}) {
  const hasSelectedLayers = getHasSelectedLayers(controls, layerVisibility)
  return (
    <AccordionItem>
      <FirstLevelHeader
        isOpen={indices.includes(index)}
        hasSelectedLayers={hasSelectedLayers}
      >
        <ToggleButton as={AccordionButton}>
          <IconContainer hasSelectedLayers={hasSelectedLayers}>
            <Icon
              color={hasSelectedLayers ? colors.highlight : colors.primary}
            />
          </IconContainer>
          <FirstLevelHeading>
            <h2>{label}</h2>
            <p>{description}</p>
          </FirstLevelHeading>

          {indices.includes(index) ? (
            <span role='img' aria-label='chevron up'>
              <ChevronUp color={colors.primary} />
            </span>
          ) : (
            <span role='img' aria-label='chevron down'>
              <ChevronDown color={colors.primary} />
            </span>
          )}
        </ToggleButton>
      </FirstLevelHeader>
      <Panel as={AccordionPanel}>
        {Object.entries(controls).map(([controlId, control]) => {
          if (control.subcontrols) {
            return (
              <SecondLevelPanel
                key={controlId}
                label={control.label}
                controls={control.subcontrols}
                toggleLayer={toggleLayer}
                layerVisibility={layerVisibility}
              />
            )
          }

          return (
            <ControlItem
              key={controlId}
              id={controlId}
              label={control.label}
              toggleLayer={toggleLayer}
              layerVisibility={layerVisibility}
            />
          )
        })}
      </Panel>
    </AccordionItem>
  )
}

FirstLevelPanel.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired, // actually, this is a react component
  description: PropTypes.string.isRequired,
  controls: PropTypes.object.isRequired,
  indices: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  index: PropTypes.number.isRequired,
  toggleLayer: PropTypes.func.isRequired,
  layerVisibility: PropTypes.object.isRequired,
}

const SecondLevelHeader = styled(FirstLevelHeader)`
  border-top: 1px solid ${colors.background};
  border-bottom: ${(props) =>
    props.isOpen ? `1px solid ${colors.background}` : 0};
  background-color: ${colors.muted};
`

const SecondLevelHeading = styled.h3`
  color: ${colors.primary};
  font-family: ${theme.fonts.heading};
  font-size: ${theme.fontSizes[1]}pt;
  font-weight: ${theme.fontWeights.heading};
  text-transform: uppercase;
  margin: 0;
`

function SecondLevelPanel({ label, controls, toggleLayer, layerVisibility }) {
  const [isOpen, setOpen] = useState(false)

  return (
    <Disclosure open={isOpen} onChange={() => setOpen(!isOpen)}>
      <SecondLevelHeader isOpen={isOpen}>
        <ToggleButton as={DisclosureButton}>
          <SecondLevelHeading>{label}</SecondLevelHeading>
          {isOpen ? (
            <span role='img' aria-label='minus'>
              <Minus color={colors.primary} />
            </span>
          ) : (
            <span role='img' aria-label='plus'>
              <Plus color={colors.primary} />
            </span>
          )}
        </ToggleButton>
      </SecondLevelHeader>
      <Panel as={DisclosurePanel}>
        {Object.entries(controls).map(([controlId, control]) => (
          <ControlItem
            key={controlId}
            id={controlId}
            label={control.label}
            toggleLayer={toggleLayer}
            layerVisibility={layerVisibility}
          />
        ))}
      </Panel>
    </Disclosure>
  )
}

SecondLevelPanel.propTypes = {
  label: PropTypes.string.isRequired,
  controls: PropTypes.object.isRequired,
  toggleLayer: PropTypes.func.isRequired,
  layerVisibility: PropTypes.object.isRequired,
}