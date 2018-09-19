
import * as React from 'react'
import { Route, RouteProps } from 'react-router-dom'

import AuthIcon from '../../components/AuthIcon/AuthIcon'

interface Props<T> {
  path: string
  additionalProps: T
  component: React.ComponentType
  exact?: boolean
  sensitive?: boolean
  strict?: boolean
}

function RouteWith<T, P extends Props<T>> (props: P) {
  const Component = props.component

  const routeProps: RouteProps = {
    ...props as any,
    render: (originalProps) => (
      <Component {...originalProps} {...props.additionalProps}>
        <AuthIcon />
      </Component>
    ),
  }
  delete routeProps.component

  return <Route {...routeProps} />
}

export default RouteWith
