import React from 'react';

const optionsReder = (optionArray) => (optionArray.map((currentOption) => (
  <option key={ currentOption } value={ currentOption }>
    {currentOption}
  </option>
)));

export default optionsReder;
