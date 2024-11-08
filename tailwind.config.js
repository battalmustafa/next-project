/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}", 

  ],
  theme: {
  	extend: {
  		colors: {
  			sidebarbg: '#363740',
  			mainBlue: '#3751FF',
  			mainBg: '#F7F8FC',
  			logoText: '#A4A6B3',
        textColor: '#2C3546',
		chartmobile: "#60a5fa", 
        chartdesktop: "#34d399", 
		badgetext: "#0A2ECC",
		textsecondary:"#9FA2B4",
		textMain: "#252733"
		
  		},
  		backgroundColor: {
  			mainBg: '#F7F8FC',
  			mainBlue: '#3751FF',
  			sidebarbg: '#363740',
			baggebg: '#C2DDFF'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
