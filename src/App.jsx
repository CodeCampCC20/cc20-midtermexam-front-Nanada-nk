
import { ToastContainer } from 'react-toastify'
import AppRouter from './router/AppRouter'
import { Slide } from 'react-toastify'


function App() {
  return (
    <>
    <ToastContainer
    autoClose={1500}
    transition={Slide}
    position='bottom-right'
    />
    <AppRouter/>
    </>
  )
}

export default App