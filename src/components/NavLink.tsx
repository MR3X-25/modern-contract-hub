import { NavLink as RouterNavLink, NavLinkProps, Link, useLocation } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { FileText, Home } from 'lucide-react';

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export const Navigation = () => {
  const location = useLocation();
  
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      {location.pathname === '/' ? (
        <Link to="/contracts">
          <Button variant="outline" className="bg-white/90 backdrop-blur-sm">
            <FileText className="mr-2" size={18} />
            Meus Contratos
          </Button>
        </Link>
      ) : (
        <Link to="/">
          <Button variant="outline" className="bg-white/90 backdrop-blur-sm">
            <Home className="mr-2" size={18} />
            Novo Contrato
          </Button>
        </Link>
      )}
    </div>
  );
};

export { NavLink };
