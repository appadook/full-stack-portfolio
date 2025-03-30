import React from 'react';

export type SidebarItem = {
  name: string;
  section: string;
  icon: string;
};

interface SidebarProps {
  items: SidebarItem[];
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, activeSection, onSectionChange }) => {
  return (
    <aside className="w-72 bg-dark-surface/90 backdrop-blur-md border-r border-gray-800/60 h-full flex flex-col shadow-xl">
      <div className="p-7 border-b border-gray-800/60">
        <h2 className="text-2xl font-bold text-gradient">Portfolio Admin</h2>
        <p className="text-gray-400 text-sm mt-1">Manage your content</p>
      </div>
      <nav className="p-5 flex-grow">
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.section}>
              <button
                className={`w-full text-left px-5 py-4 rounded-xl flex items-center space-x-4 transition-all duration-200 ${
                  activeSection === item.section
                    ? 'bg-gradient-to-r from-violet-900/40 to-purple-900/30 text-violet-200 shadow-lg shadow-violet-900/10 font-medium border border-violet-800/30'
                    : 'text-gray-300 hover:bg-gray-800/40 hover:text-white'
                }`}
                onClick={() => onSectionChange(item.section)}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className={activeSection === item.section ? 'font-medium' : ''}>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-5 border-t border-gray-800/60">
        <button className="flex items-center text-gray-400 hover:text-white transition-colors p-4 w-full rounded-xl hover:bg-gray-800/40">
          <span className="mr-3 text-xl">👤</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;