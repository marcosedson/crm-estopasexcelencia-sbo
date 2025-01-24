import React from "react";

interface FormInputProps {
    label: string;
    type: "text" | "number" | "date"; // Adicionamos os tipos aceitos
    name: string;
    value: string | number; // String para text e date, number para number
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    isTextArea?: boolean; // Identifica quando é textarea
    disabled?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
                                                 label,
                                                 type,
                                                 name,
                                                 value,
                                                 onChange,
                                                 placeholder,
                                                 isTextArea,
                                                 disabled,
                                             }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            {!isTextArea ? (
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="form-control"
                    disabled={disabled}
                />
            ) : (
                <textarea
                    id={name}
                    name={name}
                    value={value as string} // Garantimos que textarea sempre usa string
                    onChange={onChange}
                    placeholder={placeholder}
                    className="form-control"
                    disabled={disabled}
                ></textarea>
            )}
        </div>
    );
};

export default FormInput;