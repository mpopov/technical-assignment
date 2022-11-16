import styles from './filters.module.css';

interface FiltersProps {
  onSearchChange: (search: string) => void;
  onDescChange?: (desc: boolean) => void;
}

function Filters({ onSearchChange, onDescChange }: FiltersProps) {
  return (
    <div className={styles.filters}>
      {onDescChange && (
        <div className={styles.sorting}>
          <input type='button' value='▲' onClick={() => onDescChange(false)} />
          <input type='button' value='▼' onClick={() => onDescChange(true)} />
        </div>
      )}
      <div className={styles.search}>
        <input type='text' placeholder='Search' onChange={(e) => onSearchChange(e.target.value)} />
      </div>
    </div>
  );
}

export default Filters;
