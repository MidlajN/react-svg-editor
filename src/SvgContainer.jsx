import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import "./SvgContainer.css";
import ObjectConfigs from "./Configs";
import { act } from "react-dom/test-utils";
import { split } from "postcss/lib/list";

export default function SvgContainer() {
  const canvasRef = useRef(null);
  const dropAreaRef = useRef(null);
  const [objectValues, setObjectValues] = useState({ x: 0, y: 0, scaleX: 0, scaleY: 0, rotateAngle: 0});
  const [prevObject, setPrevObject] = useState(objectValues);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fabric.Object.prototype.cornerStyle = 'circle';
    fabric.Object.prototype.cornerColor = '#7f77eb85';
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerSize = 12;
    

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 700,
      backgroundColor: "white"
    });
    
    // Make the canvas globally accessible
    window.canvas = canvas;
    canvas.on("mouse:move", (e) => {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        // console.log('Active Object ;::', activeObject)
        const roundX = parseFloat(activeObject.left.toFixed(2));
        const roundY = parseFloat(activeObject.top.toFixed(2));
        const roundScaleX = parseFloat(activeObject.scaleX.toFixed(2));
        const roundScaleY = parseFloat(activeObject.scaleY.toFixed(2));
        const roundAngle = parseFloat(activeObject.angle.toFixed(2));
        const pathOffset = activeObject.pathOffset;
        
        const object = { x: roundX, y: roundY, scaleX: roundScaleX, scaleY: roundScaleY, rotateAngle: roundAngle, pathOffset: pathOffset }
        setObjectValues(object);
        setPrevObject(object);
        // console.log('SVG ::', activeObject.toSVG(), '\n \n [+] Canvas Svg : -----', canvas.toSVG());
      }
    });
    // Cleanup function to dispose the canvas when the component unmounts
    return () => {
      canvas.dispose();
    };
  }, []);

  const handleNewSVg = () => {
    const activeObject = canvas.getActiveObject();


    if (activeObject.get('type') === 'activeSelection' || !activeObject) return;

    activeObject.clone((cloned) => {
      console.log('Cloned Object ::', activeObject)
      const objects = cloned._objects;
      console.log(activeObject.get('type'))

      if (!objects && cloned.path) {
        const mainArray = [];
        // for (let i = 0; i < objects.length; i++) {
          const paths = cloned.path;
          let array = [];

          for (let j = 0; j < paths.length; j++) {
            const line = paths[j] ? paths[j].join(' ') : null;
            const command = paths[j] ? paths[j][0] : null;

            if (command === 'M' || j === paths.length - 1) {
              if (array.length) {
                // const [m, x, y] = array[0].split(' ')
                let x = cloned.left + cloned.pathOffset
                mainArray.push({mX : parseFloat(x), mY: parseFloat(y), path: array.join(' ')})
              };
              array = [];
              array.push(line)
              continue;
            }
            array.push(line)
          }
        // }

        mainArray.forEach(path => {
          if (path !== null) {
            const fabricPath = new fabric.Path(path.path)
            fabricPath.set({ selectable : true, hasControls: true,  scaleX: activeObject.scaleX, scaleY: activeObject.scaleY, top: activeObject.top, left: activeObject.left });
            canvas.add(fabricPath)
          }
        })
      } else {
        objects.forEach(obj => {
          canvas.discardActiveObject();
          console.log('TOP : ', activeObject.top, '\t : ', obj.top, ' TOTAL : ', activeObject.top + obj.top, '\nLEFT : ', activeObject.left, '\t : ', obj.left, ' TOTAL : ', activeObject.left + obj.left)
          obj.set({
            top: activeObject.top - obj.top * activeObject.scaleX,
            left: activeObject.left - obj.left * activeObject.scaleY,
            scaleX: activeObject.scaleX * 3.78,
            scaleY: activeObject.scaleY * 3.78,
            angle: activeObject.angle,
            evented: true,
          })

          canvas.add(obj)
          canvas.setZoom(1)
          canvas.renderAll()
        })
      }
      canvas.remove(activeObject);
    });
  }

  useEffect(() => {
    const canvas = window.canvas;
    if (!isEqual(prevObject, objectValues)) {
        const activeObject = canvas.getActiveObject();
        console.log(activeObject)
        if (activeObject) {
          activeObject.set({ 
            left: objectValues.x, 
            top: objectValues.y, 
            scaleX: objectValues.scaleX, 
            scaleY: objectValues.scaleY, 
            angle: objectValues.rotateAngle,
            originX: 'left',
            originY: 'top',
          });
          canvas.renderAll();
        }
    }
  },[objectValues]);


  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFile = (file) => {

    if (file.type !== "image/svg+xml") {
      setMessage("Uploaded File is Not Valid SVG.");
      return;
    }

    dropAreaRef.current.style.display = 'none'
    const reader = new FileReader();
    reader.onload = (e) => {
      const svgString = e.target.result;

      fabric.loadSVGFromString(svgString, (objects, options) => {
        console.log(objects)
        // objects[0].top += 38;
        // objects[0].left += 38;
        const obj = fabric.util.groupSVGElements(objects, options);

        // Fit the SVG to the canvas dimensions
        // if (obj.width > canvas.getWidth() || obj.height > canvas.getHeight()) {
        //   const scaleX = canvas.width / obj.width;
        //   const scaleY = canvas.height / obj.height;
        //   const scale = Math.min(scaleX, scaleY);
        //   obj.scale(scale);
        // }

        obj.set({ selectable: true, hasControls: true });

        canvas.add(obj);
        canvas.renderAll();
      });
    };
    reader.readAsText(file);
  };


  return (
    <div
      className="w-full h-full flex items-center flex-col justify-center relative"
      style={{
        backgroundImage:
          "repeating-conic-gradient(#ededed 0deg, #ededed 25%, transparent 0deg, transparent 50%)",
          backgroundSize: "16px 16px",
      }}
    >
      <div
        className="fabricCanvas"
        id="canvas"
        onDrop={ (e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]) } }
        onDragOver={handleDragOver}
      >
        <div className="dropArea" ref={ dropAreaRef }>
          <div className="content">
            <p>Drop You SVG File here</p>
            <input type="file" onChange={ (e) => handleFile(e.target.files[0])  } />
            <span>{ message }</span>
          </div>
        </div>
        <canvas ref={ canvasRef }></canvas>
      </div>
      <div className="values">
        <p>ScaleX : <span>{objectValues.scaleX}</span> &nbsp;&nbsp;&nbsp; ScaleY : <span>{objectValues.scaleY}</span></p>
        <p>X : <span>{objectValues.x}</span> &nbsp;&nbsp;&nbsp; Y : <span>{objectValues.y}</span></p>
        <button onClick={handleNewSVg}>New</button>
        <button onClick={handleNewSVg}>Delete</button>
      </div>

      
      <ObjectConfigs 
        setObjectValues={setObjectValues}
        objectValues={objectValues}
        setPrevObject={setPrevObject}
      />
    </div>
  );
}


export function isEqual(obj1, obj2) {
  // Base Case
  if (obj1 === obj2) {
    return true;
  }
  // If any of the objects is null or not an object
  if (obj1 === null || typeof obj1 !== 'object' || obj2 === null || typeof obj2 !== 'object') {
    return false;
  }

  // Handle Arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    for (let i = 0; i < obj1.length; i++) {
      if (!isEqual(obj1[i], obj2[i])) return false; 
    }
    return true;
  }

  // Handle Objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if both objects have the same number of keys
  if (keys1.length !== keys2.length) return false;

  // Compare each property
  for (const key in keys1){
    if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}
