
import * as React from 'react'
import { inject, observer } from 'mobx-react'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Create'
import { pushOrReplace } from 'helpers/navigation'
import { routes } from 'routes'
import { AuthProp } from 'state/authStore'

interface Props extends AuthProp {
  postId: string
  posterId: string
}

@inject('auth')
@observer
class EditPostButton extends React.Component<Props> {
  render () {
    const { postId, posterId, auth } = this.props

    if (!(auth!.user && auth!.user!._id === posterId)) {
      return null
    }

    return (
      <IconButton
        onClick={() => pushOrReplace(routes.editPost.pathFor(postId))}
        color='inherit'
      >
        <EditIcon />
      </IconButton>
    )
  }
}

export default EditPostButton
