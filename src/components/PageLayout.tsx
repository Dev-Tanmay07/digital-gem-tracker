import { Link } from 'react-router-dom';

export function PageLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary hover:opacity-80 transition-opacity">
            CryptoPulse
          </Link>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground leading-relaxed">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
        <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
        <Link to="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link>
        <span className="ml-auto">© {new Date().getFullYear()} CryptoPulse</span>
      </div>
    </footer>
  );
}
