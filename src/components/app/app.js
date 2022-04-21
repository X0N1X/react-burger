import React from 'react';
import styles from './app.module.css';
import AppHeader from '../../components/app-header/app-header';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import store from '../../utils/data';
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

class App extends React.Component {
  constructor(props) {
    super(props);

      const groups = [];

      store.forEach(item => {
          const index = groups.findIndex(group => group.name === item.type);

          if (index >= 0) {
              groups[index].children.push(item);

          } else {
              let text = '';
              switch (item.type) {
                  case 'bun':   text = 'Булки';   break;
                  case 'sauce': text = 'Булки';   break;
                  case 'main':  text = 'Начинки'; break;
              }

              groups.push({
                  name:     item.type,
                  text:     text,
                  children: [item]
              });
          }
      });

    this.state = {
      store:      groups,
      currentTab: 'constructor',
      currentBurger: {
        bun: store.find((item=>item._id === '60666c42cc7b410027a1a9b1')),
        ingredients: [
            store.find((item=>item._id === '60666c42cc7b410027a1a9b9')),
            store.find((item=>item._id === '60666c42cc7b410027a1a9b4')),
            store.find((item=>item._id === '60666c42cc7b410027a1a9bc')),
            store.find((item=>item._id === '60666c42cc7b410027a1a9bb')),
            store.find((item=>item._id === '60666c42cc7b410027a1a9bb')),
            store.find((item=>item._id === '60666c42cc7b410027a1a9bb')),
            store.find((item=>item._id === '60666c42cc7b410027a1a9bb'))
        ],
        total: 610
      }
    };

  };

  changeTab = (tab) => this.setState(oldState => ({...oldState, currentTab: tab}));

  render() {
    return (
      <div className={styles.app}>
        <AppHeader
            currentTab={this.state.currentTab}
            onChangeTab={this.changeTab}
        />
        <section className={this.state.currentTab === 'constructor' ? styles.constructor : styles.hidden_section}>
            <BurgerIngredients store={this.state.store} currentBurger={this.state.currentBurger}/>
            <BurgerConstructor currentBurger={this.state.currentBurger}/>
        </section>
        <section className={this.state.currentTab === 'orders' ? styles.orders : styles.hidden_section}>
          Лента заказов
        </section>
        <section className={this.state.currentTab === 'profile' ? styles.profile : styles.hidden_section}>
          Личный кабинет
        </section>
      </div>
    );
  };
}

export default App;
