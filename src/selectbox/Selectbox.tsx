import { FC, useEffect } from "react";
import { Select } from "antd";
import { ISelectItem } from "../interfaces/common";

import styles from "./Selectbox.module.scss";

const { Option } = Select;

interface IFilterProps {
  onChange: (selected: ISelectItem["id"] | undefined) => void;
  options: ISelectItem[];
  name: string;
  // name must be unique string
  value?: number;
  allowClear?: boolean;
  label: string
}

const SelectBox: FC<IFilterProps> = ({
  options,
  onChange,
  name,
  value,
  allowClear,
  label
}) => {
  const savedValueName = `selectbox_${name}`;

  useEffect(() => {
    const savedSelectBoxValue = localStorage.getItem(savedValueName);
    savedSelectBoxValue && onChange(parseInt(savedSelectBoxValue));
  }, []);

  const handleChange = (value: number | undefined) => {
    if (value !== undefined) {
      localStorage.setItem(savedValueName, value.toString());
    } else {
      localStorage.removeItem(savedValueName);
    }
    onChange(value);
  };

  return (
    <div className={styles.selectbox}>
      <span>{label}</span>
      <Select
        className={styles.selectbox__input}
        value={value}
        allowClear={allowClear}
        onChange={handleChange}
        
      >
        {options.map((option, index) => {
          return (
            <Option key={index} value={option.id}>
              {option.name}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default SelectBox;
