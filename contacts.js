require('colors');
const fs = require('fs').promises;
const path = require('path');
// let data = "пустая строка";


//* Раскомментируй и запиши значение
const contactsPath = path.resolve('./db/contacts.json');
// console.log(`contactsPath:  ${contactsPath}`.red); //!
console.log("contactsPath:".red, contactsPath.green); //!


// TODO: задокументировать каждую функцию
function listContacts() {
    // fs.readFile('./db/contacts.json', 'utf8', (error, data) => {
    fs.readFile(contactsPath, 'utf8', (error, data) => {
        if (error) {
            console.error('Error read file contacts.json:'.red, error.red);
        }
        console.log("contacts.json:".yellow, data.blue);
    })
};



async function getContactById(contactId) {
    try {
        // const data = await fs.readFile('./package.json', 'utf8'); //! +++
        // console.log("JSON.parse(data).devDependencies:".yellow, JSON.parse(data).devDependencies); //! +++ { nodemon: '^2.0.20', npx: '^10.2.2' }
        // console.log("JSON.parse(data):".yellow, JSON.parse(data)); //! +++ РАБОТАЕТ!!!

        const data = await fs.readFile(contactsPath, 'utf8');
        console.log("contacts.json:".yellow, data.blue); //!
        console.log("typeof data:".yellow, (typeof data).red);

        // const contactsArr = data.split("");
        // console.log("contactsArr:".yellow, contactsArr); //!

        const contactsParse = JSON.parse(data);
        console.log("contactsParse:".yellow, contactsParse); //!
        console.log("typeof contactsParse:".yellow, (typeof contactsParse).red);

        console.log("contactId:", contactId);
        const contactsParseByContactId = JSON.parse(data)[contactId];
        console.log("contactsParseByContactId:".yellow, contactsParseByContactId); //!
        console.log("typeof contactsParseByContactId:".yellow, (typeof contactsParseByContactId).red);

    } catch (error) {
        console.error('Error read file contacts.json:'.red, error.red);
    }


    // fs.readFile(contactsPath, 'utf8', (error, data) => {
    //     if (error) {
    //         console.error('Error read file contacts.json:'.red, error.red);
    //     }
    //     console.log("contacts.json:".yellow, data.blue);
    //     // const contactsParse = JSON.parse(data);
    //     // console.log("contactsParse:".yellow, contactsParse.blue);
    //     console.log("contactsParse:".yellow, JSON.parse(data).blue);
    // })
}




function removeContact(contactId) {
    // ...твой код
}



function addContact(name, email, phone) {
    // ...твой код
}



//* Проверяем работу каждой функции:
// listContacts();

getContactById(4);

// removeContact(contactId);

// addContact(name, email, phone);



//! Экспорт функций
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}