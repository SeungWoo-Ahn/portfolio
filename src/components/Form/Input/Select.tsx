import type { UseFormRegisterReturn } from 'react-hook-form';
import styled from './Select.module.css';

interface SelectProps<T> {
    options: readonly T[];
    valueKey: keyof T;
    labelKey: keyof T;
    registration: UseFormRegisterReturn;
}

const Select = <T,>({
    options,
    valueKey,
    labelKey,
    registration,
}: SelectProps<T>) => {
    return (
        <div className={styled.container}>
            {options.map((option) => {
                const value = String(option[valueKey]);
                const label = String(option[labelKey]);
                return (
                    <label key={value}>
                        <input
                            className={styled.hiddenRadio}
                            type='radio'
                            value={value}
                            {...registration}
                        />
                        <span className={styled.button}>{label}</span>
                    </label>
                );
            })}
        </div>

    );
};

export default Select;