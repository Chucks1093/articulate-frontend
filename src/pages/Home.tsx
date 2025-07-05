import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";
import { Outlet } from "react-router";

const Home: React.FC = () => {
	return (
		<div className='relative '>
			<Header />
			<Hero />
			<Outlet />
		</div>
	);
};

export default Home;
