export default function DialogDox(props) {
    let dialogInfo = props.data
    return (
        <div>
            <div className="dialog-overlay"></div>
            <div className="dialog-content">
                <div className="dialog-form">
                    <span className="dialog-title">{dialogInfo.title}</span>
                    <span className="dialog-desc">{dialogInfo.desc}</span>
                    <button onClick={dialogInfo.handleBtn1}>{dialogInfo.btn1}</button>
                    <button onClick={dialogInfo.handleBtn2}>{dialogInfo.btn2}</button>
                </div>
            </div>
        </div>
        
    );
}