import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Header/Navbar";
import Sidebar from "./components/Header/Sidebar";

function Layout() {
	return (
		<div className="h-screen flex flex-col"> 
			<Navbar /> 
			<div className="flex flex-1 min-h-0">
				<Sidebar />
				<main className="flex-1 overflow-y-auto">
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export default Layout;
