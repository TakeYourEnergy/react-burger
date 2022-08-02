import styles from './notFound404.module.css'
import notFound404 from '../../images/notFound404.jpg'
import { Link } from 'react-router-dom'

const NotFound404 = () => {
   return (
      <div className={styles.box}>
         <img className={styles.img} src={notFound404} alt="404" />
         <Link to='/' className={styles.link}>Вернуться на главную</Link>
      </div>
   )
}

export default NotFound404