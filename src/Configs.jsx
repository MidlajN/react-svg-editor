import { Grip } from 'lucide-react';
import './Configs.css'
import Draggable from 'react-draggable';


export default function ObjectConfigs(props) {
    const { objectValues, setObjectValues, setPrevObject } = props;

    const handleInput = (event) => {
        setObjectValues((prevObject) => {
            setPrevObject(prevObject);
            return { ...prevObject, [event.target.name]: parseFloat(event.target.value ? event.target.value : 0) };
        });
        
    }

    return (
        <>
            <Draggable bounds="parent" handle=".handle">
                <div className="configs w-[12rem]">
                    <div className="toggleButton">
                        <button className='handle'>
                            <Grip />
                        </button>
                    </div>
                    <div className="flex justify-between gap-4 mt-7">
                        <div className="config ">
                            <div>
                                <span>X :</span>
                            </div>
                            <input className='translate' maxLength={6} name='x' type="text" value={objectValues.x} onChange={ handleInput } />
                        </div>
                        <div className="config">
                            <div>
                                <span>Y :</span>
                            </div>
                            <input className='translate' maxLength={6} name='y' type="text" value={objectValues.y} onChange={ handleInput } />
                        </div>
                    </div>

                    <div className="config  mt-6">
                        <div>
                            <span>Scale X :</span>
                        </div>
                        <input className='scale' maxLength={2} type="text" name='scaleX' value={objectValues.scaleX} onChange={ handleInput }  />
                    </div>
                    <div className="config mt-4">
                        <div>
                            <span>Scale Y :</span>
                        </div>
                        <input className='scale' maxLength={2} type="text" name='scaleY'  value={objectValues.scaleY} onChange={ handleInput } />
                    </div>

                    {/* <div className="config  mt-6">
                        <div>
                            <span>pathOffset X :</span>
                        </div>
                        <input className='scale' maxLength={2} type="text" name='offsetX' value={objectValues.pathOffset.x} onChange={ handleInput }  />
                    </div>
                    <div className="config mt-4">
                        <div>
                            <span>pathOffset Y :</span>
                        </div>
                        <input className='scale' maxLength={2} type="text" name='offsetY'  value={objectValues.pathOffset.y} onChange={ handleInput } />
                    </div> */}

                    
                    <div className="config mt-7">
                        <div>
                            <span>Rotate :</span>
                        </div>
                        <input className='rotate' maxLength={3} type="text" name='rotateAngle' value={objectValues.rotateAngle} onChange={ handleInput } />
                        <div className='rotateDeg'>
                            <span>deg</span>
                        </div>
                    </div>
                </div>
            </Draggable>
        </>
    )
}