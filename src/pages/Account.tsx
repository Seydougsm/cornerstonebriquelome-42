
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, Package, Key } from "lucide-react";

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'une connexion réussie
    toast({
      title: "Connexion réussie",
      description: "Bienvenue sur votre espace personnel.",
    });
    setIsLoggedIn(true);
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'une inscription réussie
    toast({
      title: "Inscription réussie",
      description: "Votre compte a été créé avec succès.",
    });
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    });
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <h1 className="title text-center mb-12">Mon Compte</h1>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="section-title mb-0">Tableau de bord</h2>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="border-cornerstone-orange text-cornerstone-orange hover:bg-cornerstone-orange hover:text-white"
              >
                Déconnexion
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Commandes</CardTitle>
                  <Package className="h-4 w-4 text-cornerstone-orange" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-cornerstone-gray">Aucune commande pour le moment</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Informations personnelles</CardTitle>
                  <User className="h-4 w-4 text-cornerstone-orange" />
                </CardHeader>
                <CardContent>
                  <p className="text-cornerstone-gray text-sm">Gérez vos informations personnelles et adresses de livraison.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sécurité</CardTitle>
                  <Key className="h-4 w-4 text-cornerstone-orange" />
                </CardHeader>
                <CardContent>
                  <p className="text-cornerstone-gray text-sm">Modifiez votre mot de passe et paramètres de sécurité.</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Mes commandes récentes</CardTitle>
                <CardDescription>Historique de vos commandes passées</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-cornerstone-gray">
                  <p>Vous n'avez pas encore passé de commande.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Mes informations personnelles</CardTitle>
                <CardDescription>Gérez vos informations de contact</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" placeholder="Votre prénom" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" placeholder="Votre nom" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="votre@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" placeholder="Votre numéro de téléphone" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input id="address" placeholder="Votre adresse" />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="bg-cornerstone-orange hover:bg-cornerstone-orange/90">
                  Mettre à jour
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="title text-center mb-12">Mon Compte</h1>
        
        <div className="max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Connexion</CardTitle>
                  <CardDescription>Connectez-vous à votre compte existant</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="votre@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full bg-cornerstone-orange hover:bg-cornerstone-orange/90">
                      Se connecter
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="link" className="text-cornerstone-gray">
                    Mot de passe oublié ?
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Inscription</CardTitle>
                  <CardDescription>Créez un compte pour accéder à votre espace personnel</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input id="firstName" placeholder="Votre prénom" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input id="lastName" placeholder="Votre nom" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="votre@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" placeholder="Votre numéro de téléphone" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input id="password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                      <Input id="confirmPassword" type="password" required />
                    </div>
                    <Button type="submit" className="w-full bg-cornerstone-orange hover:bg-cornerstone-orange/90">
                      S'inscrire
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Account;
