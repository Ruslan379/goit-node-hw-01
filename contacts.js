require('colors');

const fs = require("fs/promises"); //! АСИНХРОННЫЙ вариант-2

const path = require('path');

const { v4 } = require('uuid');
const uniqid = require('uniqid');

const { lineBreak } = require("./service");




// TODO: ------------------------ Раскомментируй и запиши значение - ТЗ ------------------------
const contactsPath = path.resolve('./db/contacts.json');
lineBreak();
console.log("contactsPath:".red, contactsPath.green); //!
lineBreak()





// TODO: ------------------------ Задокументировать каждую функцию - ТЗ  ------------------------
// ----------------------------------------------------------------------------------
//! 1: Получаем ВСЕ КОНТАКТЫ (АСИНХРОННЫЙ вариант-2)
async function listContacts() {
    try {
        //! Получаем и КОНСОЛИМ значение файла contacts.json ==> СТРОКА (ВСЕ КОНТАКТЫ)
        const data = await fs.readFile(contactsPath, 'utf8');
        console.log("contacts.json:\n".yellow, data.blue); //!
        console.log("typeof (contacts.json):".yellow, (typeof data).red); //!
        lineBreak();

        //!!! ПАРСИМ и КОНСОЛИМ значение файла contacts.json ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ)
        const contactsParse = JSON.parse(data);
        console.log("СПИСОК КОНТАКТОВ:".yellow); //!+++
        console.table(contactsParse); //!+++
        console.log("typeof (СПИСОК КОНТАКТОВ):".yellow, (typeof contactsParse).red); //!
        lineBreak();
        return contactsParse;

    } catch (error) {
        console.error(error.message.red);
        lineBreak();
    }
}


// ----------------------------------------------------------------------------------
//! 2: Получаем ОДИН КОНТАКТ (АСИНХРОННЫЙ вариант-2)
async function getContactById(contactId) {
    try {
        //! Вызываем ф-цию listContacts()  ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ) + все КОНСОЛИ
        const contactsParse = await listContacts();

        //!!! ДОСТАЕМ и КОНСОЛИМ только один элемент МАССИВА (по id = contactId) и получаем  ==> НОВЫЙ МАССИВ c ОДНИМ ОБЪЕКТОМ
        const contactsParseByIdArr = contactsParse.filter(contact => String(contact.id) === String(contactId)); //* - это МАССИВ с одним ОБЪЕКТОМ
        if (contactsParseByIdArr.length === 0) {
            console.log("Нет контакта с таким ID:".yellow, contactId.red); //!+++
            lineBreak();
            return;
        }

        console.log(`КОНТАКТ №_${contactId}:`.yellow); //!+++
        console.table(contactsParseByIdArr); //!+++
        lineBreak();

    } catch (error) {
        console.error(error.message.red);
        lineBreak();
    }
}


// ----------------------------------------------------------------------------------
//! 3: Удаляем ОДИН КОНТАКТ (АСИНХРОННЫЙ вариант-2)
async function removeContact(contactId) {
    try {
        //! Вызываем ф-цию listContacts()  ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ) + все КОНСОЛИ
        const contactsParse = await listContacts();

        //!!! ДОСТАЕМ и КОНСОЛИМ только один элемент МАССИВА (по id = contactId) и получаем  ==> НОВЫЙ МАССИВ c ОДНИМ ОБЪЕКТОМ
        const contactsParseByIdArr = contactsParse.filter(contact => String(contact.id) === String(contactId)); //* - это МАССИВ с одним ОБЪЕКТОМ
        if (contactsParseByIdArr.length === 0) {
            console.log("Нет контакта с таким ID:".yellow, contactId.red); //!+++
            lineBreak();
            return;
        }

        console.log(`Этот КОНТАКТ №_${contactId} будет удален:`.yellow); //!+++
        console.table(contactsParseByIdArr); //!+++
        lineBreak();

        //!!! УДАЛЯЕМ только один элемент МАССИВА (по id = contactId) и получаем  ==> НОВЫЙ МАССИВ ОБЪЕКТОВ
        const contactsParseNew = contactsParse.filter(contact => String(contact.id) !== String(contactId));
        console.log("НОВЫЙ СПИСОК КОНТАКТОВ:".yellow); //!+++
        console.table(contactsParseNew); //!+++
        console.log("typeof (НОВЫЙ СПИСОК КОНТАКТОВ):".yellow, (typeof contactsParse).red); //!
        lineBreak();

        //! Вызываем ф-цию creatingNewJSONfile()  ==>
        //!  Преобразовываем НОВЫЙ МАССИВ ОБЪЕКТОВ в JSON и получаем  ==> НОВЫЙ JSON
        //!  Записываем НОВЫЙ JSON в файл и получаем  ==> НОВЫЙ JSON - файл
        await creatingNewJSONfile(contactsParseNew);

    } catch (error) {
        console.error(error.message.red);
        lineBreak();
    }
}



