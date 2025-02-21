import { FaPlus } from "react-icons/fa";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaMinus } from 'react-icons/fa';

const NumberInput = ({ onValueChange }: { onValueChange: (value: number) => void }) => {
    const [value, setValue] = useState<number>(1);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^\d*$/.test(newValue)) { // Accepter uniquement les chiffres
            setValue(Number(newValue) || 0);
            onValueChange(Number(newValue) || 0);
        }
    };

    const increment = () => {
        const newValue = value + 1;
        setValue(newValue);
        onValueChange(newValue);
    };

    const decrement = () => {
        const newValue = value > 0 ? value - 1 : 0;
        setValue(newValue);
        onValueChange(newValue);
    };

    return (
        <div className="flex items-center gap-1">
            <Button
                type="button"
                variant="outline"
                onClick={decrement}
                className="font-light text-foreground/60 text-sm px-1.5 duration-200 shadow-none"
            >
                <FaMinus />
            </Button>

            <Input
                type="text"
                value={value}
                onChange={handleInputChange}
                placeholder="Exp: 10"
                autoComplete="off"
                className="text-center font-semibold border-foreground max-w-20 appearance-none [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
            />

            <Button
                type="button"
                variant="outline"
                className="font-light bg-primary/20 hover:bg-primary/30 text-foreground/60 text-sm px-1.5 duration-200 shadow-none"
                onClick={increment}
            >
                <FaPlus />
            </Button>
        </div>
    );
};

export default NumberInput;
