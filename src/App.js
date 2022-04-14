import React from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import store from './utils/data';
import {isSwitchStatement} from "@babel/types";


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
      currentTab: 'constructor'
    };

  };

  changeTab = (tab) => this.setState(oldState => ({...oldState, currentTab: tab}));

  render() {
    return (
      <div style={{height:'100%', width:'100%'}}>
        <AppHeader
            currentTab={this.state.currentTab}
            onChangeTab={this.changeTab}
        />
        <section className="p-3" style={{display: this.state.currentTab === 'constructor' ? 'block' : 'none'}}>
            <BurgerConstructor store={this.state.store}/>
        </section>
        <section className="p-3" style={{display: this.state.currentTab === 'orders' ? 'block' : 'none'}}>
          Лента заказов
        </section>
        <section className="p-3" style={{display: this.state.currentTab === 'profile' ? 'block' : 'none'}}>
          Личный кабинет
        </section>
      </div>
    );
  };
}

export default App;
