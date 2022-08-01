import { Route, useLocation, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";


//защищенный маршрут
export function ProtectedRoute({ children, ...rest }) {
   const user = useSelector(state => state.loginReducer.user)
   const location = useLocation();

   return (
      <Route
         {...rest}
         render={
            () => (user ? (children) : (
               <Redirect to={{
                  pathname: '/login',
                  state: { from: location },
               }}
               />
            ))
         }
      />
   );
} 

export default ProtectedRoute