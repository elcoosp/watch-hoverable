import React from 'react'

import { render } from 'react-dom'
import WatchHoverable from './index'

render(
  <WatchHoverable
    schedule={[[1000, console.log], [2000, console.log]]}
    component={props => <button {...props}>My button</button>}
  />,
  document.querySelector('#root')
)
