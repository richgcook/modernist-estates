import React from 'react'
import {Heading, Text} from '@sanity/ui'

export const Normal = ({children, ...rest}) => (
	<Text {...rest}>
	  {children}
	</Text>
  )

export const Header1 = ({children, ...rest}) => (
	<Heading as="h1" data-testid="text-style--h1" size={5} {...rest}>
	  {children}
	</Heading>
  )

export const Header2 = props => (
  <h2
    style={{
      margin: '0',
      fontSize: '1.75rem',
      lineHeight: '1.375',
    }}
  >
    {props.children}
  </h2>
)

export const Header3 = props => (
  <h3
    style={{
      margin: '0',
      fontSize: '1.5rem',
      lineHeight: '1.25',
    }}
  >
    {props.children}
  </h3>
)

export const Header4 = props => (
  <h4
    style={{
      margin: '0',
      fontSize: '1.25rem',
      lineHeight: '1.25',
    }}
  >
    {props.children}
  </h4>
)