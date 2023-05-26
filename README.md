## RisingStars
Мобильная игра для компании

---
Инструкция для запуска проекта: 

**через терминал из папки server**
- установка зависимостей **npm i**
- должен быть запущен PostgreSQL на компьетере
- в корне папки server создайте файл .env и скопируйте в него строки из файла envExample. Заполните эти поля в соотвествии с базой данный PostgreSQL
- создание и заливка базы данных - команда в терминале **npm run prep-db**
<br/>
Сервер будет запущен на порту, указаном в файле .env
<br/>
<br/>


**через терминал из папки client**
- установка зависимостей **npm i**
- в файлах gameSaga.ts и UserThink.ts заменить все совпадения "YourComputerIP" на ваш IP-адрес
- запуск приложения - команда в терминале **npm start**
<br/>
Для игры с мобильного устройства нужно установить приложеник Expo Go и отсканировать QR-код из терминала client
<br/>
Игру можно запустить в web-версии (кнопка W в терминале) или в симуляторах (для android - 'a', для ios - 'i'). В начале игры доступ будет только к галереи фотографий.
<br/>

---
### Stack

- JavaScript
- TypeScript
- ReactNative
- Expo
- Redux, Redux-Saga, Redux-Thunk
- WebSocket
- Material UI
- Axios
- Node.js
- Webpack
- Express, express-sessions
- Sequelize
- dotenv
- cors
- bcrypt
