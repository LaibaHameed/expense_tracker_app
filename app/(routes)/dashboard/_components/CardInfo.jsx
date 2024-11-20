import { useUser } from '@clerk/nextjs';
import { HandCoins, Receipt, Wallet } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const CardInfo = ({ budgetList }) => {
    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);
    const { isLoaded, user } = useUser();
    const [userEmail, setUserEmail] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 

    // Fetch user email on load
    useEffect(() => {
        const fetchUserEmail = async () => {
            if (isLoaded && user) {
                const email = user?.primaryEmailAddress?.emailAddress || "Email not available";
                setUserEmail(email);
            }
        };
        fetchUserEmail();
    }, [isLoaded, user]);

    // Recalculate card info whenever budgetList or userEmail changes
    useEffect(() => {
        if (budgetList) {
            setIsLoading(true);  
            if (budgetList.length > 0) {
                calculateCardInfo(budgetList);
            } else {
                setTotalBudget(0);  
                setTotalSpend(0);   
            }
            setIsLoading(false); 
        }
    }, [budgetList, userEmail]);

    const calculateCardInfo = (budgetList) => {
        console.log("Budget List:", budgetList);  
        
        let total_budget = 0;
        let total_spend = 0;  
        
        budgetList.forEach(element => {
            const amount = parseFloat(element.amount) || 0;  
            total_spend = parseFloat(element.totalSpend) || 0;  
            total_budget += amount;
            total_spend += total_spend;  
        });

        console.log("Total budget ", total_budget, "Total spend ", total_spend);
        setTotalBudget(total_budget);  
        setTotalSpend(total_spend);  
    };

    return (
        <div>
            {/* If data is loading, show skeleton */}
            {isLoading ? (
                <div className='mt-7 grid grid-cols-1 lg:grid-cols-2 md:gap-3 xl:grid-cols-3 xl:gap-5'>
                    {[1, 2, 3].map((item, index) => (
                        <div className=" p-5 mt-7 w-full bg-zinc-900 rounded-lg h-[150px] animate-pulse" key={index}>
                            {/* Skeleton loader */}
                        </div>
                    ))}
                </div>
            ) : (
                // If no budgets are available, display a message or empty card
                budgetList.length === 0 ? (
                    <div className='mt-7 grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-3 xl:grid-cols-3 xl:gap-5'>
                        <div className='p-7 rounded-lg bg-zinc-900 flex items-center justify-between'>
                            <div>
                                <h2 className='text-sm  my-3'>Total Budget</h2>
                                <h2 className='text-2xl font-bold'>$0.00</h2>
                            </div>
                            <HandCoins className='font-bold bg-blue-600 h-14 w-14 rounded-full p-3' />
                        </div>
                        <div className='p-7 rounded-lg bg-zinc-900 flex items-center justify-between'>
                            <div>
                                <h2 className='text-sm my-3'>Total Spend</h2>
                                <h2 className='text-2xl font-bold'>$0.00</h2>
                            </div>
                            <Receipt className='font-bold bg-blue-600 h-14 w-14 rounded-full p-3' />
                        </div>
                        <div className='p-7 rounded-lg bg-zinc-900 flex items-center justify-between'>
                            <div>
                                <h2 className='text-sm  my-3'>No of Budgets</h2>
                                <h2 className='text-2xl font-bold'>0</h2>
                            </div>
                            <Wallet className='font-bold bg-blue-600 h-14 w-14 rounded-full p-3' />
                        </div>
                    </div>
                ) : (
                    // If there are budgets, show the actual budget info
                    <div className='mt-7 grid grid-cols-1 lg:grid-cols-2 md:gap-3 xl:grid-cols-3 xl:gap-5'>
                        <div className='p-7 my-4 rounded-lg bg-zinc-900 flex items-center justify-between'>
                            <div>
                                <h2 className='text-sm  my-3'>Total Budget</h2>
                                <h2 className='text-2xl font-bold'>${totalBudget.toFixed(2)}</h2> {/* Display with two decimal places */}
                            </div>
                            <HandCoins className='font-bold bg-blue-600 h-14 w-14 rounded-full p-3' />
                        </div>
                        <div className='p-7 my-4 rounded-lg bg-zinc-900 flex items-center justify-between'>
                            <div>
                                <h2 className='text-sm my-3'>Total Spend</h2>
                                <h2 className='text-2xl font-bold'>${totalSpend.toFixed(2)}</h2> {/* Display with two decimal places */}
                            </div>
                            <Receipt className='font-bold bg-blue-600 h-14 w-14 rounded-full p-3' />
                        </div>
                        <div className='p-7 my-4 rounded-lg bg-zinc-900 flex items-center justify-between'>
                            <div>
                                <h2 className='text-sm  my-3'>No of Budgets</h2>
                                <h2 className='text-2xl font-bold'>{budgetList.length}</h2>
                            </div>
                            <Wallet className='font-bold bg-blue-600 h-14 w-14 rounded-full p-3' />
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default CardInfo;
