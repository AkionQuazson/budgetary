import '../../styles/error.css'

const ErrorModal = (props) => {
    const {error, clearError} = props;
    console.log(error)
    return <div 
        className="background" 
        style={{backgroundColor:'#e96464af'}}
        onClick={(e) => {clearError(e)}}
    >
        <div className='panel'>
            {error.message}
        </div>
    </div>
}

export default ErrorModal;