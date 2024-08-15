'use client'

type CheckboxProp = {
  isSelected: boolean,
  onChange: () => void
}

export default function Checkbox({ isSelected, onChange}: CheckboxProp) {
  return (
    <input type="checkbox" 
        className="checkbox checkbox-primary"
        checked={isSelected}
        onChange={() => onChange()}/>
  )
}