import React, {useState, useEffect} from 'react';
import styles from './main.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from "react-redux";

export default function Main() {

  const hasError = useSelector(state => state.store.hasError);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <section className={styles.constructor}>
          {!hasError ? (
              <>
                <BurgerIngredients />
                <BurgerConstructor />
              </>
          ):(
              <h1>Ошибка чтения ингредиентов</h1>
          )}
        </section>
      </DndProvider>
    </>
  );
}