// ----------------------------------------------------------------------------------
//! 4: Добавляем КОНТАКТ (АСИНХРОННЫЙ вариант-2)
async function addContact(name, email, phone) {
    try {
        //! Вызываем ф-цию listContacts()  ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ) + все КОНСОЛИ
        const contactsParse = await listContacts();

        //! Создаем НОВЫЙ КОНТАКТ ==> newContact
        const newContact = {
            // id: Date.now(),
            // id: v4(),
            id: uniqid(),
            name,
            email,
            phone
        };

        //!!! КОНСОЛИМ НОВЫЙ КОНТАКТ как МАССИВ из одного элемента  ==> МАССИВ c ОДНИМ ОБЪЕКТОМ
        const newContactArr = [newContact];
        console.log(`НОВЫЙ КОНТАКТ №_${newContact.id}:`.yellow); //!+++
        console.table(newContactArr); //!+++
        lineBreak();

        //!!! Добавляем в МАССИВ ОБЪЕКТОВ НОВЫЙ КОНТАКТ(newContact) ==> НОВЫЙ МАССИВ ОБЪЕКТОВ
        const contactsParseNew = [...contactsParse, newContact]; //! 1-й вариант

        console.log("НОВЫЙ СПИСОК КОНТАКТОВ:".yellow); //!+++
        console.table(contactsParseNew); //!+++ 1-й вариант
        console.log("typeof (НОВЫЙ СПИСОК КОНТАКТОВ):".yellow, (typeof contactsParseNew).red); //! 1-й вариант
        lineBreak();

        //! Вызываем ф-цию creatingNewJSONfile()  ==>
        //!  Преобразовываем НОВЫЙ МАССИВ ОБЪЕКТОВ в JSON и получаем  ==> НОВЫЙ JSON
        //!  Записываем НОВЫЙ JSON в файл и получаем  ==> НОВЫЙ JSON - файл
        await creatingNewJSONfile(contactsParseNew); //!+++ 1-й вариант

    } catch (error) {
        console.error(error.message.red);
        lineBreak();
    }
};



//!? ------------------------------------------------ Вспомогательые ФУНЦИИ ------------------------------------------------
//!  Преобразовываем НОВЫЙ МАССИВ ОБЪЕКТОВ в JSON и получаем  ==> НОВЫЙ JSON
//!  Записываем НОВЫЙ JSON в файл и получаем  ==> НОВЫЙ JSON - файл
async function creatingNewJSONfile(contactsParseNew) {
    //!  Преобразовываем НОВЫЙ  МАССИВ ОБЪЕКТОВ в JSON и получаем  ==> НОВЫЙ JSON
    // const contactsParseNewStringifyNewJSON = JSON.stringify(contactsParseNew);
    const contactsParseNewStringifyNewJSON = JSON.stringify(contactsParseNew, null, 2);
    console.log("НОВЫЙ JSON:\n".yellow, contactsParseNewStringifyNewJSON.gray); //!
    console.log("typeof (НОВЫЙ JSON):".yellow, (typeof contactsParseNewStringifyNewJSON).red); //!
    lineBreak();

    //!  Записываем НОВЫЙ JSON в файл contacts.json и получаем  ==> НОВЫЙ contacts.json
    await fs.writeFile(contactsPath, contactsParseNewStringifyNewJSON, 'utf8'); //? - Записываем НОВЫЙ JSON в файл contacts.json
    const contactsNEWjson = await fs.readFile(contactsPath, 'utf8'); //? - Читаем файл contacts.json
    console.log("НОВЫЙ contacts.json:\n".yellow, contactsNEWjson.blue); //!
    console.log("typeof (НОВЫЙ contacts.json):".yellow, (typeof contactsNEWjson).red); //!
    lineBreak();
};
//? ______________________________________________________________________________________________________________



//* =========================================================================================
//* Проверяем работу каждой функции:
// listContacts();

// getContactById(4);

// removeContact(8);

// addContact("Test Contact", "Test.Contact@gmail.com", "(111) 222-334455");
//* ________________________________________________________________________________________



//! +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//! Экспорт функций
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}
