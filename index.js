// const { gameGuessNumber } = require("./guess-the-number");
// gameGuessNumber();

require('colors');

//! Шаг 3 ==> Импорт модуля contacts.js
const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    lineBreak
} = require("./contacts");

//! Шаг 4-1 ==> Импорт пакета yargs
// const argv = require("yargs").argv;

//! Шаг 4-2 ==> Импорт модуля commander 
const { Command } = require("commander");
// -----------------------------------------------------------------------------



//! Шаг 3 ==> Проверяем работоспособность функций для работы с контактами
// listContacts();

// getContactById(4);

// removeContact(9);

// addContact("Ruslan Fate", "ruslan_fate@gmail.com", "(777) 333-3377599");
// -----------------------------------------------------------------------------






//! Шаг 4-1 ==> Функция invokeAction() для удобного парса аргументов командной строки
// TODO: рефакторить
// (function invokeAction({ action, id, name, email, phone }) {
//     switch (action) {
//         case "list":
//             console.log("action --> list".green); //!
//             lineBreak();
//             listContacts();
//             break;

//         case "get":
//             console.log("action --> get".blue); //!
//             lineBreak();
//             getContactById(id);
//             break;

//         case "add":
//             console.log("action --> add".yellow); //!
//             lineBreak();
//             addContact(name, email, phone);
//             break;

//         case "remove":
//             console.log("action --> remove".red); //!
//             lineBreak();
//             removeContact(id);
//             break;

//         default:
//             console.warn("\x1B[31m Unknown action type!");
//             lineBreak();
//     }
// })(argv); //? Самовызывающееся функциональное выражение (IIFE)

// console.log("argv:".yellow, argv); //!
// lineBreak();

// // invokeAction(argv); //! парсим аргументы командной строки
// -----------------------------------------------------------------------------





//! Шаг 4-2 ==> Используем модуль commander для парсинга аргументов командной строки
const program = new Command();

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
(function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            console.log("action --> list".green); //!
            lineBreak();
            listContacts();
            break;

        case "get":
            console.log("action --> get".blue); //!
            lineBreak();
            getContactById(id);
            break;

        case "add":
            console.log("action --> add".yellow); //!
            lineBreak();
            addContact(name, email, phone);
            break;

        case "remove":
            console.log("action --> remove".red); //!
            lineBreak();
            removeContact(id);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
            lineBreak();
    }
})(argv); //? Самовызывающееся функциональное выражение (IIFE)

console.log("argv:".yellow, argv); //!
lineBreak();

// invokeAction(argv); //! парсим аргументы командной строки
// -----------------------------------------------------------------------------





//! Шаг 5 ==> Запускаем команды в терминале  ===> CLI

//? Получаем и выводим весь список контактов в виде таблицы(console.table)
//! list
//* node index.js --action list


//? Получаем контакт по id
//! get
//* node index.js --action get --id 5


//? Добавялем контакт
//! add
//* node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22
//* node index.js --action add --name Mango2 --email mango2@gmail.com --phone 222-11-11
//* node index.js --action add --name Mango3 --email mango3@gmail.com --phone 333-33-33
//* node index.js --action add --name Mango4 --email mango4@gmail.com --phone 444-44-44
//* node index.js --action add --name Mango5 --email mango5@gmail.com --phone 555-55-55


//? Удаляем контакт
//! remove
//* node index.js --action remove --id 3