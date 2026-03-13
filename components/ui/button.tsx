"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-soft hover:-translate-y-0.5 hover:bg-primary/95",
        ghost: "bg-transparent text-slate-700 hover:bg-white/80",
        secondary:
          "bg-accent text-accent-foreground shadow-soft hover:-translate-y-0.5 hover:bg-accent/90",
        outline: "border border-border bg-white text-slate-700 hover:bg-slate-50",
        destructive: "bg-error text-error-foreground hover:bg-error/90",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-5 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    if (
      asChild &&
      React.isValidElement(children) &&
      React.Children.count(children) === 1
    ) {
      return React.cloneElement(children, {
        className: cn(
          buttonVariants({ variant, size, className }),
          (children.props as { className?: string }).className,
        ),
      });
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
