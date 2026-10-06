import { createBrowserRouter, RouterProvider } from 'react-router'
import { GuardRuta } from '../auth/GuardRuta.tsx'
import { AvisosPage } from '../pages/AvisosPage.tsx'
import { NoEncontrada } from '../pages/errors/NoEncontrada.tsx'
import { Marco } from '../pages/Marco.tsx'

const router = createBrowserRouter([
  {
    element: <Marco />,
    children: [
      {
        path: '/',
        element: (
          <GuardRuta>
            <AvisosPage />
          </GuardRuta>
        ),
      },
      { path: '*', element: <NoEncontrada /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
