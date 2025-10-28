import PasswordGenerator from "@/components/PasswordGenerator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/30">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-top-4 duration-700">
              Secure Password Generator
            </h1>
            <p className="text-lg text-muted-foreground animate-in fade-in slide-in-from-top-5 duration-700 delay-100">
              Create strong, customizable passwords to protect your accounts
            </p>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            <PasswordGenerator />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
