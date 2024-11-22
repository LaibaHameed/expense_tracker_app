'use client'
import React, { useEffect, useState } from 'react';
import CreateBudget from './CreateBudget';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import BudgetItem from './BudgetItem';

const BudgetList = () => {
  const { isLoaded, user } = useUser();
  const [userEmail, setUserEmail] = useState(null);
  const [budgetList, setBudgetList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchUserEmail = async () => {
      if (isLoaded && user) {
        const email = user?.primaryEmailAddress?.emailAddress || "Email not available";
        setUserEmail(email);
      }
    };
    fetchUserEmail();
  }, [isLoaded, user]);

  // Fetch budget list when userEmail is updated
  const getBudgetList = async () => {
    if (!userEmail) return;

    setIsLoading(true);  

    try {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`SUM(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, userEmail))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));

      setBudgetList(result);
    } catch (error) {
      console.error("Error fetching budget list:", error);
    } finally {
      setIsLoading(false);  
    }
  };

  useEffect(() => {
    getBudgetList();
  }, [userEmail]);

  return (
    <div className='text-zinc-300 mt-7'>
      <div className='grid grid-cols-1 lg:grid-cols-2 md:gap-3 xl:grid-cols-3 xl:gap-5'>
        <CreateBudget refreshData={() => getBudgetList()} />
        
        {/* Loading Skeleton */}
        {isLoading ? (
          [1, 2, 3, 4, 5].map((item, index) => (
            <div className=" p-5 mt-7 w-full bg-zinc-900 rounded-lg h-[150px] animate-pulse" key={index}>
              {/* Skeleton loader */}
            </div>
          ))
        ) : (
          // If no budgets are available, display a message or empty cards
          budgetList.length === 0 ? (
            <div className='className="flex flex-col items-center text-zinc-300 bg-zinc-900 p-10 mt-8 rounded-lg text-center h-[140px] flex justify-center'>
              <h4 className='text-zinc-400'>No Budgets Available</h4>
            </div>
          ) : (
            // If there are budgets, render them
            budgetList.map((budget, i) => (
              <BudgetItem budget={budget} key={i} />
            ))
          )
        )}
      </div>
    </div>
  );
};

export default BudgetList;
