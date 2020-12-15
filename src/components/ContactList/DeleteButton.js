import s from './ContactList.module.scss';

function DeleteButton({ handler }) {
  return (
    <button className={s.btn} onClick={handler}>
      &#10008;
    </button>
  );
}

export default DeleteButton;
