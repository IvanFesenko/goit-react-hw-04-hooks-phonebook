import styles from './Filter.module.css';

function Filter({ filter, onChangeFilter = () => {} }) {
  return (
    <div className={styles.container}>
      <label>
        Find Contacts by name
        <input
          type="text"
          className={styles.input}
          value={filter}
          onChange={e => onChangeFilter(e.target.value)}
        />
      </label>
    </div>
  );
}

export default Filter;
