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
    <div className="w-full">
      <Card className="w-full shadow-sm border-gray-200">
        <CardHeader className="p-6 sm:p-8">
          <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-800">We are here to help</CardTitle>
          <CardDescription className="text-sm sm:text-base text-gray-600 leading-relaxed mt-3">
            Let us know how we can best serve you. Use the contact form to email us or select from the topics below that
            best fit your needs. It's an honor to support you in your journey towards better experience.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 pt-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6" ref={formRef}>
              {/* Name and Email Fields */}
              <div className="space-y-4 sm:space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base font-medium text-gray-700">Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please input your name"
                          {...field}
                          className="h-10 sm:h-11 text-sm sm:text-base"
                        />
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
                      <FormLabel className="text-sm sm:text-base font-medium text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please input your email"
                          {...field}
                          className="h-10 sm:h-11 text-sm sm:text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base font-medium text-gray-700">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Please input your phone number"
                        {...field}
                        className="h-10 sm:h-11 text-sm sm:text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base font-medium text-gray-700">Message *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What do you want to tell us?"
                        {...field}
                        rows={5}
                        className="resize-none text-sm sm:text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="pt-2 sm:pt-4">
                <Button
                  className="w-full sm:w-auto min-w-[140px] h-11 sm:h-12 text-sm sm:text-base font-medium"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
