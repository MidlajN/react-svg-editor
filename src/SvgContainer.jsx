
export default function SvgContainer({ children }) {

    return (
        <>
            <div className="w-full h-full flex items-center justify-center" style={{ backgroundImage: 'repeating-conic-gradient(#ededed 0deg, #ededed 25%, transparent 0deg, transparent 50%)', backgroundSize: '16px 16px'}}>
                {children}
            </div>
        </>
    )
}