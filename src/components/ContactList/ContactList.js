import ContactListItem from './ContactListItem';
import s from './ContactList.module.scss';

function ContactList({ contacts, onDeleteHandler }) {
  return (
    contacts.length > 0 && (
      <ul className={s.list}>
        {contacts.map(({ id, name, number }) => {
          return (
            <ContactListItem
              info={{ name, number }}
              key={id}
              onDeleteHandler={() => onDeleteHandler(id)}
            />
          );
        })}
      </ul>
    )
  );
}

export default ContactList;
