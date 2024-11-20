'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PenBoxIcon } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import EmojiPicker from 'emoji-picker-react';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { toast } from 'sonner';
import { eq } from 'drizzle-orm';

const EditBudget = ({ budgetInfo, refreshData }) => {
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon || '');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isNameUnique, setIsNameUnique] = useState(true);

    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: budgetInfo?.name || '',
            amount: budgetInfo?.amount || 0,
        },
    });

    useEffect(() => {
        if (budgetInfo) {
            reset({
                name: budgetInfo?.name || '',
                amount: budgetInfo?.amount || 0,
            });
            setEmojiIcon(budgetInfo?.icon || '');
        }
    }, [budgetInfo, reset]);

    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const checkBudgetName = async (budgetName) => {
        if (!budgetName) return;
        try {
            const existingBudget = await db
                .select()
                .from(Budgets)
                .where(eq(Budgets.name, budgetName))
                .execute();

            setIsNameUnique(existingBudget.length === 0);
        } catch (error) {
            console.error("Error checking budget name:", error);
            setIsNameUnique(true);
        }
    };

    const debouncedCheckBudgetName = useCallback(
        debounce(async (budgetName) => {
            await checkBudgetName(budgetName);
        }, 500),
        []
    );

    const handleNameChange = (e) => {
        const inputName = e.target.value;
        setValue('name', inputName);
        debouncedCheckBudgetName(inputName);
    };

    const onSubmit = async (data) => {
        const { name, amount } = data;
        try {
            const result = await db
                .update(Budgets)
                .set({
                    name,
                    amount,
                    icon: emojiIcon,
                })
                .where(eq(Budgets.id, budgetInfo?.id))
                .returning();

            if (result) {
                toast.success('Budget Updated!');
                setIsDialogOpen(false);
                refreshData();
            }
        } catch (error) {
            console.error("Error updating budget:", error);
            toast.error('An error occurred while updating the budget.');
        }
    };

    return (
        <>
            <Button className="flex gap-2 bg-blue-600 shadow-sm hover:shadow-zinc-400" onClick={() => setIsDialogOpen(true)}>
                <PenBoxIcon /> Edit
            </Button>
            {isDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="text-zinc-300 bg-zinc-900 rounded-lg p-5 lg:w-1/3 shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-center">Edit Budget</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4 relative">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                                    className="py-4 text-zinc-300 bg-zinc-900 text-3xl"
                                >
                                    <span>{emojiIcon}</span>
                                </Button>

                                {openEmojiPicker && (
                                    <div className="absolute z-50 mt-2 p-2 border rounded bg-white shadow-lg">
                                        <EmojiPicker
                                            onEmojiClick={(e) => {
                                                setEmojiIcon(e.emoji);
                                                setOpenEmojiPicker(false);
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="mb-2">
                                <label className="block text-sm font-medium p-2">Budget Name</label>
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{ required: "Budget name is required" }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder="e.g., Home Decor"
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleNameChange(e);
                                            }}
                                        />
                                    )}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                {!isNameUnique && <p className="text-red-500 text-sm">Budget name already exists!</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium p-2">Budget Amount</label>
                                <Controller
                                    name="amount"
                                    control={control}
                                    rules={{ required: "Budget amount is required" }}
                                    render={({ field }) => <Input {...field} type="number" placeholder="e.g., 5000" />}
                                />
                                {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button onClick={() => setIsDialogOpen(false)} type="button" className="bg-gray-300 text-black px-4 py-2 rounded hover:text-zinc-200 hover:bg-slate-500">
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-blue-600 text-zinc-200 px-4 py-2 rounded hover:bg-blue-800"
                                    disabled={!isNameUnique}
                                >
                                    Update
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditBudget;
