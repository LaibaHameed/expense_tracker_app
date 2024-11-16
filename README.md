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

*****************************************************************
landing page

app/page.js
app/_components/Header.js
public/logo.svg



logoipsum
haperUI (banner page)

*****************************************************************
authentication

get started --> authentication(clerk authentication) ---> user dashboard 
public route sign-in sign-up home

*****************************************************************
side bar of dashboard:
const path = usePathname();
    useEffect(() => {
        console.log(path);
    }, [])
    {menuList.map((menuItem, index) => (
      <Link href={menuItem.path} key={index}>
        <h4 className={`flex gap-2 items-center text-center text-zinc-400 p-5 mb-2 cursor-pointer hover:text-blue-500 hover:bg-zinc-900 rounded-md ${path == menuItem.path && 'text-blue-600 bg-zinc-900 '}`} >
          {menuItem.icon}
          {menuItem.name}
        </h4>
      </Link>              
    ) ) }

*****************************************************************

Backend setup
Drizzal ORM -> Postgre -> Neon

npm i drizzle-orm @neondatabase/serverless --legacy-peer-deps
npm i -D drizzle-kit --legacy-peer-deps

dbConfig.js file
<!-- Drizzle <> Neon Postgres -->
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

go to Neon web and sign-up create project and database and from dashboard connection string

configure the drizzle