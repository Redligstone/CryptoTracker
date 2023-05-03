import React from 'react'

function SelectButton({children, selected, onClick}) {
  return (
    <span className={ selected ? 'chart__button-item-selected' : 'chart__button-item' } onClick={onClick}>{children}</span>
  )
}

export default SelectButton