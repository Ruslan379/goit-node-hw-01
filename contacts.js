require('colors');

// const fs = require('fs'); //? СИНХРОННЫЙ вариант
const fs = require('fs').promises; //! АСИНХРОННЫЙ вариант

const path = require('path');

// import { nanoid } from 'nanoid';
// const nanoid = require('nanoid');

const uniqid = require('uniqid');




//! ------------------------------------- Разделительная линия -------------------------------------
function lineBreak() {
    const newline = "----------------------------------------------------------------------------------------------------------------------\n";
    console.log(newline);
}


//* Раскомментируй и запиши значение
const contactsPath = path.resolve('./db/contacts.json');
// console.log(`contactsPath:  ${contactsPath}`.red); //!
lineBreak();
console.log("contactsPath:".red, contactsPath.green); //!
lineBreak()





// TODO: ------------------------ Задокументировать каждую функцию ------------------------
//? Получаем ВСЕ КОНТАКТЫ (СИНХРОННЫЙ вариант)
// function listContacts() {
//     // fs.readFile('./db/contacts.json', 'utf8', (error, data) => {
//     fs.readFile(contactsPath, 'utf8', (error, data) => {
//         if (error) {
//             console.error('Error read file contacts.json:'.red, error.red);
//         }
//         console.log("contacts.json:".yellow, data.blue);
//     })
// };

// ----------------------------------------------------------------------------------
//! Получаем ВСЕ КОНТАКТЫ (АСИНХРОННЫЙ вариант)
async function listContacts() {
    try {
        //! Получаем и КОНСОЛИМ значение файла contacts.json ==> СТРОКА (ВСЕ КОНТАКТЫ)
        const data = await fs.readFile(contactsPath, 'utf8');
        console.log("contacts.json:\n".yellow, data.blue); //!
        console.log("typeof (contacts.json):".yellow, (typeof data).red); //!
        lineBreak();

        //!!! ПАРСИМ и КОНСОЛИМ значение файла contacts.json ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ)
        const contactsParse = JSON.parse(data);
        // console.log("СПИСОК КОНТАКТОВ:".yellow, contactsParse); //!+++
        console.log("СПИСОК КОНТАКТОВ:".yellow); //!+++
        console.table(contactsParse); //!+++
        console.log("typeof (СПИСОК КОНТАКТОВ):".yellow, (typeof contactsParse).red); //!
        lineBreak();

    } catch (error) {
        console.error('Error read file contacts.json:'.red, error.red);
        lineBreak();
    }
}

// ----------------------------------------------------------------------------------
//? Получаем ОДИН КОНТАКТ (СИНХРОННЫЙ вариант)
// function getContactById(contactId) {
//     fs.readFile(contactsPath, 'utf8', (error, data) => {
//         if (error) {
//             console.error('Error read file contacts.json:'.red, error.red);
//         }
//         //! Получаем значение файла contacts.json ==> СТРОКА (ВСЕ КОНТАКТЫ)
//         console.log("contacts.json:".yellow, data.blue); //!
//         console.log("typeof data:".yellow, (typeof data).red);

//         //! ПАРСИМ и получаем значение файла contacts.json ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ)
//         const contactsParse = JSON.parse(data);
//         console.log("contactsParse:".yellow, contactsParse); //!
//         console.log("typeof contactsParse:".yellow, (typeof contactsParse).red);

//         //! ПАРСИМ только один элемент МАССИВА (по индексу = contactId) и получаем из contacts.json ==> ОДИН ОБЪЕКТ
//         console.log("contactId:", contactId);
//         const contactsParseByContactId = JSON.parse(data)[contactId - 1];
//         console.log("contactsParseByContactId:".yellow, contactsParseByContactId); //!
//         console.log("typeof contactsParseByContactId:".yellow, (typeof contactsParseByContactId).red);
//     })
// }



