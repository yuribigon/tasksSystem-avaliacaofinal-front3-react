import { TextField } from '@mui/material';
import React, { KeyboardEventHandler } from 'react';

export type Name = 'name' | 'email' | 'password' | 'confirmPassword' | 'title' | 'description' | 'newTitle' | 'newDescription';

interface InputDefaultProp {
    name: Name;
    type: string;
    label: string;
    value: string;
    color: "error" | "success";
    handleChange: (value: string, name: Name) => void;
    onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
}


const InputDefault: React.FC<InputDefaultProp> = ({
    name, 
    type, 
    label, 
    value,
    color,
    handleChange,
    onKeyDown
}) => {
  return (
    <>
      <TextField
        id={name} 
        name={name} 
        label={label} 
        type={type} 
        value={value} 
        color= {color}
        onChange={(e) => handleChange(e.target.value, name)}
        onKeyDown={onKeyDown}
      />   
    </>
  );
};

export default InputDefault;
