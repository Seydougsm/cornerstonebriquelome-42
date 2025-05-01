
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import LocationMap from "@/components/LocationMap";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
    toast.success("Message envoyé avec succès!");
    reset();
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Contactez-nous</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="flex flex-col space-y-2">
              <h2 className="text-2xl font-bold">Envoyez-nous un message</h2>
              <p className="text-gray-600">
                Nous sommes là pour répondre à toutes vos questions.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  placeholder="Votre nom"
                  {...register("name", { required: true })}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">Le nom est requis</span>
                )}
              </div>

              <div>
                <Input
                  placeholder="Votre email"
                  type="email"
                  {...register("email", { required: true })}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    L'email est requis
                  </span>
                )}
              </div>

              <div>
                <Input
                  placeholder="Sujet"
                  {...register("subject", { required: true })}
                  className={errors.subject ? "border-red-500" : ""}
                />
                {errors.subject && (
                  <span className="text-red-500 text-sm">
                    Le sujet est requis
                  </span>
                )}
              </div>

              <div>
                <Textarea
                  placeholder="Votre message"
                  rows={6}
                  {...register("message", { required: true })}
                  className={errors.message ? "border-red-500" : ""}
                />
                {errors.message && (
                  <span className="text-red-500 text-sm">
                    Le message est requis
                  </span>
                )}
              </div>

              <Button type="submit" className="w-full">
                Envoyer
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col space-y-2">
              <h2 className="text-2xl font-bold">Nos coordonnées</h2>
              <p className="text-gray-600">
                N'hésitez pas à nous contacter directement.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Adresse</h3>
                  <p className="text-gray-600">
                    21 Rue Be HEDJE, Akodéséwa, Togo
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a
                    href="mailto:contact@cornerstonebrique.com"
                    className="text-primary hover:underline"
                  >
                    contact@cornerstonebrique.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Téléphone</h3>
                  <p className="text-gray-600">+228 91 61 87 65</p>
                </div>
              </div>
            </div>

            <div className="h-64 mt-8 rounded-lg overflow-hidden">
              <LocationMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
