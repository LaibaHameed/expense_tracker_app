import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="heading">Monthly Expense Report</h1>
      <p>Your total expenses are: <span className="numeric">$1,234</span></p>
      <p>Track your expenses with ease using our tracker.</p>
    </div>
  );
}
