import { Route, useLocation, Redirect, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../../utils/types';
import { FC, ReactNode } from 'react';


interface IProtected {
   children: ReactNode
}

//защищенный маршрут
const ProtectedRoute: FC<RouteProps & IProtected> = ({ children, ...rest }) => {
   const user = useAppSelector(state => state.loginReducer.user)
   const location = useLocation<{ from: string }>();

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