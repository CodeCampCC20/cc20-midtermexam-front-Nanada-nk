
import { Outlet } from 'react-router'
import NavBar from '../components/NavBar'

function MainLayout() {
  return (
    <div>
      {/* <NavBar /> */}

      <div className='p-8'>
      <Outlet />
      </div>
    </div>
  )
}

export default MainLayout