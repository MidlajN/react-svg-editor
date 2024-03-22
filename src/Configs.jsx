import { Grip } from 'lucide-react';
import './Configs.css'
import Draggable from 'react-draggable';


export default function ObjectConfigs(props) {
    const canvas = window.canvas;
    if (canvas) {
        canvas.on('mouse:down', (option) => {
            console.log('option', option)
        })
    }
    return (
        <>
            <Draggable bounds="parent">
            <div className="configs w-[12rem]">
                <div className="toggleButton">
                    <button>
                        <Grip />
                    </button>
                </div>
                <div className="config  mt-6">
                    <div>
                        <span>Scale X :</span>
                    </div>
                    <input className='scale' type="text " placeholder='0.00' value={props.scaleX} />
                </div>
                <div className="config mt-4">
                    <div>
                        <span>Scale Y :</span>
                    </div>
                    <input className='scale' type="text" placeholder='0.00' value={props.scaleY} />
                </div>

                <div className="config mt-7">
                    <div>
                        <span>Axis X :</span>
                    </div>
                    <input className='translate' type="text" placeholder='0.00' value={props.axisX}/>
                </div>
                <div className="config mt-4">
                    <div>
                        <span>Axis Y :</span>
                    </div>
                    <input className='translate' type="text" placeholder='0.00' value={props.axisY} />
                </div>

                <div className="config mt-7">
                    <div>
                        <span>Rotate :</span>
                    </div>
                    <input className='rotate' type="text" placeholder='0.00' value={props.rotateAngle}/>
                    <div className='rotateDeg'>
                        <span>deg</span>
                    </div>
                </div>
            </div>
            </Draggable>
        </>
    )
}