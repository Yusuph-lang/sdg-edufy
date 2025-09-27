import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { GoalCard } from "@/components/ui/goal-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DonationForm } from "@/components/forms/DonationForm";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { AdvocateForm } from "@/components/forms/AdvocateForm";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  Globe, 
  Target, 
  TrendingUp,
  School,
  Laptop,
  Heart,
  LogOut,
  User,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import educationHero from "@/assets/education-hero.jpg";

const Index = () => {
  const { user, signOut, loading } = useAuth();
  const [activeDialog, setActiveDialog] = useState<'donate' | 'volunteer' | 'advocate' | null>(null);
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLearnMore = () => {
    scrollToSection('statistics');
  };

  const handleTakeAction = () => {
    scrollToSection('call-to-action');
  };

  const handleDonate = () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to make a donation",
        variant: "destructive"
      });
      return;
    }
    setActiveDialog('donate');
  };

  const handleVolunteer = () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to volunteer",
        variant: "destructive"
      });
      return;
    }
    setActiveDialog('volunteer');
  };

  const handleAdvocate = () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be logged in to become an advocate",
        variant: "destructive"
      });
      return;
    }
    setActiveDialog('advocate');
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out"
    });
  };

  const closeDialog = () => {
    setActiveDialog(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
              EduForAll
            </span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              SDG 4: Quality Education
            </Badge>
            {user ? (
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="flex items-center space-x-1 px-2 py-1">
                  <User className="h-3 w-3" />
                  <span className="text-xs">{user.email}</span>
                </Badge>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${educationHero})` }}
        />
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Ensure Inclusive and Equitable 
              <span className="block text-accent">Quality Education</span>
            </h1>
            <p className="text-xl leading-8 mb-8 text-white/90">
              Promoting lifelong learning opportunities for all. Join the global movement 
              to achieve SDG 4 and transform lives through education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow" onClick={handleLearnMore}>
                <BookOpen className="mr-2 h-5 w-5" />
                Learn More
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" onClick={handleTakeAction}>
                <Target className="mr-2 h-5 w-5" />
                Take Action
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="statistics" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Education by the Numbers</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Understanding the current state of global education and the challenges we face
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Out of School Children"
              value="244M"
              description="Children and youth are out of school worldwide"
              icon={<Users className="h-6 w-6" />}
            />
            <StatCard
              title="Adult Literacy Rate"
              value="86%"
              description="Global adult literacy rate has improved"
              icon={<BookOpen className="h-6 w-6" />}
            />
            <StatCard
              title="Primary Education"
              value="91%"
              description="Net enrollment rate in primary education"
              icon={<School className="h-6 w-6" />}
            />
            <StatCard
              title="Digital Divide"
              value="2.9B"
              description="People still lack internet access"
              icon={<Laptop className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* SDG Goals Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">SDG 4 Targets</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Key targets for achieving quality education for all by 2030
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GoalCard
              number="4.1"
              title="Primary & Secondary Education"
              description="Ensure all girls and boys complete free, equitable and quality primary and secondary education"
              progress={75}
              status="in-progress"
            />
            <GoalCard
              number="4.2"
              title="Early Childhood Development"
              description="Ensure all children have access to quality early childhood development and care"
              progress={65}
              status="in-progress"
            />
            <GoalCard
              number="4.3"
              title="Technical & Vocational Skills"
              description="Ensure equal access to affordable technical, vocational and tertiary education"
              progress={55}
              status="needs-attention"
            />
            <GoalCard
              number="4.4"
              title="Skills for Employment"
              description="Substantially increase the number of people with relevant skills for employment"
              progress={60}
              status="in-progress"
            />
            <GoalCard
              number="4.5"
              title="Gender Equality"
              description="Eliminate gender disparities in education and ensure access for vulnerable populations"
              progress={70}
              status="in-progress"
            />
            <GoalCard
              number="4.6"
              title="Literacy & Numeracy"
              description="Ensure all youth and adults achieve literacy and numeracy skills"
              progress={45}
              status="needs-attention"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="call-to-action" className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur border-0 shadow-education">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold mb-4">
                Make a Difference Today
              </CardTitle>
              <p className="text-muted-foreground text-lg">
                Every action counts in building a more educated and equitable world
              </p>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Button 
                variant="ghost" 
                className="h-auto p-6 flex flex-col text-center space-y-4 hover:bg-primary/5"
                onClick={handleDonate}
              >
                <div className="rounded-full w-16 h-16 bg-primary/10 mx-auto flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold">Donate</h3>
                <p className="text-sm text-muted-foreground">
                  Support education programs worldwide
                </p>
              </Button>
              <Button 
                variant="ghost" 
                className="h-auto p-6 flex flex-col text-center space-y-4 hover:bg-secondary/5"
                onClick={handleVolunteer}
              >
                <div className="rounded-full w-16 h-16 bg-secondary/10 mx-auto flex items-center justify-center">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold">Volunteer</h3>
                <p className="text-sm text-muted-foreground">
                  Share your knowledge and skills
                </p>
              </Button>
              <Button 
                variant="ghost" 
                className="h-auto p-6 flex flex-col text-center space-y-4 hover:bg-accent/5"
                onClick={handleAdvocate}
              >
                <div className="rounded-full w-16 h-16 bg-accent/10 mx-auto flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold">Advocate</h3>
                <p className="text-sm text-muted-foreground">
                  Raise awareness in your community
                </p>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have questions or want to collaborate? We'd love to hear from you.
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <a 
                        href="mailto:jkithaika@gmail.com" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        jkithaika@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full w-12 h-12 bg-secondary/10 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <a 
                        href="tel:+254727797067" 
                        className="text-muted-foreground hover:text-secondary transition-colors"
                      >
                        +254 727797067
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full w-12 h-12 bg-accent/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-muted-foreground">Nairobi, Kenya</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donation Information */}
              <div>
                <h3 className="text-xl font-semibold mb-6">Donation Account</h3>
                <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                  <div className="text-center mb-4">
                    <h4 className="font-semibold text-lg mb-2">Bank Transfer</h4>
                    <p className="text-sm text-muted-foreground">Direct bank deposit</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-muted">
                      <span className="font-medium">Bank:</span>
                      <span className="text-muted-foreground">Equity Bank</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-muted">
                      <span className="font-medium">Account Name:</span>
                      <span className="text-muted-foreground">Joseph Kithaika</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-muted">
                      <span className="font-medium">Account Number:</span>
                      <span className="text-muted-foreground font-mono">1180179299914</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-muted">
                    <h5 className="font-semibold mb-3 text-center">Mobile Money (M-Pesa)</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between py-1">
                        <span className="font-medium">Pay Bill:</span>
                        <span className="text-muted-foreground font-mono">247247</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="font-medium">Account:</span>
                        <span className="text-muted-foreground font-mono">1180179299914</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
                EduForAll
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Supporting SDG 4: Quality Education</span>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <Globe className="h-3 w-3 mr-1" />
                Global Impact
              </Badge>
            </div>
          </div>
        </div>
      </footer>

      {/* Donation Dialog */}
      <Dialog open={activeDialog === 'donate'} onOpenChange={closeDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary" />
              <span>Make a Donation</span>
            </DialogTitle>
            <DialogDescription>
              Your donation helps us provide quality education to those who need it most. Every contribution makes a difference.
            </DialogDescription>
          </DialogHeader>
          <DonationForm onSuccess={closeDialog} />
        </DialogContent>
      </Dialog>

      {/* Volunteer Dialog */}
      <Dialog open={activeDialog === 'volunteer'} onOpenChange={closeDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-primary" />
              <span>Volunteer Application</span>
            </DialogTitle>
            <DialogDescription>
              Join our team of dedicated volunteers helping to improve education worldwide. Your time and skills can make a real impact.
            </DialogDescription>
          </DialogHeader>
          <VolunteerForm onSuccess={closeDialog} />
        </DialogContent>
      </Dialog>

      {/* Advocate Dialog */}
      <Dialog open={activeDialog === 'advocate'} onOpenChange={closeDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-primary" />
              <span>Become an Advocate</span>
            </DialogTitle>
            <DialogDescription>
              Amplify our mission by advocating for education policy, raising awareness, and building partnerships in your community.
            </DialogDescription>
          </DialogHeader>
          <AdvocateForm onSuccess={closeDialog} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;