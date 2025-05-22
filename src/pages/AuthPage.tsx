
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, signupSchema, LoginFormData, SignupFormData } from '@/lib/schemas';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', confirmPassword: '', firstName: '', lastName: '', avatarUrl: '' },
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    setIsLoading(false);
    if (error) {
      toast({ title: 'Login Failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Login Successful', description: 'Redirecting...' });
      // Navigation is handled by AuthContext onAuthStateChange
    }
  };

  const onSignupSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          avatar_url: data.avatarUrl || null, // Pass null if empty
        },
      },
    });
    setIsLoading(false);
    if (error) {
      toast({ title: 'Signup Failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Signup Successful', description: 'Please check your email to verify your account.' });
      // Potentially redirect or show further instructions
    }
  };
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Access your PatientConnect AI Hub account.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" type="email" {...loginForm.register('email')} />
                  {loginForm.formState.errors.email && <p className="text-red-500 text-sm mt-1">{loginForm.formState.errors.email.message}</p>}
                </div>
                <div className="relative">
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" type={showPassword ? "text" : "password"} {...loginForm.register('password')} />
                  <Button type="button" variant="ghost" size="sm" className="absolute right-1 top-7" onClick={togglePasswordVisibility}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                  {loginForm.formState.errors.password && <p className="text-red-500 text-sm mt-1">{loginForm.formState.errors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Create a new PatientConnect AI Hub account.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="signup-firstName">First Name</Label>
                  <Input id="signup-firstName" {...signupForm.register('firstName')} />
                  {signupForm.formState.errors.firstName && <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.firstName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="signup-lastName">Last Name</Label>
                  <Input id="signup-lastName" {...signupForm.register('lastName')} />
                  {signupForm.formState.errors.lastName && <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.lastName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" {...signupForm.register('email')} />
                  {signupForm.formState.errors.email && <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.email.message}</p>}
                </div>
                 <div className="relative">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type={showPassword ? "text" : "password"} {...signupForm.register('password')} />
                   <Button type="button" variant="ghost" size="sm" className="absolute right-1 top-7" onClick={togglePasswordVisibility}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                  {signupForm.formState.errors.password && <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.password.message}</p>}
                </div>
                <div className="relative">
                  <Label htmlFor="signup-confirmPassword">Confirm Password</Label>
                  <Input id="signup-confirmPassword" type={showConfirmPassword ? "text" : "password"} {...signupForm.register('confirmPassword')} />
                  <Button type="button" variant="ghost" size="sm" className="absolute right-1 top-7" onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                  {signupForm.formState.errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.confirmPassword.message}</p>}
                </div>
                <div>
                  <Label htmlFor="signup-avatarUrl">Avatar URL (Optional)</Label>
                  <Input id="signup-avatarUrl" type="url" {...signupForm.register('avatarUrl')} placeholder="https://example.com/avatar.png"/>
                  {signupForm.formState.errors.avatarUrl && <p className="text-red-500 text-sm mt-1">{signupForm.formState.errors.avatarUrl.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign Up
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthPage;

