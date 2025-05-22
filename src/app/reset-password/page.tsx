
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Puzzle, CheckCircle, ShieldAlert } from 'lucide-react';
import { useState, useEffect } from 'react'; // Imported useEffect

const verifyCodeFormSchema = z.object({
  code: z.string().length(6, { message: "Verification code must be 6 digits." }).regex(/^\d{6}$/, { message: "Code must be numeric." }),
});

const resetPasswordFormSchema = z.object({
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type VerifyCodeFormValues = z.infer<typeof verifyCodeFormSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;

export default function ResetPasswordPage() {
  const { toast } = useToast();
  const [codeVerified, setCodeVerified] = useState(false);
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);

  const verifyCodeForm = useForm<VerifyCodeFormValues>({
    resolver: zodResolver(verifyCodeFormSchema),
    defaultValues: {
      code: '',
    },
  });

  const resetPasswordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (codeVerified && !passwordResetSuccess) {
      // Explicitly clear password fields when the form becomes visible
      // This helps override aggressive browser autofill
      resetPasswordForm.setValue('newPassword', '');
      resetPasswordForm.setValue('confirmPassword', '');
      resetPasswordForm.clearErrors(); // Clear any potential stale errors
    }
  }, [codeVerified, passwordResetSuccess, resetPasswordForm]);

  function onVerifyCodeSubmit(data: VerifyCodeFormValues) {
    console.log("Verification Code Data:", data);
    // Mock verification success
    toast({
      title: 'Code Verified (Mock)',
      description: 'You can now reset your password.',
      action: <CheckCircle className="h-5 w-5 text-green-500" />,
    });
    resetPasswordForm.reset(); // Reset to default values before showing
    setCodeVerified(true);
  }

  function onResetPasswordSubmit(data: ResetPasswordFormValues) {
    console.log("New Password Data:", data);
    toast({
      title: 'Password Reset Successful (Mock)',
      description: 'Your password has been updated. You can now log in with your new password.',
    });
    resetPasswordForm.reset();
    verifyCodeForm.reset(); 
    setPasswordResetSuccess(true);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary pt-12 px-6 pb-6">
      <Link href="/" className="flex items-center gap-2 text-2xl font-semibold text-primary mb-8">
        <Puzzle className="h-8 w-8" />
        <span>Babysitter Hub</span>
      </Link>
      <Card className="w-full max-w-md shadow-xl">
        {passwordResetSuccess ? (
          <>
            <CardHeader className="text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-2" />
              <CardTitle className="text-2xl font-bold text-primary">Password Reset Successful!</CardTitle>
              <CardDescription>
                Your password has been successfully updated.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/login">
                  Go to Login
                </Link>
              </Button>
            </CardContent>
          </>
        ) : !codeVerified ? (
          <>
            <CardHeader className="text-center">
              <ShieldAlert className="mx-auto h-12 w-12 text-primary mb-2" />
              <CardTitle className="text-2xl font-bold text-primary">Enter Verification Code</CardTitle>
              <CardDescription>
                A 6-digit verification code was sent to your email address. Please enter it below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...verifyCodeForm}>
                <form onSubmit={verifyCodeForm.handleSubmit(onVerifyCodeSubmit)} className="space-y-6">
                  <FormField
                    control={verifyCodeForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Verification Code</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="123456" {...field} maxLength={6} autoComplete="one-time-code" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Verify Code
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader className="text-center">
              <ShieldAlert className="mx-auto h-12 w-12 text-primary mb-2" /> 
              <CardTitle className="text-2xl font-bold text-primary">Reset Your Password</CardTitle>
              <CardDescription>
                Please enter your new password below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...resetPasswordForm}>
                <form onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)} className="space-y-6">
                  <FormField
                    control={resetPasswordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your new password"
                            autoComplete="new-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={resetPasswordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Re-enter your new password" autoComplete="new-password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    Reset Password
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
