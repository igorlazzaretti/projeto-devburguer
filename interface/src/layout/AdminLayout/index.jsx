import { Outlet, Navigate } from 'react-router-dom'
import { Container } from './styles.js'
import { SideNavAdmin } from '../../components/index.js'

export function AdminLayout() {
  const {admin: isAdmin} = JSON.parse(
    localStorage.getItem('devburguer:userData')
  )

  return (
    <>
      {isAdmin ? (
        <Container>
          <SideNavAdmin />
          <main>
            <section>
              <Outlet />
            </section>
          </main>
        </Container>
      ) : <Navigate to="/login" />}
    </>
  )
}
