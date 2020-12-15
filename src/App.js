import React, { Component } from 'react';
import { v4 as uid } from 'uuid';

import styles from './App.module.css';

import Contacts from './components/Contacts/Contacts';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const DBContacts = localStorage.getItem('contacts');
    if (DBContacts) {
      this.setState({ contacts: JSON.parse(DBContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  isUniqueContact(newName) {
    const { contacts } = this.state;
    const index = contacts.findIndex(
      ({ name }) => name.toLowerCase() === newName.toLowerCase().trim(),
    );
    return index === -1 ? true : false;
  }

  addContact = ({ name, number }) => {
    if (!name.trim()) {
      alert(`Wrong name`);
      return;
    }

    if (this.isUniqueContact(name)) {
      const { contacts } = this.state;
      const newContact = { id: uid(), name, number };
      this.setState({
        contacts: contacts.concat([newContact]).sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
          return 1;
        }),
      });
    } else {
      alert(`${name} is already in contacts`);
    }
  };

  onChangeFilter = value => {
    this.setState({
      filter: value,
    });
  };

  onDeleteHandler = id => {
    const { contacts } = this.state;
    this.setState({
      contacts: contacts.filter(contact => contact.id !== id),
    });
  };

  filteredList = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    const { filter, contacts } = this.state;
    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        {contacts.length > 0 ? (
          <Contacts>
            <Filter filter={filter} onChangeFilter={this.onChangeFilter} />
            <ContactList
              contacts={filter ? this.filteredList() : contacts}
              onDeleteHandler={this.onDeleteHandler}
            />
          </Contacts>
        ) : (
          <p>Your phonebook is empty at this moment</p>
        )}
      </div>
    );
  }
}

export default App;
