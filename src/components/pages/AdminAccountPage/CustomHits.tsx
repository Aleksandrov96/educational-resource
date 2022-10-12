import React from 'react';
import { connectHits } from 'react-instantsearch-dom';

function Hits({ hits }: any) {
  return (
    hits.map((hit: any) => (
      <tr key={hit.objectID}>
        <td>{hit.objectID}</td>
        <td>{hit.email}</td>
      </tr>
    ))
  );
}

const CustomHits = connectHits(Hits);

export default CustomHits;
