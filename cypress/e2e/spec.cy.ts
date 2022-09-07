import {baseTextUrl, ingredients } from "../../src/services/urls";

// @ts-ignore
describe('Проверка доступа меню', () => {

    it('Наличие пункта меню', () => {
        cy.visit(baseTextUrl);
        cy.contains('Конструктор');
    });

});

describe('Проверка ингредиентов', () => {

    let price = 0;

    before(() => {
        cy.visit(baseTextUrl);
        cy.intercept("GET", ingredients, {fixture: "burger-ingredients.json"});

    });

    it('панель с ингредиентами на месте', () => {
        cy.get('[data-test="ingredients"]');
    });

    it('Есть все категории', () => {
        cy.get('[data-test="category"]').as('categories');
        cy.get('@categories').each(($category) => {
            cy.wrap($category).should('have.attr', 'id').and('oneOf', ['bun', 'main', 'sauce']);
            cy.wrap($category).next().find('a').as('ingredients');
            cy.get('@ingredients').should('have.length.at.least', 2);
        });
    });

    it('открытие/закрытие деталей ингредиента', () => {
        cy.get('[data-test="category"]#bun~ul:first a').first().click();
        cy.get('[data-test="modal"]').should('be.visible');
        cy.location('pathname').should('contain', 'ingredients/');
        cy.get('[data-test="modal_close-button"]').click();
        cy.get('[data-test="modal"]').should('not.exist')
    });

    it('добавление и замена булок', () => {
        cy.get('[data-test="category"]#bun~ul:first a').each(($bun) => {
            cy.wrap($bun).should('have.attr', 'href').then((href) => {
                cy.wrap($bun).children('li').trigger('dragstart');
                cy.get('[data-test="_constructor"]').trigger('drop');
                cy.wrap($bun).find('[class^="counter_counter__num"]').contains('2');
                cy.get(`[data-test="current_burger"] [data-test=${href.toString().split('/').slice(-1)}]`)
                    .should('have.attr', 'data-price').then((coast) => {
                    price = +coast * 2;
                });
            });
        });
    });

    it('добавление соусов', () => {
        cy.get('[data-test="category"]#sauce~ul:first a').each(($bun) => {
            cy.wrap($bun).should('have.attr', 'href').then((href) => {
                cy.wrap($bun).children('li').trigger('dragstart');
                cy.get('[data-test="_constructor"]').trigger('drop');
                cy.wrap($bun).find('[class^="counter_counter__num"]').contains('1');
                cy.get(`[data-test="current_ingredients"] [data-test="${href.toString().split('/').slice(-1)}"]`)
                    .should('have.attr', 'data-price').then((coast) => {
                    price += +coast;
                });
            });
        });
    });

    it('добавление начинок', () => {
        cy.get('[data-test="category"]#main~ul:first a').each(($bun) => {
            cy.wrap($bun).should('have.attr', 'href').then((href) => {
                cy.wrap($bun).children('li').trigger('dragstart');
                cy.get('[data-test="_constructor"]').trigger('drop');
                cy.wrap($bun).find('[class^="counter_counter__num"]').contains('1');
                cy.get(`[data-test="current_ingredients"] [data-test="${href.toString().split('/').slice(-1)}"]`)
                    .should('have.attr', 'data-price').then((coast) => {
                    price += +coast;
                });
            });
        });
    });

    it('проверка стоимости набранного заказа', () => {
        cy.get('[data-test="total-price"]').contains(price.toString());
    });

    it('Проверка регистрации заказа', () => {
        cy.intercept("POST", "api/orders").as('orderRequest');
        cy.contains('Оформить заказ').first().click();
        cy.location('pathname').should('equal', '/login');
        cy.get("input[name=email]").type("i.m.a.y1@yandex.ru");
        cy.get("input[name=password]").type("1234567890");
        cy.contains('Войти').first().click();
        cy.location('pathname').should('equal', '/');
        cy.contains('Оформить заказ').first().click();

        cy.wait('@orderRequest').its('response.body')
            .then((response) => {
                expect(response.success).equal(true);
            });
        cy.contains('Ваш заказ начали готовить');
    });

});