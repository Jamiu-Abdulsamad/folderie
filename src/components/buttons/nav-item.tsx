import { Blocks, ClipboardList, Flag, Gauge, Headset, Settings, Smile, SquareActivity, TableOfContents } from 'lucide-react';
import { NavLink } from 'react-router';

interface NavItem {
  icon: JSX.Element;
  title: string;
  link: string;
}

export const navLoop: NavItem[] = [
  { icon: <Smile className="text-customBlue" size={18} />, title: 'Welcome', link: '/app/welcome' },
  { icon: <Gauge className="text-customBlue" size={18} />, title: 'Documents', link: '/app/documents' },
  { icon: <Flag className="text-customBlue" size={18} />, title: 'Reports', link: 'reports' },
  { icon: <SquareActivity className="text-customBlue" size={18} />, title: 'Activities', link: 'activities' },
  { icon: <Blocks className="text-customBlue" size={18} />, title: 'Integration', link: 'integration' },
  { icon: <ClipboardList className="text-customBlue" size={18} />, title: 'Tasks', link: 'tasks' },
  { icon: <TableOfContents className="text-customBlue" size={18} />, title: 'FAQs', link: 'faqs' },
  { icon: <Settings className="text-customBlue" size={18} />, title: 'Settings', link: 'settings' },
  { icon: <Headset className="text-customBlue" size={18} />, title: 'Support', link: 'support' },
];

const NavItems = () => {
  return (
    <div className="flex h-full flex-col justify-between">
      {/* Top Section */}
      <div className="mt-2 space-y-3">
        {navLoop.slice(0, 6).map((item, index) => (
          <NavLink to={item.link}
            key={index}
            className={({ isActive }) => isActive
              ? "flex cursor-pointer items-center gap-3 rounded-lg p-2 bg-white"
              : "flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-hoverColor"
            }>
            {item.icon}
            <span>{item.title}</span>
          </NavLink>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="space-y-3">
        {navLoop.slice(6).map((item, index) => (
          <NavLink to={item.link}
            key={index}
            className={({ isActive }) => isActive
              ? "flex cursor-pointer items-center gap-3 rounded-lg p-2 bg-white"
              : "flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-hoverColor"}
          >
            {item.icon}
            <span>{item.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default NavItems;