// ----------------------------------------------------------------------------------
//! Получаем ОДИН КОНТАКТ (АСИНХРОННЫЙ вариант)
async function getContactById(contactId) {
    try {
        // const data = await fs.readFile('./package.json', 'utf8'); //! +++
        // console.log("JSON.parse(data).devDependencies:".yellow, JSON.parse(data).devDependencies); //! +++ { nodemon: '^2.0.20', npx: '^10.2.2' }
        // console.log("JSON.parse(data):".yellow, JSON.parse(data)); //! +++ РАБОТАЕТ!!!

        //! Получаем и КОНСОЛИМ значение файла contacts.json ==> СТРОКА (ВСЕ КОНТАКТЫ)
        const data = await fs.readFile(contactsPath, 'utf8');
        console.log("contacts.json:\n".yellow, data.blue); //!
        console.log("typeof (contacts.json):".yellow, (typeof data).red); //!
        lineBreak();

        //! ПАРСИМ и КОНСОЛИМ значение файла contacts.json ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ)
        const contactsParse = JSON.parse(data);
        // console.log("contactsParse:".yellow, contactsParse); //!
        console.log("СПИСОК КОНТАКТОВ:".yellow); //!
        console.table(contactsParse); //!
        console.log("typeof (СПИСОК КОНТАКТОВ):".yellow, (typeof contactsParse).red); //!
        lineBreak();

        //? ПАРСИМ и КОНСОЛИМ только один элемент МАССИВА (по ИНДЕКС = contactId) и получаем из contacts.json ==> ОДИН ОБЪЕКТ
        // console.log("contactId:", contactId);
        // const contactsParseByContactId = JSON.parse(data)[contactId - 1];
        // console.log("contactsParseByContactId:".yellow, contactsParseByContactId); //!
        // console.log("typeof contactsParseByContactId:".yellow, (typeof contactsParseByContactId).red);
        // lineBreak();

        //!!! ДОСТАЕМ и КОНСОЛИМ только один элемент МАССИВА (по id = contactId) и получаем  ==> НОВЫЙ МАССИВ c ОДНИМ ОБЪЕКТОМ
        const contactsParseByIdArr = contactsParse.filter(contact => String(contact.id) === String(contactId));
        // const contactsParseById = contactsParseByIdArr[0]; 
        // console.log("Этот контакт будет удален:".yellow, contactsParseById); //!+++
        console.log(`КОНТАКТ №_${contactId}:`.yellow); //!+++
        console.table(contactsParseByIdArr); //!+++
        lineBreak();

    } catch (error) {
        console.error('Error read file contacts.json:'.red, error.red);
        lineBreak();
    }
}


// ----------------------------------------------------------------------------------
//! Удаляем ОДИН КОНТАКТ (АСИНХРОННЫЙ вариант)
async function removeContact(contactId) {
    try {
        // const data = await fs.readFile('./package.json', 'utf8'); //! +++
        // console.log("JSON.parse(data).devDependencies:".yellow, JSON.parse(data).devDependencies); //! +++ { nodemon: '^2.0.20', npx: '^10.2.2' }
        // console.log("JSON.parse(data):".yellow, JSON.parse(data)); //! +++ РАБОТАЕТ!!!

        //! Получаем и КОНСОЛИМ значение файла contacts.json ==> СТРОКА (ВСЕ КОНТАКТЫ)
        const data = await fs.readFile(contactsPath, 'utf8');
        console.log("contacts.json:\n".yellow, data.blue); //!
        console.log("typeof (contacts.json):".yellow, (typeof data).red); //!
        lineBreak();

        //! ПАРСИМ и КОНСОЛИМ значение файла contacts.json ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ)
        const contactsParse = JSON.parse(data);
        // console.log("contactsParse:".yellow, contactsParse); //!
        console.log("СПИСОК КОНТАКТОВ:".yellow); //!
        console.table(contactsParse); //!
        console.log("typeof (СПИСОК КОНТАКТОВ):".yellow, (typeof contactsParse).red); //!
        lineBreak();

        //? ПАРСИМ и КОНСОЛИМ только один элемент МАССИВА (по индексу = contactId) и получаем из contacts.json ==> ОДИН ОБЪЕКТ
        // console.log("contactId:", contactId);
        // const contactsParseByContactId = JSON.parse(data)[contactId - 1];
        // console.log("contactsParseByContactId:".yellow, contactsParseByContactId); //!
        // console.log("typeof contactsParseByContactId:".yellow, (typeof contactsParseByContactId).red);
        // lineBreak();

        //!!! ДОСТАЕМ и КОНСОЛИМ только один элемент МАССИВА (по id = contactId) и получаем  ==> НОВЫЙ МАССИВ c ОДНИМ ОБЪЕКТОМ
        const contactsParseByIdArr = contactsParse.filter(contact => String(contact.id) === String(contactId));
        // const contactsParseById = contactsParseByIdArr[0]; 
        // console.log("Этот контакт будет удален:".yellow, contactsParseById); //!+++
        console.log("Этот контакт будет удален:".yellow); //!+++
        console.table(contactsParseByIdArr); //!+++
        lineBreak();

        //!!! УДАЛЯЕМ только один элемент МАССИВА (по id = contactId) и получаем  ==> НОВЫЙ МАССИВ ОБЪЕКТОВ
        const contactsParseNew = contactsParse.filter(contact => String(contact.id) !== String(contactId));
        // console.log("НОВЫЙ СПИСОК КОНТАКТОВ:".yellow, contactsParseNew); //!+++
        console.log("НОВЫЙ СПИСОК КОНТАКТОВ:".yellow); //!+++
        console.table(contactsParseNew); //!+++
        console.log("typeof (НОВЫЙ СПИСОК КОНТАКТОВ):".yellow, (typeof contactsParse).red); //!
        lineBreak();

        //!  Преобразовываем НОВЫЙ МАССИВ ОБЪЕКТОВ в JSON и получаем  ==> НОВЫЙ JSON
        const contactsParseNewStringifyNewJSON = JSON.stringify(contactsParseNew);
        console.log("НОВЫЙ JSON:\n".yellow, contactsParseNewStringifyNewJSON.gray); //!
        console.log("typeof (НОВЫЙ JSON):".yellow, (typeof contactsParseNewStringifyNewJSON).red); //!
        lineBreak();

        //!  Записываем НОВЫЙ JSON в файл и получаем  ==> НОВЫЙ JSON - файл
        // await fs.writeFile('./db/contactsNEW.json', contactsParseNewStringifyNewJSON, 'utf8'); //* - Записываем НОВЫЙ JSON в НОВЫЙ файл
        await fs.writeFile(contactsPath, contactsParseNewStringifyNewJSON, 'utf8'); //? - Записываем НОВЫЙ JSON в файл contacts.json
        // const contactsNEWjson = await fs.readFile('./db/contactsNEW.json', 'utf8'); //* - Читаем НОВЫЙ JSON файл
        const contactsNEWjson = await fs.readFile(contactsPath, 'utf8'); //? - Читаем файл contacts.json
        console.log("НОВЫЙ JSON-файл --> contacts.json:\n".yellow, contactsNEWjson.blue); //!
        lineBreak();

    } catch (error) {
        console.error('Error read file contacts.json:'.red, error.red);
        lineBreak();
    }
}



