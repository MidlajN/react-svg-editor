import './App.css'
import Navbar from './Navbar'
import Sidebar, { SidebarItem } from './Sidebar'
import { RotateCwSquare, RotateCcwSquare, FlipHorizontal2, FlipVertical2 } from 'lucide-react'
import SvgContainer from './SvgContainer'

function App() {
  return (
    <>
      <div className='h-screen overflow-hidden'>
        <Navbar />
        
        <div className="flex h-[91%]">
          <Sidebar>
            {/* <SidebarItem icon={<MousePointerClick size={28} strokeWidth={2.5} />} text={'Pointer'} /> */}
            <SidebarItem icon={<RotateCwSquare size={28} strokeWidth={2.5} />} text={'Rotate CW'} type='rotateCW' />
            <SidebarItem icon={<RotateCcwSquare size={28} strokeWidth={2.5} />} text={'Rotate CCW'} type='rotateCCW' />
            <SidebarItem icon={<FlipHorizontal2 size={28} strokeWidth={2.5} />} text={'Flip Horizontally'} type='flipH' />
            <SidebarItem icon={<FlipVertical2 size={28} strokeWidth={2.5} />} text={'Flip Vertically'} type='flipV' />
            {/* <SidebarItem icon={<Move3D size={28} strokeWidth={2.5} />} text={'Translate'} /> */}
          </Sidebar>
          <SvgContainer />
        </div>
      </div>
    </>
  )
}

export default App
