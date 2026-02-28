import { Controller, type Control, type FieldValues, type Path, type RegisterOptions } from "react-hook-form";
import styled from './DateInput.module.css';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useRef, useState } from "react";
import { dateMapper } from "../../../types/mapper/dateMapper";

interface DateInputProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    control: Control<T>;
    rules?: RegisterOptions<T, Path<T>>;
}

export const DateInput = <T extends FieldValues>(
    { label, name, control, rules }: DateInputProps<T>
) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className={styled.container} ref={containerRef}>
            <label className={styled.label}>{label}</label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field: { value, onChange } }) => (
                    <div className={styled.wrapper}>
                        <div
                            className={styled.input}
                            onClick={() => setIsOpen(!isOpen)}>
                            {value ? dateMapper.toFullDate(value) : '날짜를 선택하세요'}
                            {value && (
                                <button 
                                    className={styled.deleteButton}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onChange('')
                                    }}>
                                    삭제
                                </button>
                            )}
                        </div>
                        {isOpen && (
                            <div className={styled.calendarPopup}>
                                <Calendar
                                    calendarType='gregory'
                                    value={value || new Date()}
                                    tileClassName={({ date, view }) => {
                                        if (view === 'month' && date.getDay() === 6) {
                                            return styled.saturday;
                                        }
                                        return null;
                                    }}
                                    formatDay={(_, date) => date.getDate().toString()}
                                    onChange={(date) => {
                                        onChange(date);
                                        setIsOpen(false);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )}
            />
        </div>
    );
};

export default DateInput;