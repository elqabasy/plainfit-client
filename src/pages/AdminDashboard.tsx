import React from "react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-muted flex">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary text-secondary-foreground flex flex-col p-6 border-r border-border">
        <h2 className="text-xl font-bold mb-8 tracking-tight">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <a href="#overview" className="hover:bg-secondary-foreground/10 rounded px-3 py-2 transition-colors">Overview</a>
          <a href="#users" className="hover:bg-secondary-foreground/10 rounded px-3 py-2 transition-colors">Users</a>
          <a href="#orders" className="hover:bg-secondary-foreground/10 rounded px-3 py-2 transition-colors">Orders</a>
          <a href="#products" className="hover:bg-secondary-foreground/10 rounded px-3 py-2 transition-colors">Products</a>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard Overview</h1>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded shadow hover:bg-primary-hover transition-colors">Logout</button>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card text-card-foreground rounded-lg shadow p-6 flex flex-col items-start">
            <span className="text-muted-foreground text-sm mb-2">Total Users</span>
            <span className="text-2xl font-bold">1,234</span>
          </div>
          <div className="bg-card text-card-foreground rounded-lg shadow p-6 flex flex-col items-start">
            <span className="text-muted-foreground text-sm mb-2">Orders Today</span>
            <span className="text-2xl font-bold">56</span>
          </div>
          <div className="bg-card text-card-foreground rounded-lg shadow p-6 flex flex-col items-start">
            <span className="text-muted-foreground text-sm mb-2">Revenue</span>
            <span className="text-2xl font-bold">$4,320</span>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="bg-card rounded-lg shadow p-4">
            <ul className="divide-y divide-border">
              <li className="py-2">User <span className="font-medium">john_doe</span> placed an order.</li>
              <li className="py-2">Product <span className="font-medium">Classic Polo</span> updated.</li>
              <li className="py-2">User <span className="font-medium">jane_smith</span> registered.</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
