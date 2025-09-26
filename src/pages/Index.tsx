import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { GoalCard } from "@/components/ui/goal-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  Globe, 
  Target, 
  TrendingUp,
  School,
  Laptop,
  Heart
} from "lucide-react";
import educationHero from "@/assets/education-hero.jpg";

const Index = () => {
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
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow">
                <BookOpen className="mr-2 h-5 w-5" />
                Learn More
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Target className="mr-2 h-5 w-5" />
                Take Action
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-background">
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
      <section className="py-16 bg-gradient-hero">
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
              <div className="text-center space-y-4">
                <div className="rounded-full w-16 h-16 bg-primary/10 mx-auto flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold">Donate</h3>
                <p className="text-sm text-muted-foreground">
                  Support education programs worldwide
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="rounded-full w-16 h-16 bg-secondary/10 mx-auto flex items-center justify-center">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold">Volunteer</h3>
                <p className="text-sm text-muted-foreground">
                  Share your knowledge and skills
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="rounded-full w-16 h-16 bg-accent/10 mx-auto flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold">Advocate</h3>
                <p className="text-sm text-muted-foreground">
                  Raise awareness in your community
                </p>
              </div>
            </CardContent>
          </Card>
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
    </div>
  );
};

export default Index;