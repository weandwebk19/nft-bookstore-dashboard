// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";

// import PropTypes from "prop-types";
// import AuthService from "../../services/authService";
// import UserService from "../../services/userService";

// const PrivateRoute = ({ children }) => {
//   const [isVerify, setIsVerify] = useState();
//   const [isLoggedIn, setIsLoggedIn] = useState();

//   useEffect(() => {
//     (async () => {
//       const res = await UserService.getVerifyStatus();
//       setIsVerify(res);
//       const LoggedInRes = await AuthService.isLoggedIn();
//       setIsLoggedIn(LoggedInRes);
//     })();
//   }, []);

//   if (isLoggedIn === false) {
//     return <Navigate to="/login" />;
//   } else if (isVerify === false) {
//     return <Navigate to="/confirmation/require" />;
//   }
//   return children;
// };
// PrivateRoute.propTypes = {
//   children: PropTypes.node.isRequired
// };

// export default PrivateRoute;
