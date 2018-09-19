
import { CreateAccount } from 'routes/CreateAccount'
import { CreatePost } from 'routes/CreatePost'
import { EditPost } from 'routes/EditPost'
import { Home, HomeAppBar } from 'routes/Home'
import { Landing } from 'routes/Landing'
import { Login } from 'routes/Login'

interface RouteDefinition {
  path: string
  component: React.ComponentType
  appBar?: React.ComponentType
  key?: string
  exact?: boolean
  authenticated?: 'show' | 'hide' | undefined
  padding?: boolean // default = true
}

function verifyHack<T extends { [key: string]: RouteDefinition }> (obj: T): T {
  return obj
}

export const routes = verifyHack({
  home: {
    path: '/',
    component: Home,
    appBar: HomeAppBar,
    exact: true,
    padding: false,
    authenticated: 'hide',
  },
  landing: {
    path: '/',
    component: Landing,
    appBar: HomeAppBar,
    exact: true,
    authenticated: 'show',
  },
  login: {
    path: '/login',
    component: Login,
    exact: true,
    authenticated: 'hide',
  },
  createAccount: {
    path: '/createAccount',
    component: CreateAccount,
    exact: true,
  },
  createPost: {
    path: '/createPost',
    component: CreatePost,
    exact: true,
    authenticated: 'show',
  },
  editPost: {
    path: '/editPost/:postId',
    component: EditPost,
    exact: true,
    authenticated: 'show',
    pathFor: (postId: string) => `/editPost/${postId}`,
  },
})

export const routeArray = Object.keys(routes)
  .filter(key => routes[key])
  .map(key => {
    const route = routes[key] as RouteDefinition
    return {
      ...route,
      key,
    }
  })
