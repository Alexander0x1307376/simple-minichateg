# Simple-minichateg

Мой учебный пет-проект, представляющий собой минимальный текстовый чат с комнатами.

## Установка проекта
Требуется установленный NodeJS версии не ниже 16.14 и yarn.

Установка сервера:

    cd server && yarn install

Установка клиента:

    cd client && yarn install

## Команды сервера
`yarn dev` - запуск сервера разработки

`yarn compile` - компиляция кода в готовую сборку ( ./server/out)

`yarn start:prod` - запуск скомпилированной сборки

## Команды клиента
`yarn start` - запуск сервера разработки

`yarn build` - компиляция кода в готовую сборку (директория ./client/build)