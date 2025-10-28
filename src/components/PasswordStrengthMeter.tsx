interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
  // Calculate password strength based on various criteria
  const calculateStrength = () => {
    if (!password) return { score: 0, label: "None", color: "bg-muted" };
    
    let score = 0;
    
    // Length criteria
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    
    // Character diversity
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    
    // Determine strength level
    if (score <= 2) return { score: 1, label: "Weak", color: "bg-destructive" };
    if (score <= 4) return { score: 2, label: "Medium", color: "bg-warning" };
    if (score <= 6) return { score: 3, label: "Strong", color: "bg-success" };
    return { score: 4, label: "Very Strong", color: "bg-success" };
  };
  
  const strength = calculateStrength();
  const percentage = (strength.score / 4) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Password Strength</span>
        <span className={`text-sm font-semibold ${
          strength.label === "Weak" ? "text-destructive" :
          strength.label === "Medium" ? "text-warning" :
          "text-success"
        }`}>
          {strength.label}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full ${strength.color} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
