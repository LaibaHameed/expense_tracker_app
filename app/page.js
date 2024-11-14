import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <div>
      <Header />
      {/* <h1 className="heading">Monthly Expense Report</h1>
      <p>Your total expenses are: <span className="numeric">$1,234</span></p>
      <p>Track your expenses with ease using our tracker.</p>
      <div className="bg-background text-foreground p-4">
        <h1 className="text-primary">Hello, Dark Mode!</h1>
        <p className="text-muted-foreground">This is a test paragraph.</p>
      </div> */}

      <Hero/>

    </div>
  );
}
