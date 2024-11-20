'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation'; 
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import moment from 'moment/moment';

const ExpensesComp = ({ refreshData }) => {
    const { id } = useParams();  
    const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            amount: '',
        },
    });

    const [budgetData, setBudgetData] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { user } = useUser();

    const onSubmit = async (data) => {
        if (!user) {
            toast.error('User is not authenticated!');
            return;
        }

        const { name, amount } = data;
        try {
            const result = await db
                .insert(Expenses)
                .values({
                    name,
                    amount,
                    budgetId: id,  
                    createdBy: moment().format('DD-MMM-YYYY').toUpperCase()
                })
                .returning({ insertedId: Expenses.id });


            if (result) {
                console.log(result);
                setBudgetData(result);
                refreshData();
                toast.success('New Expense Added!');
                setIsDialogOpen(false);

                reset({
                    name: '',
                    amount: '',
                });
            }
        } catch (error) {
            console.error('Error creating expense:', error);
            toast.error('An error occurred while creating the expense.');
        }
    };

    return (
        <>
            <div
                onClick={() => setIsDialogOpen(true)}
                className="flex flex-col items-center justify-center text-zinc-300 bg-zinc-900 p-10 mt-8 rounded-md border-2 border-zinc-500 border-dashed cursor-pointer hover:border-zinc-50 hover:text-white"
            >
                <span className="text-2xl">+</span>
                <span>Create New Expense</span>
            </div>

            {isDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="text-zinc-300 bg-zinc-900 rounded-lg p-5 lg:w-1/3 shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-center">Create Expense</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Name Input */}
                            <div className="mb-2">
                                <label className="block text-sm font-medium p-2">Expense Name</label>
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{ required: 'Expense name is required' }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder="e.g., Home Decor"
                                            onChange={(e) => {
                                                field.onChange(e);
                                            }}
                                        />
                                    )}
                                />
                            </div>

                            {/* Amount Input */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium p-2">Expense Amount</label>
                                <Controller
                                    name="amount"
                                    control={control}
                                    rules={{ required: 'Expense amount is required' }}
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
                                >
                                    Add
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
        </>
    );
};

export default ExpensesComp;
