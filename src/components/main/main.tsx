import React from 'react';
import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppSelector } from "../../hooks";

export default function Main() {

  const hasError = useAppSelector(state => state.store.hasError);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <section className={styles.constructor_section}>
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