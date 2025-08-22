import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'gradient'
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'xl'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const variantClasses = {
      default: "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 focus-visible:ring-blue-500",
      destructive: "bg-red-600 text-white shadow-md hover:bg-red-700 hover:shadow-lg transform hover:scale-105 focus-visible:ring-red-500",
      outline: "border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 hover:border-blue-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:border-blue-500 focus-visible:ring-blue-500",
      secondary: "bg-purple-600 text-white shadow-md hover:bg-purple-700 hover:shadow-lg transform hover:scale-105 focus-visible:ring-purple-500",
      ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 focus-visible:ring-gray-500",
      link: "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus-visible:ring-blue-500",
      gradient: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:scale-105 focus-visible:ring-blue-500",
    }
    
    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-12 rounded-xl px-8 text-base",
      icon: "h-10 w-10",
      xl: "h-14 rounded-2xl px-12 text-lg font-semibold",
    }
    
    const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()
    
    return (
      <button
        className={combinedClassName}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
