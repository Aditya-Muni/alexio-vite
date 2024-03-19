import {
  createContext,
  useCallback,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";

// Create Context
const AlexioContext = createContext();

// Type
const type = {
  NAV: "NAV",
  TOGGLE: "TOGGLE",
};
const { NAV, TOGGLE } = type;

// Initial Value
const initialState = {
  nav: "home",
  toggle: false,
};

// Reducer
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case NAV:
      return {
        ...state,
        nav: payload,
      };
    case TOGGLE:
      return {
        ...state,
        toggle: payload,
      };
    default:
      return state;
  }
};

// Alexio State
const AlexioState = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(
          "https://dashboard-backend.cyclic.app/api/v1/get/user/65b3a22c01d900e96c4219ae"
        );
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUser();
  }, []);

  const changeNav = useCallback((value, toggleValue) => {
    dispatch({
      type: NAV,
      payload: value,
    });
    dispatch({
      type: TOGGLE,
      payload: toggleValue,
    });
  }, []);

  // const { nav, toggle } = state;

  return (
    <AlexioContext.Provider
      value={{
        nav: state.nav,
        toggle: state.toggle,
        userData,
        changeNav,
      }}
    >
      {children}
    </AlexioContext.Provider>
  );
};

AlexioState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlexioState;
const useAlexio = () => useContext(AlexioContext);

export { AlexioState, useAlexio, AlexioContext };
