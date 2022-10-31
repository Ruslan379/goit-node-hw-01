require('colors');

// const fs = require('fs'); //? СИНХРОННЫЙ вариант
const fs = require('fs').promises; //! АСИНХРОННЫЙ вариант

const path = require('path');

// import { nanoid } from 'nanoid';
// const nanoid = require('nanoid');

const uniqid = require('uniqid');






//* Раскомментируй и запиши значение
const contactsPath = path.resolve('./db/contacts.json');
// console.log(`contactsPath:  ${contactsPath}`.red); //!
console.log("contactsPath:".red, contactsPath.green); //!





// TODO: ------------------------ Задокументировать каждую функцию ------------------------
//? Получаем ВСЕ КОНТАКТЫ (СИНХРОННЫЙ вариант)
function listContacts() {
    // fs.readFile('./db/contacts.json', 'utf8', (error, data) => {
    fs.readFile(contactsPath, 'utf8', (error, data) => {
        if (error) {
            console.error('Error read file contacts.json:'.red, error.red);
        }
        console.log("contacts.json:".yellow, data.blue);
    })
};

//? Получаем ОДИН КОНТАКТ (СИНХРОННЫЙ вариант)
// function getContactById(contactId) {
//     fs.readFile(contactsPath, 'utf8', (error, data) => {
//         if (error) {
//             console.error('Error read file contacts.json:'.red, error.red);
//         }
//         //! Получаем значение файла contacts.json ==> СТРОКА
//         console.log("contacts.json:".yellow, data.blue); //!
//         console.log("typeof data:".yellow, (typeof data).red);

//         //! ПАРСИМ и получаем значение файла contacts.json ==> МАССИВ ОБЪЕКТОВ
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


//! Получаем ОДИН КОНТАКТ (АСИНХРОННЫЙ вариант)
async function getContactById(contactId) {
    try {
        // const data = await fs.readFile('./package.json', 'utf8'); //! +++
        // console.log("JSON.parse(data).devDependencies:".yellow, JSON.parse(data).devDependencies); //! +++ { nodemon: '^2.0.20', npx: '^10.2.2' }
        // console.log("JSON.parse(data):".yellow, JSON.parse(data)); //! +++ РАБОТАЕТ!!!

        //! Получаем значение файла contacts.json ==> СТРОКА
        const data = await fs.readFile(contactsPath, 'utf8');
        console.log("contacts.json:".yellow, data.blue); //!
        console.log("typeof data:".yellow, (typeof data).red);

        //! ПАРСИМ и получаем значение файла contacts.json ==> МАССИВ ОБЪЕКТОВ
        const contactsParse = JSON.parse(data);
        console.log("contactsParse:".yellow, contactsParse); //!
        console.log("typeof contactsParse:".yellow, (typeof contactsParse).red);

        //! ПАРСИМ только один элемент МАССИВА (по индексу = contactId) и получаем из contacts.json ==> ОДИН ОБЪЕКТ
        console.log("contactId:", contactId);
        const contactsParseByContactId = JSON.parse(data)[contactId - 1];
        console.log("contactsParseByContactId:".yellow, contactsParseByContactId); //!
        console.log("typeof contactsParseByContactId:".yellow, (typeof contactsParseByContactId).red);

    } catch (error) {
        console.error('Error read file contacts.json:'.red, error.red);
    }
}



