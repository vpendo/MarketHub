import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    console.log("Contact form submitted:", data);
    // Here you would send the data to your backend
    reset();
    alert("Thank you for your message! We'll get back to you soon.");
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "markethub250@gmail.com",
      link: "mailto:markethub250@gmail.com",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+25078203081",
      link: "tel:+250782030814",
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Address",
      value: "123 Kigali, Rwanda",
      link: "#",
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Hours",
      value: "Mon–Fri, 9am–6pm (UTC)",
      link: "#",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-16 px-6 rounded-2xl mb-12 overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <MessageSquare className="w-12 h-12 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-blue-100">
            We'd love to hear from you. Reach out with questions about orders, products, or partnership opportunities.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -mr-48 -mt-48"></div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 mb-12">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          {contactInfo.map((info, idx) => (
            <a
              key={idx}
              href={info.link}
              className={`flex items-start gap-4 p-4 border-2 rounded-xl ${info.bg} hover:shadow-md transition`}
            >
              <div className={`p-2 rounded-lg ${info.bg} ${info.color} flex-shrink-0`}>
                {info.icon}
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-600 dark:text-slate-400 mb-1">
                  {info.label}
                </p>
                <p className="text-slate-900 dark:text-slate-100">{info.value}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border shadow-sm">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Send className="w-6 h-6 text-primary" />
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-200">
                    Name
                  </label>
                  <Input {...register("name")} placeholder="Your name" />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-200">
                    Email
                  </label>
                  <Input {...register("email")} type="email" placeholder="you@example.com" />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-200">
                  Subject
                </label>
                <Input {...register("subject")} placeholder="What's this about?" />
                {errors.subject && (
                  <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-200">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  rows={6}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your message..."
                />
                {errors.message && (
                  <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
