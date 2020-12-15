import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { v4 as uid } from 'uuid';

import styles from './App.module.css';

import Contacts from './components/Contacts/Contacts';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const isUniqueContact = newName => {
    const index = contacts.findIndex(
      ({ name }) => name.toLowerCase() === newName.toLowerCase().trim(),
    );
    return index === -1 ? true : false;
  };

  const addContact = ({ name, number }) => {
    if (!name.trim()) {
      alert(`Wrong name`);
      return;
    }
    if (isUniqueContact(name)) {
      const newContact = { id: uid(), name, number };
      const sortedContacts = [...contacts, newContact].sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        return 1;
      });
      setContacts(sortedContacts);
    } else {
      alert(`${name} is already in contacts`);
    }
  };

  const deleteContact = id => {
    const newContacts = contacts.filter(contact => contact.id !== id);
    setContacts(newContacts);
  };

  const filteredList = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addContact} />
      {contacts.length > 0 ? (
        <Contacts>
          <Filter filter={filter} onChangeFilter={setFilter} />
          <ContactList
            contacts={filter ? filteredList() : contacts}
            onDeleteHandler={deleteContact}
          />
        </Contacts>
      ) : (
        <p>Your phonebook is empty at this moment</p>
      )}
    </div>
  );
}

export default App;
