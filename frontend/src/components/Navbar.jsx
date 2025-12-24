import { Link, useResolvedPath } from "react-router";
import { ShoppingCartIcon, ShoppingBagIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector.jsx";
const Navbar = () => {
	const { pathname } = useResolvedPath();
	const isHome = pathname === "/";
	return (
		<div
			className='bg-base-100/80 backdrop-blur-lg
			border-b border-base-content/10 sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto'>
				<div className='navbar px-4 min-h-16 justify-between'>
					{/* Logo / Brand Name */}
					<div className='flex-1 lg:flex-none'>
						<Link
							to='/'
							className='hover:opacity:80 transition-opacity'>
							<div className='flex items-center gap-2'>
								<ShoppingCartIcon className='size-9 text-primary' />
								<span
									className='font-bold font-mono tracking-widest 
									text-2xl text-transparent bg-linear-to-r from-primary to-secondary bg-clip-text'>
									Product Store
								</span>
							</div>
						</Link>
					</div>

					{/* Navigation Links */}
					<div className='flex items-center gap-4'>
						<ThemeSelector />
						{isHome && (
							<div className='indicator'>
								<div className='p-2 rounded-full hover:bg-base-100 transition-colors'>
									<ShoppingBagIcon className='size-5' />
									<span className='badge badge-sm badge-primary indicator-item'>
										0
									</span>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default Navbar;
