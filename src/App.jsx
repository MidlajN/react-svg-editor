import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Navbar'
import Sidebar, { SidebarItem } from './Sidebar'
import { MousePointerClick,RotateCwSquare, RotateCcwSquare, ScalingIcon, Waypoints, Move3D } from 'lucide-react'
import SvgContainer from './SvgContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='h-screen'>
        <Navbar />
        
        <div className="flex h-[91%]">
          <Sidebar>
            <SidebarItem icon={<MousePointerClick size={28} strokeWidth={2.5} />} text={'Pointer'} />
            <SidebarItem icon={<RotateCwSquare size={28} strokeWidth={2.5} />} text={'Rotate CW'} />
            <SidebarItem icon={<RotateCcwSquare size={28} strokeWidth={2.5} />} text={'Rotate CCW'} />
            <SidebarItem icon={<ScalingIcon size={28} strokeWidth={2.5} />} text={'Scale'} />
            <SidebarItem icon={<Waypoints size={28} strokeWidth={2.5} />} text={'Path'} />
            <SidebarItem icon={<Move3D size={28} strokeWidth={2.5} />} text={'Translate'} />
          </Sidebar>
          <SvgContainer />
        </div>
      </div>
    </>
  )
}

export default App
