import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Key, Eye } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/30">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              About PassGen
            </h1>
            <p className="text-xl text-muted-foreground">
              Your trusted password generation companion
            </p>
          </div>

          <Card className="p-8 space-y-6 bg-card/80 backdrop-blur-sm">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                What is PassGen?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                PassGen is a modern, client-side password generator built with React. 
                It helps you create strong, secure passwords with full customization options. 
                All password generation happens locally in your browser - we never send your 
                passwords anywhere.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <Key className="w-6 h-6 text-accent" />
                Features
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>Customizable Length:</strong> Generate passwords from 4 to 32 characters</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>Character Options:</strong> Choose from numbers, uppercase, lowercase, and special characters</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>Word Mode:</strong> Create memorable passwords with readable words</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>Custom Words:</strong> Include your own words or phrases in passwords</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>Strength Meter:</strong> Real-time feedback on password security</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>Local Storage:</strong> Save passwords securely in your browser</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span><strong>One-Click Copy:</strong> Easily copy passwords to clipboard</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <Lock className="w-6 h-6 text-success" />
                Security & Privacy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                PassGen runs entirely in your browser. No passwords are ever transmitted over 
                the internet or stored on any server. When you save passwords, they're stored 
                locally using your browser's localStorage feature. For maximum security, we 
                recommend using a dedicated password manager for long-term storage.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                <Eye className="w-6 h-6 text-warning" />
                Best Practices
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Use passwords with at least 12 characters</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Include a mix of character types (uppercase, lowercase, numbers, symbols)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Never reuse passwords across different accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Change passwords regularly, especially for sensitive accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Consider using a password manager for secure storage</span>
                </li>
              </ul>
            </div>
          </Card>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Built with React, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
