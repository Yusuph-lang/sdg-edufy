import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

const volunteerSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required').max(100, 'Name too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  skills: z.string().max(500, 'Skills description too long').optional(),
  availability: z.string().max(200, 'Availability description too long').optional(),
  experience: z.string().max(1000, 'Experience description too long').optional(),
  motivation: z.string().max(1000, 'Motivation description too long').optional()
});

interface VolunteerFormProps {
  onSuccess?: () => void;
}

export const VolunteerForm = ({ onSuccess }: VolunteerFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    skills: '',
    availability: '',
    experience: '',
    motivation: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    
    try {
      volunteerSchema.parse(formData);

      const { error } = await supabase
        .from('volunteers')
        .insert({
          user_id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone || null,
          skills: formData.skills || null,
          availability: formData.availability || null,
          experience: formData.experience || null,
          motivation: formData.motivation || null
        });

      if (error) throw error;

      toast({
        title: 'Application Submitted!',
        description: 'Thank you for volunteering! We will review your application and contact you soon.',
      });

      onSuccess?.();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Validation Error',
          description: error.errors[0].message,
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to submit application. Please try again.',
          variant: 'destructive'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            placeholder="Your full name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone (Optional)</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="skills">Skills & Expertise</Label>
        <Textarea
          id="skills"
          name="skills"
          value={formData.skills}
          onChange={handleInputChange}
          placeholder="What skills do you bring? (teaching, technology, fundraising, etc.)"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="availability">Availability</Label>
        <Textarea
          id="availability"
          name="availability"
          value={formData.availability}
          onChange={handleInputChange}
          placeholder="When are you available to volunteer? (weekends, evenings, hours per week, etc.)"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">Relevant Experience</Label>
        <Textarea
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          placeholder="Tell us about your background in education, volunteering, or related fields..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="motivation">Why do you want to volunteer?</Label>
        <Textarea
          id="motivation"
          name="motivation"
          value={formData.motivation}
          onChange={handleInputChange}
          placeholder="What motivates you to support education initiatives?"
          rows={3}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-primary hover:opacity-90" 
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
};