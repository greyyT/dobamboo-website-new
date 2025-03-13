'use client';

import { sendForm } from '@emailjs/browser';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { FC, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const FormSchema = z.object({
  name: z.string().min(1, {
    message: 'Name must be included.',
  }),
  email: z.union([
    z.literal(''),
    z.string().email({
      message: 'Email must be a valid email address.',
    }),
  ]),
  phone: z.string().optional(),
  message: z.string().min(1, {
    message: 'Message must be included.',
  }),
});

const ContactForm: FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    await sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      formRef.current!,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
    );

    toast('Your message has been submitted', {
      description: 'We will get back to you as soon as possible.',
      closeButton: true,
    });

    form.reset();
    setIsLoading(false);
  }

  return (
    <div className="">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>We are here to help</CardTitle>
          <CardDescription>
            Let us know how we can best serve you. Use the contact form to email us or select from the topics below that
            best fit your needs. It&apos;s an honor to support you in your journey towards better experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2" ref={formRef}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Please input your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Please input your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Please input your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What do you want to tell us?" {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-4" type="submit">
                {isLoading ? <Loader2 className="size-4 animate-spin" /> : 'Submit'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
