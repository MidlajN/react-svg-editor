import  logo  from '/logonew.svg';

export default function Navbar() {
    return (
        <>
           <div className="flex w-full items-center justify-between navbar h-[9%]">
               <div className="heading flex items-center justify-center gap-2">
                   <img src={logo} className='w-7' alt="logo"/>
                   <span className="svg">SVG</span><span className="editor">Editor</span>
               </div>
               {/* <div className="github">
                   <a href="https://github.com/MidlajN/react-svg-editor" target="_blank">
                       <i className="fa-brands fa-github fa-2xl"></i>
                    </a>
               </div> */}
           </div>
        </>
    )
}