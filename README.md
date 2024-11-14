npx create-next-app@latest

What is your project named? ... expense_tracker_app
√ Would you like to use TypeScript? ... No 
√ Would you like to use ESLint? ... No 
√ Would you like to use Tailwind CSS? ...  Yes
√ Would you like your code inside a `src/` directory? ... No 
√ Would you like to use App Router? (recommended) ... Yes
√ Would you like to use Turbopack for next dev? ... No 
√ Would you like to customize the import alias (@/* by default)? ... No 


npx shadcn@latest init -d
npx shadcn@latest add button

npm run dev

add fonts
npm install @next/font

import { Inter, Montserrat, Outfit } from "next/font/google";
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

<body className={ `${inter.variable} ${montserrat.variable} ${outfit.variable} antialiased` } >
    {children}
</body>

add in global css