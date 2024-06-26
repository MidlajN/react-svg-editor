import { ListX, AlignJustify } from "lucide-react"
import { useContext, createContext, useState } from "react"

const SidebarContext = createContext()

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false)
  
  return (
    <aside className="h-full w-[fit-content] max-[900px]:h-fit max-[900px]:absolute max-[900px]:z-50 top-[50%] max-[900px]:transform max-[900px]:-translate-y-[50%] max-[900px]:left-1 transition-all duration-500"> 
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-end items-center transition-all bg-slate-50 hover:bg-slate-100">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="px-3 py-2 rounded-lg "
          >
            {expanded ? <ListX size={28} strokeWidth={2.5} /> : <AlignJustify size={28} strokeWidth={2.5} /> }
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert, type }) {
  const { expanded } = useContext(SidebarContext)
  const [controls, setControls] = useState({ rotate: 0, flipH: false, flipV: false })
  
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group text-nowrap
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
      `}
      onClick={() => {
        const canvas  = window.canvas;

        if (canvas) {
          const selection = canvas.getActiveObject();
          if (selection) {

            const top = selection.originX !== 'center' ? selection.top + selection.height / 2 : selection.top;
            const left = selection.originY !== 'center' ? selection.left + selection.width / 2 : selection.left;

            if (type === 'rotateCW') {
              const angle = controls.rotate == 360 ? 90 : controls.rotate + 90;
              setControls({ ...controls, rotate: angle })
              selection.set({
                angle: controls.rotate,
                originX: 'center',
                originY: 'center',
                left: left,
                top: top
              })

            } else if (type === 'rotateCCW') {
              const angle = controls.rotate == 0 ? 270 : controls.rotate - 90
              setControls({ ...controls, rotate: angle })
              selection.set({
                angle: controls.rotate,
                originX: 'center',
                originY: 'center',
                left: left,
                top: top
              })
              
            } else if (type === 'flipH') {
              setControls({ ...controls, flipH: !controls.flipH })
              selection.set({
                flipX: controls.flipH,
                originX: 'center',
                originY: 'center',
                left: left,
                top: top
              })

            } else if (type === 'flipV') {
              setControls({ ...controls, flipV: !controls.flipV })
              selection.set({
                flipY: controls.flipV,
                originX: 'center',
                originY: 'center',
                left: left,
                top: top
              })
            }
          }

          canvas.renderAll();
        }
      }}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

        {!expanded && (
            <div
                className={`
                    absolute z-10 left-full rounded-md px-2 py-1 ml-6
                    bg-indigo-100 text-indigo-800 text-sm
                    invisible opacity-20 -translate-x-3 transition-all
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                `}
            >
                {text}
            </div>
        )}
    </li>
  )
}