//! Удаляем ОДИН КОНТАКТ (АСИНХРОННЫЙ вариант)
async function removeContact(contactId) {
    try {
        // const data = await fs.readFile('./package.json', 'utf8'); //! +++
        // console.log("JSON.parse(data).devDependencies:".yellow, JSON.parse(data).devDependencies); //! +++ { nodemon: '^2.0.20', npx: '^10.2.2' }
        // console.log("JSON.parse(data):".yellow, JSON.parse(data)); //! +++ РАБОТАЕТ!!!

        //! Получаем значение файла contacts.json ==> СТРОКА
        const data = await fs.readFile(contactsPath, 'utf8');
        console.log("contacts.json:".yellow, data.blue); //!
        // console.log("typeof data:".yellow, (typeof data).red);

        //! ПАРСИМ и получаем значение файла contacts.json ==> МАССИВ ОБЪЕКТОВ
        const contactsParse = JSON.parse(data);
        console.log("contactsParse:".yellow, contactsParse); //!
        // console.log("typeof contactsParse:".yellow, (typeof contactsParse).red);

        //! ПАРСИМ только один элемент МАССИВА (по индексу = contactId) и получаем из contacts.json ==> ОДИН ОБЪЕКТ
        console.log("contactId:", contactId);
        const contactsParseByContactId = JSON.parse(data)[contactId - 1];
        console.log("contactsParseByContactId:".yellow, contactsParseByContactId); //!
        // console.log("typeof contactsParseByContactId:".yellow, (typeof contactsParseByContactId).red);

        //!!! УДАЛЯЕМ только один элемент МАССИВА (по индексу = contactId) и получаем  ==> НОВЫЙ МАССИВ ОБЪЕКТОВ
        const contactsParseNew = contactsParse.filter(contact => Number(contact.id) !== contactId);
        console.log("contactsParseNew:".yellow, contactsParseNew); //!


        //!!!  Преобразовываем НОВЫЙ МАССИВ ОБЪЕКТОВ в JSON и получаем  ==> НОВЫЙ JSON
        const contactsStringifyNewJSON = JSON.stringify(contactsParseNew);
        console.log("contactsStringifyNewJSON:".yellow, contactsStringifyNewJSON.gray); //!

        //!!!  Записываем НОВЫЙ JSON в файл и получаем  ==> НОВЫЙ JSON - файл
        // await fs.writeFile('./db/contactsNEW.json', contactsStringifyNewJSON, 'utf8'); //* - Записываем НОВЫЙ JSON в НОВЫЙ файл
        await fs.writeFile(contactsPath, contactsStringifyNewJSON, 'utf8'); //? - Записываем НОВЫЙ JSON в файл contacts.json
        // const contactsNEWjson = await fs.readFile('./db/contactsNEW.json', 'utf8'); //* - Читаем НОВЫЙ JSON файл
        const contactsNEWjson = await fs.readFile(contactsPath, 'utf8'); //? - Читаем файл contacts.json
        console.log("contactsNEW.json:".yellow, contactsNEWjson.blue); //!

    } catch (error) {
        console.error('Error read file contacts.json:'.red, error.red);
    }
}



async function addContact(name, email, phone) {
    //! Создаем НОВЫЙ КОНТАКТ ==> newContact
    const newContact = {
        // id: Date.now(),
        id: uniqid(),
        name,
        email,
        phone
    };
    console.log("newContact:".yellow, newContact); //!

    //! Получаем значение файла(ВСЕ КОНТАКТЫ) contacts.json ==> СТРОКА (ВСЕ КОНТАКТЫ)
    const data = await fs.readFile(contactsPath, 'utf8');
    console.log("contacts.json:".yellow, data.blue); //!
    // console.log("typeof data:".yellow, (typeof data).red);

    //! ПАРСИМ и получаем значение файла(ВСЕ КОНТАКТЫ) contacts.json ==> МАССИВ ОБЪЕКТОВ (ВСЕ КОНТАКТЫ)
    const contactsParse = JSON.parse(data);
    console.log("contactsParse:".yellow, contactsParse); //!
    // console.log("typeof contactsParse:".yellow, (typeof contactsParse).red);

    //! Добавляем в МАССИВ ОБЪЕКТОВ НОВЫЙ КОНТАКТ(newContact) ==> НОВЫЙ МАССИВ ОБЪЕКТОВ
    const newCоntactsParse = [...contactsParse, newContact];
    console.log("newCоntactsParse:".yellow, newCоntactsParse); //!


    //!!!  Преобразовываем НОВЫЙ МАССИВ ОБЪЕКТОВ в JSON и получаем  ==> НОВЫЙ JSON
    const newCоntactsStringifyNewJSON = JSON.stringify(newCоntactsParse);
    console.log("newCоntactsStringifyNewJSON:".yellow, newCоntactsStringifyNewJSON.gray); //!

    //!!!  Записываем НОВЫЙ JSON в файл и получаем  ==> НОВЫЙ JSON - файл
    // await fs.writeFile('./db/contactsNEW.json', newCоntactsStringifyNewJSON, 'utf8'); //* - Записываем НОВЫЙ JSON в НОВЫЙ файл
    await fs.writeFile(contactsPath, newCоntactsStringifyNewJSON, 'utf8'); //? - Записываем НОВЫЙ JSON в файл contacts.json
    // const contactsNEWjson = await fs.readFile('./db/contactsNEW.json', 'utf8'); //* - Читаем НОВЫЙ JSON файл
    const contactsNEWjson = await fs.readFile(contactsPath, 'utf8'); //? - Читаем файл contacts.json
    console.log("contactsNEW.json:".yellow, contactsNEWjson.blue); //!

}


//* =========================================================================================
//* Проверяем работу каждой функции:
// listContacts();

// getContactById(4);

// removeContact(8);

addContact("Test Contact", "Test.Contact@gmail.com", "(111) 222-334455");


//! +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//! Экспорт функций
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}
