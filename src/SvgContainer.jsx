import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import "./SvgContainer.css";

export default function SvgContainer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 700,
      backgroundColor: "white"
    });
    
    // Make the canvas globally accessible
    window.canvas = canvas;

    // Cleanup function to dispose the canvas when the component unmounts
    return () => {
      canvas.dispose();
    };
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    const reader = new FileReader();

    reader.onload = (e) => {
      const svgString = e.target.result;

      fabric.loadSVGFromString(svgString, (objects, options) => {
        const obj = fabric.util.groupSVGElements(objects, options);

        // Fit the SVG to the canvas dimensions
        if (obj.width > canvasRef.current.width || obj.height > canvasRef.current.height) {
          const scaleX = canvasRef.current.width / obj.width;
          const scaleY = canvasRef.current.height / obj.height;
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

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center"
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
    </div>
  );
}
