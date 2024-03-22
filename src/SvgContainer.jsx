import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import "./SvgContainer.css";
import ObjectConfigs from "./Configs";

export default function SvgContainer() {
  const canvasRef = useRef(null);
  const [axisPosition, setAxisPosition] = useState({ x: 0, y: 0, scaleX: 0, scaleY: 0, rotateAngle: 0 });

  useEffect(() => {
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
        console.log('activeObject', activeObject)
        const roundX = parseFloat(activeObject.left.toFixed(2));
        const roundY = parseFloat(activeObject.top.toFixed(2));
        const roundScaleX = parseFloat(activeObject.scaleX.toFixed(2));
        const roundScaleY = parseFloat(activeObject.scaleY.toFixed(2));
        const roundAngle = parseFloat(activeObject.angle.toFixed(2));
        setAxisPosition({ x: roundX, y: roundY, scaleX: roundScaleX, scaleY: roundScaleY, rotateAngle: roundAngle });
        // console.log('svg', activeObject.toSVG())
      }
    });
    // Cleanup function to dispose the canvas when the component unmounts
    return () => {
      canvas.dispose();
    };
  }, []);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const reader = new FileReader();

    reader.onload = (e) => {
      const svgString = e.target.result;

      fabric.loadSVGFromString(svgString, (objects, options) => {
        const obj = fabric.util.groupSVGElements(objects, options);

        console.log('width', canvas.getWidth(), 'height', canvas.getHeight())
        console.log('width', obj.width, 'height', obj.height)
        // Fit the SVG to the canvas dimensions
        if (obj.width > canvas.getWidth() || obj.height > canvas.getHeight()) {
          const scaleX = canvas.width / obj.width;
          const scaleY = canvas.height / obj.height;
          const scale = Math.min(scaleX, scaleY);

          obj.scale(scale);
        }

        obj.set({ selectable: true, hasControls: true });


        canvas.add(obj);
        canvas.renderAll();
      });
    };
    reader.readAsText(e.dataTransfer.files[0]);
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
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="values">
        <p>ScaleX : <span>{axisPosition.scaleX}</span> &nbsp;&nbsp;&nbsp; ScaleY : <span>{axisPosition.scaleY}</span></p>
        <p>X : <span>{axisPosition.x}</span> &nbsp;&nbsp;&nbsp; Y : <span>{axisPosition.y}</span></p>
      </div>
      
      <ObjectConfigs 
        scaleX={axisPosition.scaleX} 
        scaleY={axisPosition.scaleY} 
        axisX={axisPosition.x} 
        axisY={axisPosition.y}
        rotateAngle={axisPosition.rotateAngle}
      />
    </div>
  );
}
