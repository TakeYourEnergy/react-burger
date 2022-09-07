import styles from './spinner.module.css'
import { Triangle } from 'react-loader-spinner'


const Spinner = () => {
   return (
      <div className={styles.over}>
         <div className={styles.spinner}>
            <Triangle color="red" height={80} width={80} ariaLabel="loading-indicator" />
         </div>
      </div>
   )
}

export default Spinner
