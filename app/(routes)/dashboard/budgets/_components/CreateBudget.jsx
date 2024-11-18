'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import EmojiPicker from 'emoji-picker-react';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { eq } from 'drizzle-orm';

const CreateBudget = ({refreshData}) => {
    const [emojiIcon, setEmojiIcon] = useState('😊');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    const [isNameUnique, setIsNameUnique] = useState(true);
    const { isLoaded, user } = useUser();

    // Initialize useForm with default values
    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            name: '', 
            amount: '', // Default to an empty string
        },
    });

    // Fetch user email
    useEffect(() => {
        const fetchUserEmail = async () => {
            if (isLoaded && user) {
                const email = user?.primaryEmailAddress?.emailAddress || "Email not available";
                setUserEmail(email);
            }
        };
        fetchUserEmail();
    }, [isLoaded, user]);

    // Debounce function
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    // Check if budget name is unique
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

    // Handle name change
    const handleNameChange = (e) => {
        const inputName = e.target.value;
        setValue('name', inputName);
        debouncedCheckBudgetName(inputName);
    };

    // Form submission logic
    const onSubmit = async (data) => {
        const { name, amount } = data;
        try {
            const result = await db
                .insert(Budgets)
                .values({
                    name,
                    amount,
                    icon: emojiIcon,
                    createdBy: userEmail,
                })
                .returning({ insertedId: Budgets.id });

            if (result) {
                refreshData()
                toast.success('New Budget Created!');
                setIsDialogOpen(false); 
            }
        } catch (error) {
            console.error("Error creating budget:", error);
            toast.error('An error occurred while creating the budget.');
        }
    };

    return (
        <div>

            <p onClick={() => setIsDialogOpen(true)} className="flex flex-col items-center text-zinc-300 bg-zinc-900 p-10 mt-8 rounded-md border-2 border-zinc-500 border-dashed cursor-pointer hover:border-zinc-50 hover:text-white">
                <span className="text-2xl">+</span>
                <span>Create New Budget</span>
            </p>

            {isDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="text-zinc-300 bg-zinc-900 rounded-lg p-5 lg:w-1/3 shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-center">Create Budget</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Emoji Picker */}
                                <div className="mb-4 relative">
                                    {/* Emoji Button */}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setOpenEmojiPicker(!openEmojiPicker)} 
                                        className="py-4 text-zinc-300 bg-zinc-900 text-3xl"
                                    >
                                        <span>{emojiIcon}</span>
                                    </Button>

                                    {/* Emoji Picker */}
                                    {openEmojiPicker && (
                                        <div className="absolute z-50 mt-2 p-2 border rounded bg-white shadow-lg">
                                            <EmojiPicker
                                                onEmojiClick={(e) => {
                                                    setEmojiIcon(e.emoji); // Update emoji
                                                    setOpenEmojiPicker(false); // Close picker
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                            {/* Name Input */}
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
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                                {!isNameUnique && (
                                    <p className="text-red-500 text-sm">
                                        Budget name already exists!
                                    </p>
                                )}
                            </div>

                            {/* Amount Input */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium p-2">Budget Amount</label>
                                <Controller
                                    name="amount"
                                    control={control}
                                    rules={{ required: "Budget amount is required" }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="number"
                                            placeholder="e.g., 5000"
                                        />
                                    )}
                                />
                                {errors.amount && (
                                    <p className="text-red-500 text-sm">{errors.amount.message}</p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end space-x-2">
                                <Button
                                    onClick={() => setIsDialogOpen(false)}
                                    type="button"
                                    className="bg-gray-300 text-black px-4 py-2 rounded hover:text-zinc-200 hover:bg-slate-500"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-blue-600 text-zinc-200 px-4 py-2 rounded hover:bg-blue-800"
                                    disabled={!isNameUnique}
                                >
                                    Create
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateBudget;
