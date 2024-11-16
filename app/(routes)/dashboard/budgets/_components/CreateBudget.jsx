'use client';

import React, { use, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import EmojiPicker from 'emoji-picker-react';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';

const CreateBudget = () => {
    const [emojiIcon, setEmojiIcon] = useState('😊');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const user = useUser()

    const onCreateBudget = async () => {
        const result = await db.insert(Budgets).values({
            name: name,
            amount: amount,
            icon: emojiIcon,
            // createdBy : user.firstName,
            createdBy: 'user',
        }).returning({ insertedId: Budgets.id });

        if (result) {
            toast('New Budget Created !')
        }
    }

    return (
        <div className="text-zinc-300">
            <Dialog>
                <DialogTrigger asChild>
                    <p className="flex flex-col items-center text-zinc-300 bg-zinc-900 p-10 mt-7 rounded-md border-2 border-dashed cursor-pointer hover:.dark-glow">
                        <span className="text-2xl">+</span>
                        <span>Create New Budget</span>
                    </p>
                </DialogTrigger>
                <DialogContent className="fixed inset-0 m-h-1/3 sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
                    </DialogHeader>
                    <div className="mt-5">
                        <Button
                            variant="outline"
                            size="lg"
                            className="text-xl"
                            onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                        >
                            {emojiIcon}
                        </Button>
                        {openEmojiPicker && (
                            <div className="absolute z-50 p-2">
                                <EmojiPicker
                                    onEmojiClick={(e) => {
                                        setEmojiIcon(e.emoji);
                                        setOpenEmojiPicker(false);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className='my-1'>Budget Name</h2>
                        <Input placeholder="e.g. Home Decor" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <h2 className='my-1'>Budget Amount</h2>
                        <Input type="number" placeholder="e.g. 5000$" onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <DialogFooter>

                        <DialogClose asChild>
                            <Button
                                disabled={!(name && amount)}
                                onClick={() => onCreateBudget()}
                                type="submit">Create Budget </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateBudget;