// ----------------------------------------------------------------------------------
//! Добавляем КОНТАКТ (АСИНХРОННЫЙ вариант)
async function addContact(name, email, phone) {
    try {
        //! Создаем НОВЫЙ КОНТАКТ ==> newContact
        const newContact = {
            // id: Date.now(),
            id: uniqid(),
            name,
            email,
            phone
        };
        // console.log("НОВЫЙ КОНТАКТ:".yellow, newContact); //!+++

        //!!! КОНСОЛИМ НОВЫЙ КОНТАКТ как МАССИВ из одного элемента  ==> МАССИВ c ОДНИМ ОБЪЕКТОМ
        const newContactArr = [newContact];
        console.log(`НОВЫЙ КОНТАКТ №_${newContact.id}:`.yellow); //!+++
        console.table(newContactArr); //!+++
        lineBreak();

        //! Получаем значение файла contacts.json ==> СТРОКА (ВСЕ КОНТАКТЫ)
        const data = await fs.readFile(contactsPath, 'utf8');
        console.log("contacts.json:\n".yellow, data.blue); //!
        console.log("typeof (contacts.json):".yellow, (typeof data).red); //!
        lineBreak();

        //! ПАРСИМ и получаем значение файла contacts.json ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ)
        const contactsParse = JSON.parse(data);
        // console.log("СПИСОК КОНТАКТОВ:".yellow, contactsParse); //!+++
        console.log("СПИСОК КОНТАКТОВ:".yellow); //!+++
        console.table(contactsParse); //!+++
        console.log("typeof (СПИСОК КОНТАКТОВ):".yellow, (typeof contactsParse).red); //!
        lineBreak();

        //!!! Добавляем в МАССИВ ОБЪЕКТОВ НОВЫЙ КОНТАКТ(newContact) ==> НОВЫЙ МАССИВ ОБЪЕКТОВ
        const contactsParseNew = [...contactsParse, newContact];
        // console.log("НОВЫЙ СПИСОК КОНТАКТОВ:".yellow, contactsParseNew); //!+++
        console.log("НОВЫЙ СПИСОК КОНТАКТОВ:".yellow); //!+++
        console.table(contactsParseNew); //!+++
        console.log("typeof (НОВЫЙ СПИСОК КОНТАКТОВ):".yellow, (typeof contactsParse).red); //!
        lineBreak();

        //!  Преобразовываем НОВЫЙ МАССИВ ОБЪЕКТОВ в JSON и получаем  ==> НОВЫЙ JSON
        const contactsParseNewStringifyNewJSON = JSON.stringify(contactsParseNew);
        console.log("НОВЫЙ JSON:\n".yellow, contactsParseNewStringifyNewJSON.gray); //!
        console.log("typeof (НОВЫЙ JSON):".yellow, (typeof contactsParseNewStringifyNewJSON).red); //!
        lineBreak();

        //!  Записываем НОВЫЙ JSON в файл и получаем  ==> НОВЫЙ JSON - файл
        // await fs.writeFile('./db/contactsNEW.json', contactsParseNewStringifyNewJSON, 'utf8'); //* - Записываем НОВЫЙ JSON в НОВЫЙ файл
        await fs.writeFile(contactsPath, contactsParseNewStringifyNewJSON, 'utf8'); //? - Записываем НОВЫЙ JSON в файл contacts.json
        // const contactsNEWjson = await fs.readFile('./db/contactsNEW.json', 'utf8'); //* - Читаем НОВЫЙ JSON файл
        const contactsNEWjson = await fs.readFile(contactsPath, 'utf8'); //? - Читаем файл contacts.json
        console.log("НОВЫЙ JSON-файл --> contacts.json:\n".yellow, contactsNEWjson.blue); //!
        lineBreak();

    } catch (error) {
        console.error('Error read file contacts.json:'.red, error.red);
        lineBreak();
    }
}


//* =========================================================================================
//* Проверяем работу каждой функции:
// listContacts();

// getContactById(4);

// removeContact(8);

// addContact("Test Contact", "Test.Contact@gmail.com", "(111) 222-334455");


//! +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//! Экспорт функций
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    lineBreak
}
