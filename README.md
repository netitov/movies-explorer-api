# API для проекта Movies-explorer

1. **Ссылка** на API: https://api.movies.netitov.ru

2. **Используемая платформа**: Node.js (Express)

3. **Скрипты**:

* Запуск приложения: *npm run start*
* Запуск приложения в режиме разработки: *npm run dev*
* Линтинг: *npm run lint*

4. **Endpoints**:

* возвращает информацию о пользователе (email и имя)
*GET /users/me*

* обновляет информацию о пользователе (email и имя)
*PATCH /users/me*

* возвращает все сохранённые пользователем фильмы
*GET /movies*

* создаёт фильм с переданными в теле
country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail
*POST /movies*

* удаляет сохранённый фильм по _id
*DELETE /movies/movieId*

* создаёт пользователя с переданными в теле
email, password и name
*POST /signup*

* проверяет переданные в теле почту и пароль
и возвращает JWT
*POST /signin*

