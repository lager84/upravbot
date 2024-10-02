import React from 'react';
import { ASC } from '../../pages/registerUO/registerUO'
import sorting_asc from '../../img/sort_asc.png';
import sorting_desc from '../../img/sort_desc.png';
import styles from "../sorting-control/sorting-control.module.css"

export const SortingControl = ({ label, onSort, value }) => {
    return (
    
        <div className={styles.divRoot} onClick={onSort}>
          <p>
            <span className="font14b mb-0 mr-2">{label}</span>
          </p>
          <img
            src={value.toLowerCase() === ASC ? sorting_asc : sorting_desc}
            alt={`Сортировать по : ${value}`}
            style={{ transform: value.toLowerCase() === ASC ? 'sorting_asc' : 'sorting_desc' }}
          />
        </div>
    );
  };
  