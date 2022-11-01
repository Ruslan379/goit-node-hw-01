// const { gameGuessNumber } = require("./guess-the-number");

// gameGuessNumber();

//! Шаг 3 ==> Импорт модуля contacts.js
const {
    listContacts,
    getContactById,
    removeContact,
    addContact
} = require("./contacts");


//! Шаг 4 ==> Импорт пакета yargs
const argv = require("yargs").argv;





//! Шаг 3 ==> Проверяем работоспособность функций для работы с контактами
listContacts();

// getContactById(4);

// removeContact(9);

// addContact("Ruslan Fate", "ruslan_fate@gmail.com", "(777) 333-3377599");




//! Шаг 4 ==> Функцию invokeAction() для удобного парса аргументов командной строки
// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            console.log("action --> listContacts");
            listContacts();
            break;

        case "get":
            getContactById(id);
            break;

        case "add":
            addContact(name, email, phone);
            break;

        case "remove":
            removeContact(id);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

console.log("argv:", argv);

// invokeAction(argv);

//! list
// invokeAction("list");

//! get
// invokeAction("get", 9);

//! add
// invokeAction("add", _, "Ruslan2 Fate2", "ruslan_fate2@gmail.com", "(73737) 37373-3131717199");

//! remove
// invokeAction("remove", 10);