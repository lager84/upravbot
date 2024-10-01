import React from 'react';
import { ASC } from '../../pages/registerUO/registerUO'
import sorting_asc from '../../img/sort_asc.png';
import sorting_desc from '../../img/sort_desc.png';

export const SortingControl = ({ label, onSort, value }) => {
    return (
      <div  onClick={onSort}>
        <div>
          <p>
            <span>{label}</span>
          </p>
          <img
            src={value.toLowerCase() === ASC ? sorting_asc : sorting_desc}
            alt={`Сортировать по : ${value}`}
            style={{ transform: value.toLowerCase() === ASC ? 'sorting_asc' : 'sorting_desc' }}
          />
        </div>
      </div>
    );
  };
  