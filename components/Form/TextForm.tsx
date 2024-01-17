import React from 'react'
interface formProps {
  formName: string
  formValue: string
  formChange: string
}
const TextForm = ({ formName, formValue, formChange }: formProps) => {
  return (
    <div>
      <label className='my-3 block text-black dark:text-white'>
        {formName}
      </label>
      <input
        type='text'
        value={formValue}
        onChange={formChange}
        placeholder={formName}
        className='w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input'
      />
    </div>
  )
}

export default TextForm
