import styles from './panel.module.css';
import { Link } from 'react-router-dom';

export function Page404() {
    return(
        <section className = {styles.panel}>
            <span className="text text_type_main-large">
                Error 404
            </span>
            <span className="text text_type_main-default">
                Страница не найдена. Перейдите на <Link to='/'>Главную страницу</Link>.
            </span>
        </section>
    );
};