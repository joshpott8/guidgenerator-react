function Toast(props) {
    let message = props.message;

    return ( <div className="toast">{message}</div>)
}

export default Toast;