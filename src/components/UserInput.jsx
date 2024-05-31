import { connect, useSelector } from 'react-redux';
import { setJsonInput,setIsHide } from '../redux/actions.js';
import PropTypes from 'prop-types';

const UserInput = ({ jsonInput, setJsonInput, setIsHide }) => {
    const isHides = useSelector(state => state.isHide);
    const handleChange = (e) => {
        setJsonInput(e.target.value);
    };
    const handleIsHide = () => {
       
        setIsHide(!isHides);
    };
    
    const handleCopyFormat = () => {
        navigator.clipboard.writeText(jsonInput)
            .then(() => {
                console.log('JSON format copied to clipboard');
                // Optionally, you can provide feedback to the user
                alert('JSON format copied to clipboard');
            })
            .catch((error) => {
                console.error('Failed to copy JSON format: ', error);
                // Optionally, you can provide feedback to the user
                alert('Failed to copy JSON format');
            });
    };
    return (
        <div className='h-screen flex flex-col'>
            <div className="flex justify-end items-end bg-barBackground p-2 ">
            <button  className="bg-barButtonBackground text-white p-2 rounded" onClick={handleCopyFormat}>Copy JSON format</button>
            <button className="bg-barButtonBackground text-white p-2 ml-1 rounded" onClick={handleIsHide}>Hide Input</button>
            </div>
            <div className="flex-1">
                <textarea 
                    className="w-full h-full p-4 text-2xl resize-none border-rounded border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="Enter JSON text here"
                    value={jsonInput}
                    onChange={handleChange}
                ></textarea>
                
            </div>
        </div>
    );
};

UserInput.propTypes = {
    jsonInput: PropTypes.string.isRequired,
    setJsonInput: PropTypes.func.isRequired,
    setIsHide: PropTypes.func.isRequired,   
};

const mapStateToProps = (state) => ({
    jsonInput: state.jsonInput,
});

const mapDispatchToProps = {
    setJsonInput,
    setIsHide
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInput);
