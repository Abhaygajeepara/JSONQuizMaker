
import { connect, useSelector, useDispatch } from 'react-redux';
import Question from "./Question";
import UserInput from "./UserInput";
import { setIsHide } from '../redux/actions.js';
import PropTypes from 'prop-types';
import { FaExpand } from 'react-icons/fa';

const Home = ({ setIsHide }) => {
  const isHide = useSelector(state => state.isHide);
  const dispatch = useDispatch();

  const handleIsHide = () => {
    dispatch(setIsHide(!isHide));
  };

  console.log(isHide);

  return (
    <>
      <div className="bg-gray-200 overflow-auto grid grid-cols-2 gap-4">
        {isHide ? (
          <div className="col-span-2">
            <Question />
            <button
          className="absolute top-0 right-0 m-2 p-2 bg-barButtonBackground text-white rounded-full"
          onClick={handleIsHide}
        >
          <FaExpand />
        </button>
          </div>
        ) : (
          <>
            <Question className="col-span-2" />
            <UserInput />
          </>
        )}
      </div>
    </>
  );
};

Home.propTypes = {
  setIsHide: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  jsonInput: state.jsonInput,
});

const mapDispatchToProps = {
  setIsHide,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
