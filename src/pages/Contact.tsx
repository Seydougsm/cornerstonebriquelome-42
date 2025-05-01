import { useState } from "react";
import { Phone, Mail, MapPin, Mic, MicOff, MessageSquare, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LocationMap } from "@/components/LocationMap";
import { Badge } from "@/components/ui/badge";

const Contact = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  
  const handleTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès!",
    });
  };
  
  const handleVoiceSubmit = () => {
    if (recordingTime < 3) {
      toast({
        title: "Enregistrement trop court",
        description: "Veuillez enregistrer un message d'au moins 3 secondes.",
        variant: "destructive"
      });
      return;
    }
    
    stopRecording();
    toast({
      title: "Message vocal envoyé",
      description: "Votre message vocal a été envoyé avec succès!",
    });
    setRecordingTime(0);
  };
  
  const startRecording = () => {
    setIsRecording(true);
    const interval = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    setRecordingInterval(interval);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    if (recordingInterval) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="title text-center mb-12">Contactez-nous</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="section-title mb-8">Nos coordonnées</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-cornerstone-orange p-3 rounded-full mr-4">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-cornerstone-blue">Téléphone</h3>
                  <a 
                    href="https://wa.me/22871014747" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-cornerstone-gray hover:text-cornerstone-orange transition-colors flex items-center"
                  >
                    +228 71014747 
                    <div className="ml-2 flex items-center">
                      <img 
                        src="/lovable-uploads/3d6e3100-3a4f-4fa8-9568-db93b7dc74a5.png"
                        alt="WhatsApp" 
                        className="h-5 w-5" 
                      />
                    </div>
                  </a>
                  <p className="text-cornerstone-gray">+228 90 96 49 93 / 99 87 01 95</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-cornerstone-orange p-3 rounded-full mr-4">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-cornerstone-blue">Email</h3>
                  <a 
                    href="mailto:contact@cornerstonebriques.com"
                    className="text-cornerstone-gray hover:text-cornerstone-orange transition-colors"
                  >
                    contact@cornerstonebriques.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-cornerstone-orange p-3 rounded-full mr-4">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-cornerstone-blue">Adresse</h3>
                  <p className="text-cornerstone-gray">Lomé, Togo</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h2 className="section-title mb-4">Horaires d'ouverture</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-bold text-cornerstone-blue">Lundi - Vendredi:</div>
                  <div className="text-cornerstone-gray">8h00 - 18h00</div>
                  
                  <div className="font-bold text-cornerstone-blue">Samedi:</div>
                  <div className="text-cornerstone-gray">9h00 - 16h00</div>
                  
                  <div className="font-bold text-cornerstone-blue">Dimanche:</div>
                  <div className="text-cornerstone-gray">Fermé</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="section-title mb-8">Envoyez-nous un message</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="text" className="flex items-center justify-center">
                    <MessageSquare className="mr-2" size={18} />
                    Message texte
                  </TabsTrigger>
                  <TabsTrigger value="voice" className="flex items-center justify-center">
                    <Mic className="mr-2" size={18} />
                    Message vocal
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="text">
                  <form onSubmit={handleTextSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input
                          id="name"
                          placeholder="Votre nom"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Votre email"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        placeholder="Votre numéro de téléphone"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet</Label>
                      <Input
                        id="subject"
                        placeholder="Sujet de votre message"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows={5}
                        placeholder="Votre message..."
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full bg-cornerstone-orange hover:bg-cornerstone-orange/90"
                    >
                      Envoyer le message
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="voice">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="voice-name">Nom complet</Label>
                        <Input
                          id="voice-name"
                          placeholder="Votre nom"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="voice-email">Email</Label>
                        <Input
                          id="voice-email"
                          type="email"
                          placeholder="Votre email"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="voice-phone">Téléphone</Label>
                      <Input
                        id="voice-phone"
                        placeholder="Votre numéro de téléphone"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="voice-subject">Sujet</Label>
                      <Input
                        id="voice-subject"
                        placeholder="Sujet de votre message"
                        required
                      />
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                      {isRecording ? (
                        <div className="space-y-4">
                          <div className="text-lg font-bold text-cornerstone-blue">
                            Enregistrement en cours... {formatTime(recordingTime)}
                          </div>
                          <div className="animate-pulse">
                            <Mic size={48} className="mx-auto text-cornerstone-orange" />
                          </div>
                          <Button 
                            onClick={stopRecording}
                            variant="outline" 
                            className="border-red-500 text-red-500 hover:bg-red-50"
                          >
                            <MicOff size={16} className="mr-2" />
                            Arrêter l'enregistrement
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {recordingTime > 0 ? (
                            <div className="text-lg font-bold text-cornerstone-blue">
                              Enregistrement terminé ({formatTime(recordingTime)})
                            </div>
                          ) : (
                            <div className="text-lg font-bold text-cornerstone-blue">
                              Cliquez pour enregistrer votre message
                            </div>
                          )}
                          <Mic size={48} className="mx-auto text-cornerstone-gray" />
                          <Button 
                            onClick={startRecording}
                            variant="outline" 
                            className="border-cornerstone-orange text-cornerstone-orange hover:bg-cornerstone-orange hover:text-white"
                          >
                            <Mic size={16} className="mr-2" />
                            {recordingTime > 0 ? "Recommencer" : "Commencer l'enregistrement"}
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      onClick={handleVoiceSubmit}
                      disabled={recordingTime === 0 || isRecording}
                      className="w-full bg-cornerstone-orange hover:bg-cornerstone-orange/90"
                    >
                      Envoyer le message vocal
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="mt-16">
          <h2 className="section-title mb-4">Notre emplacement</h2>
          <div className="h-[400px] w-full rounded-lg overflow-hidden border-2 border-cornerstone-orange">
            <LocationMap />
          </div>
          <p className="text-cornerstone-gray text-center mt-4">
            CORNERSTONE BRIQUES est situé à Lomé, Togo. Visitez-nous pour découvrir notre gamme complète de produits et consulter nos experts en construction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
