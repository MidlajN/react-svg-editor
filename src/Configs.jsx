import './Configs.css'
export default function ObjectConfigs() {
    const canvas = window.canvas;
    if (canvas) {
        canvas.on('mouse:down', (option) => {
            console.log('option', option)
        })
    }
    return (
        <>
            <div className="configs">
                <div className="config">
                    <span>Config</span>
                </div>
                <div className="config">
                    <span>Config</span>
                </div>
                <div className="config">
                    <span>Config</span>
                </div>
                <div className="config">
                    <span>Config</span>
                </div>
            </div>
        </>
    )
}