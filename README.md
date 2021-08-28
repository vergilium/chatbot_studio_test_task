## ОПИС
---

**Тестове завдання:**

реалізувати міні-проект `Cashiers` in `Shop`:

Засетити Typescript проект з eslint (ми рекомендуємо використовувати плагін airbnb).
*TSLint deprecated, його не використовувати.

Описати TS інтерфейси `Shop`, `Cashier` (касир), `CashRegister`. TS інтерфейси мають використовувати enums там, де це можливо та потрібно.


Забезпечити `CRUD` комунікацію з реляційною БД сутності Cashier. Усі CRUD методи мають приймати типізовані параметри, а метод читання має приймати кілька фільтрів. Наприклад, age, sex, yearsOfExperience, worksInShifts, тощо.

Поля сутностей на твій вибір та твою фантазію. Вибір реляційної бази довільний.  Можна використовувати команди SQL або за бажанням ORM. 


**Реалізувати методи:**

- `getTargetCashiers1`, який вертає усіх касирів магазину за всю історію роботи магазинів ATB у місті Львів, які мають більше 5 років досвіду та раніше працювали у Silpo або Arsen
- `getTargetCashiers2`, який вертає усіх касирів магазину ATB за адресою Шевенка 100, які працюють на касах з непарним числом щопонеділка у нічну зміну (23:00 - 07:00).

Метод getTargetCashiers1 & getTargetCashiers2 реалізувати за допомогою запитів SQL - тобто не через mapping & filtering масивів даних зчитаних з усіх таблиць БД.

---