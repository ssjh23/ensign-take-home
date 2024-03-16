import shoppingCartIcon from '../assets/cart.svg';

let value = 10;
export default function NavBar() {
    //Sticky nav bar that appears at the top of the page
    return (
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-4">
                    <a href="/" className="text-lg font-semibold tracking-wider text-gray-800 dark:text-white uppercase">Ensign Shopping</a>
                </div>
                <div className='flex flex-row relative w-auto'>
                    <img src={shoppingCartIcon} alt="cart" className="h-10 w-10 z-0" />
                    <div className="absolute rounded-full bg-white text-center z-10 left-7 px-1 md: text-sm">
                        {value}
                    </div>
                </div>
            </div>
        </nav>

    )
}