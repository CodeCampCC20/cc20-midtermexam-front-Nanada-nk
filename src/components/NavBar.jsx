
import { NavLink } from 'react-router'

function NavBar() {

  const menus = [
    {id:1, menu:"Login", path:"/"},
    {id:2, menu:"Home", path:"/todo"},
    {id:3, menu:"Register" ,path:"/register"}
  ]

  return (
    <nav className='h-13 bg-pink-600 text-white flex items-center justify-center gap-6'>
      {menus.map((item)=>(
      <NavLink key={item.id} to={item.path} className={"hover:underline"}>{item.menu}</NavLink>
      ))}
    </nav>
  )
}

export default NavBar