import { useState, useEffect } from "react";
import { Copy, RefreshCw, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [wordMode, setWordMode] = useState(false);
  const [customWord, setCustomWord] = useState("");
  const [savedPasswords, setSavedPasswords] = useState([]);

  // Load saved passwords from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("savedPasswords");
    if (saved) {
      setSavedPasswords(JSON.parse(saved));
    }
  }, []);

  // Generate password function
  // Generate password function
  const generatePassword = () => {
    if (
      !includeNumbers &&
      !includeUppercase &&
      !includeLowercase &&
      !includeSpecial &&
      !wordMode
    ) {
      toast({
        title: "Selection Required",
        description:
          "Please select at least one character type or enable word mode.",
        variant: "destructive",
      });
      return;
    }

    let charset = "";
    let generated = "";

    // ✅ Keep ONLY this wordMode block (remove the older one)
    if (wordMode) {
      let baseWord = customWord?.trim() || "Pass";
      const targetLength = length;

      // Build character set based on user options
      let charset = "";
      if (includeNumbers) charset += "0123456789";
      if (includeSpecial) charset += "!@#$%^&*";
      if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";

      // If charset is empty, fall back to alphanumeric
      if (!charset)
        charset =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      // If word is longer than total length, trim it
      if (baseWord.length > targetLength) {
        baseWord = baseWord.slice(0, targetLength);
      }

      const remaining = targetLength - baseWord.length;
      const leftPadding = Math.floor(remaining / 2);
      const rightPadding = remaining - leftPadding;

      // Generate random padding around the word
      const randomChars = (count) => {
        let str = "";
        for (let i = 0; i < count; i++) {
          str += charset[Math.floor(Math.random() * charset.length)];
        }
        return str;
      };

      let left = randomChars(leftPadding);
      let right = randomChars(rightPadding);

      // Combine: randoms + word + randoms
      let generated = left + baseWord + right;

      // Apply case variety if allowed
      if (includeUppercase && includeLowercase) {
        generated = generated
          .split("")
          .map((ch) =>
            /[a-zA-Z]/.test(ch)
              ? Math.random() > 0.5
                ? ch.toUpperCase()
                : ch.toLowerCase()
              : ch
          )
          .join("");
      } else if (includeUppercase) {
        generated = generated.toUpperCase();
      } else if (includeLowercase) {
        generated = generated.toLowerCase();
      }

      // Final output
      setPassword(generated);
      toast({
        title: "Password Generated!",
        description: "Your new password is ready to use.",
      });
      return;
    }

    // 🧠 Otherwise, run the normal random password generator
    if (includeNumbers) charset += "0123456789";
    if (includeSpecial) charset += "!@#$%^&*";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";

    if (customWord) {
      generated = customWord;
      const remainingLength = length - customWord.length;
      for (let i = 0; i < remainingLength; i++) {
        generated += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      generated = generated
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
    } else {
      for (let i = 0; i < length; i++) {
        generated += charset.charAt(Math.floor(Math.random() * charset.length));
      }
    }

    setPassword(generated);
    toast({
      title: "Password Generated!",
      description: "Your new password is ready to use.",
    });
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    if (!password) {
      toast({
        title: "No Password",
        description: "Generate a password first!",
        variant: "destructive",
      });
      return;
    }

    navigator.clipboard.writeText(password);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard.",
    });
  };

  // Save password
  const savePassword = () => {
    if (!password) {
      toast({
        title: "No Password",
        description: "Generate a password first!",
        variant: "destructive",
      });
      return;
    }

    const newSaved = [
      ...savedPasswords,
      { id: Date.now(), password, date: new Date().toLocaleString() },
    ];
    setSavedPasswords(newSaved);
    localStorage.setItem("savedPasswords", JSON.stringify(newSaved));

    toast({
      title: "Password Saved!",
      description: "Password has been saved locally.",
    });
  };

  // Delete saved password
  const deleteSavedPassword = (id) => {
    const updated = savedPasswords.filter((item) => item.id !== id);
    setSavedPasswords(updated);
    localStorage.setItem("savedPasswords", JSON.stringify(updated));

    toast({
      title: "Deleted",
      description: "Password removed from saved list.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Password Display */}
      <Card className="p-6 bg-gradient-to-br from-card to-card/50 shadow-lg border-border/50">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <Input
              value={password}
              readOnly
              placeholder="Your generated password will appear here"
              className="font-mono text-lg bg-background/50 border-border/50"
            />
            <div className="flex gap-2">
              <Button
                onClick={copyToClipboard}
                size="icon"
                variant="outline"
                className="shrink-0 hover:bg-accent hover:text-accent-foreground transition-all"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                onClick={savePassword}
                size="icon"
                variant="outline"
                className="shrink-0 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Save className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <PasswordStrengthMeter password={password} />
        </div>
      </Card>

      {/* Generator Options */}
      <Card className="p-6 space-y-6 bg-card/80 backdrop-blur-sm">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="length" className="text-sm font-semibold">
              Password Length: {length}
            </Label>
            <Input
              id="length"
              type="range"
              min="4"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={(checked) =>
                  setIncludeNumbers(checked === true)
                }
              />
              <Label htmlFor="numbers" className="cursor-pointer">
                Include Numbers (0-9)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={(checked) =>
                  setIncludeUppercase(checked === true)
                }
              />
              <Label htmlFor="uppercase" className="cursor-pointer">
                Include Uppercase Letters (A-Z)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowercase"
                checked={includeLowercase}
                onCheckedChange={(checked) =>
                  setIncludeLowercase(checked === true)
                }
              />
              <Label htmlFor="lowercase" className="cursor-pointer">
                Include Lowercase Letters (a-z)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="special"
                checked={includeSpecial}
                onCheckedChange={(checked) =>
                  setIncludeSpecial(checked === true)
                }
              />
              <Label htmlFor="special" className="cursor-pointer">
                Include Special Characters (!@#$%...)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="wordmode"
                checked={wordMode}
                onCheckedChange={(checked) => setWordMode(checked === true)}
              />
              <Label htmlFor="wordmode" className="cursor-pointer">
                Word Mode (Readable passwords)
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customWord">Custom Word/Phrase (Optional)</Label>
            <Input
              id="customWord"
              type="text"
              placeholder="e.g., MySecret"
              value={customWord}
              onChange={(e) => setCustomWord(e.target.value)}
              className="bg-background/50"
            />
          </div>

          <Button
            onClick={generatePassword}
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-primary-foreground font-semibold py-6 text-lg shadow-md"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Generate Password
          </Button>
        </div>
      </Card>

      {/* Saved Passwords */}
      {savedPasswords.length > 0 && (
        <Card className="p-6 space-y-4 bg-card/80 backdrop-blur-sm">
          <h3 className="text-lg font-semibold text-foreground">
            Saved Passwords
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {savedPasswords.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 p-3 bg-background/50 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-sm truncate">{item.password}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(item.password);
                      toast({
                        title: "Copied!",
                        description: "Password copied to clipboard.",
                      });
                    }}
                    size="icon"
                    variant="ghost"
                    className="shrink-0"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => deleteSavedPassword(item.id)}
                    size="icon"
                    variant="ghost"
                    className="shrink-0 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default PasswordGenerator;
