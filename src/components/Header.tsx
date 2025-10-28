import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            <Shield className="w-7 h-7 text-primary" />
            PassGen
          </Link>
          <Link 
            to="/about" 
            className="text-foreground/70 hover:text-foreground transition-colors font-medium"
          >
            About
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
