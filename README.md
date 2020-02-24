# V3
## Требования
Node `10.X` \
Для Windows: \
`npm install --global --production windows-build-tools`
Если Python не найдет запустите: \
`npm --add-python-to-path='true' --debug install --global windows-build-tools`
## Установка

Запустите в корне `npm install`

Создайте `src/rest/config/secrets.ts` по примеру `src/rest/config/secrets.example.ts`

Развертка базы данных в admin части проекта.

Создайте файл `environment.ts` и `environment.prod.ts` в `src/frontend/environments`, также присутствует example.
## Запуск

Все скрипты запуска находятся в `package.json`, я поделил их на несколько типов:
`watch` -> отслеживает изменения и собирает приложение
`build` -> однократно собирает приложение
`serve` -> запускает сервер
`lint` -> проверяет код на орфографические ошибки
`test` -> unit тесты
`e2e` -> запускает e2e тесты

Приложения:
`ng` -> angular-cli
`ts` -> серверный typescript
`ws` -> WebSocket Server

Полная сборка приложения:
`npm run build-ts` --> `npm run build-ng` --> (`далее запуск`) --> `npm run serve-ws` (production: `npm run serve-ws-production`)

Обычно при работе над кодом:
`npm run watch-ts` `npm run watch-serve-ws` `npm run serve-ng`, далее я захожу на `localhost:4200`(страница будет сама обновляется при появлении изменений в angular, сервер будет также перезапускается при появлении изменений в серверном коде(angular будет автоматом переподключатся к серверу)).

Также возможно запускать вместо `npm run serve-ng` -> `npm run watch-ng`, тогда можно работать непосредственно с WebSocket сервером, который отдает angular приложение на любой странице, если на ней не содержется файлов, angular приложение, не забывайте в данном случае перезагружать страницу с отчисткой кеша.

## Примечания

Если вы имеете ошибки с не правильным JSON или другими не явными проблемами, попробуйте: \
`npm cache clean --force`
