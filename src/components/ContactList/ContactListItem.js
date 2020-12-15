import DeleteButton from './DeleteButton';
import s from './ContactList.module.scss';

function ContactListItem({ info, onDeleteHandler }) {
  return (
    <li className={s.item}>
      <p className={s.wrap}>
        <span className={s.name}>{info.name}</span>
        <span className={s.phone}>{info.number}</span>
      </p>
      <DeleteButton handler={onDeleteHandler} />
    </li>
  );
}

export default ContactListItem;
