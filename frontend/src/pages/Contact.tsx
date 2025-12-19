import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
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
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    console.log("Contact form submitted:", data);
    reset();
    alert("Thank you! We'll get back to you soon.");
  };

  const contactInfo = [
    { icon: <Mail className="w-6 h-6 text-blue-600" />, label: "Email", value: "markethub250@gmail.com", link: "mailto:markethub250@gmail.com" },
    { icon: <Phone className="w-6 h-6 text-green-600" />, label: "Phone", value: "+25 782 023 0814", link: "tel:+2507820230814" },
    { icon: <MapPin className="w-6 h-6 text-orange-600" />, label: "Address", value: "123 Kigali, Rwanda", link: "#" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* Hero Section */}
      <section className="text-center mb-12">
        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Get in Touch</h1>
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300">
          Questions, feedback, or partnership inquiries? We'd love to hear from you.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Contact Info */}
        <div className="space-y-4">
          {contactInfo.map((info, idx) => (
            <a
              key={idx}
              href={info.link}
              className="flex items-center gap-4 p-4 border rounded-xl hover:shadow-lg transition bg-white dark:bg-slate-900"
            >
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                {info.icon}
              </div>
              <div>
                <p className="font-semibold text-slate-600 dark:text-slate-400">{info.label}</p>
                <p className="text-slate-900 dark:text-white">{info.value}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Send className="w-6 h-6 text-blue-600" /> Send us a Message
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-200">Name</label>
                <Input {...register("name")} placeholder="Your name" />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-200">Email</label>
                <Input {...register("email")} type="email" placeholder="you@example.com" />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-200">Subject</label>
              <Input {...register("subject")} placeholder="Subject" />
              {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-200">Message</label>
              <textarea
                {...register("message")}
                rows={5}
                className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Your message..."
              />
              {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
