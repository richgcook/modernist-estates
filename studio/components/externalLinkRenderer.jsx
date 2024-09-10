import React from 'react'

const ExternalLinkRenderer = props => (
	<span>
    	{props.renderDefault(props)}
    	<a contentEditable={false} href={props.value.href}>
      		{props.value.symbol && <span style={{display:'inline-flex',marginLeft: '0.5ch'}}>llss</span>}
    	</a>
  	</span>
)

export default ExternalLinkRenderer