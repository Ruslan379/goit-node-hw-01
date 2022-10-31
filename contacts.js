require('colors');
const fs = require('fs');
const path = require('path');


//* Раскомментируй и запиши значение
const contactsPath = path.resolve('./db/contacts.json');
// console.log(`contactsPath:  ${contactsPath}`.red); //!
console.log("contactsPath:".red, contactsPath.green); //!


// TODO: задокументировать каждую функцию
function listContacts() {
    fs.readFile('./db/contacts.json', 'utf8', (error, data) => {
        if (error) {
            console.error('Error read file contacts.json:'.red, error.red);
        }
        console.log("contacts.json:".yellow, data.blue);
    })
};



function getContactById(contactId) {
    // ...твой код
}



function removeContact(contactId) {
    // ...твой код
}



function addContact(name, email, phone) {
    // ...твой код
}



//* Проверяем работу каждой функции:
listContacts();

// getContactById(contactId);

// removeContact(contactId);

// addContact(name, email, phone);



//! Экспорт функций
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}