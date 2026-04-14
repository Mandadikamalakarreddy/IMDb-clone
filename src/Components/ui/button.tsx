import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'gradient' | 'pink' | 'cyan'
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'xl'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const variantClasses = {
      default: "bg-dark-700 text-white shadow-md hover:bg-dark-600 hover:shadow-lg focus-visible:ring-dark-500",
      destructive: "bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg focus-visible:ring-red-500",
      outline: "border border-dark-600 bg-transparent text-dark-300 hover:bg-dark-700 hover:border-neon-pink dark:border-dark-600 focus-visible:ring-neon-pink",
      secondary: "bg-dark-700 text-dark-200 shadow-md hover:bg-dark-600 hover:shadow-lg focus-visible:ring-dark-500",
      ghost: "text-dark-400 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-700 hover:text-dark-900 dark:hover:text-white focus-visible:ring-dark-500",
      link: "text-neon-cyan underline-offset-4 hover:underline hover:text-neon-cyan-light focus-visible:ring-neon-cyan",
      gradient: "bg-gradient-to-r from-neon-pink to-neon-pink-light text-white shadow-lg hover:shadow-xl focus-visible:ring-neon-pink",
      pink: "bg-neon-pink text-white shadow-lg hover:bg-neon-pink-light hover:shadow-xl focus-visible:ring-neon-pink",
      cyan: "bg-neon-cyan text-dark-900 shadow-lg hover:bg-neon-cyan-light hover:shadow-xl focus-visible:ring-neon-cyan",
    }
    
    const sizeClasses = {
      default: "h-10 px-5 py-2",
      sm: "h-8 rounded-lg px-3 text-xs",
      lg: "h-12 rounded-xl px-8 text-base",
      icon: "h-10 w-10 rounded-xl",
      xl: "h-14 rounded-2xl px-12 text-lg font-bold",
    }
    
    const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()
    
    return (
      <button
        className={combinedClassName}
        ref={ref}
        suppressHydrationWarning
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
