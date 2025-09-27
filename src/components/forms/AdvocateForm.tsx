import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

const advocateSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required').max(100, 'Name too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  organization: z.string().max(200, 'Organization name too long').optional(),
  advocacyAreas: z.array(z.string()).min(1, 'Please select at least one advocacy area'),
  socialMedia: z.object({
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional()
  }),
  experience: z.string().max(1000, 'Experience description too long').optional()
});

interface AdvocateFormProps {
  onSuccess?: () => void;
}

const advocacyOptions = [
  'Policy & Government Relations',
  'Community Outreach',
  'Social Media Advocacy',
  'Fundraising & Grant Writing',
  'Research & Data Analysis',
  'Public Speaking & Events',
  'Content Creation & Blogging',
  'Partnerships & Networking'
];

export const AdvocateForm = ({ onSuccess }: AdvocateFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    organization: '',
    advocacyAreas: [] as string[],
    socialMedia: {
      twitter: '',
      linkedin: '',
      facebook: '',
      instagram: ''
    },
    experience: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    
    try {
      advocateSchema.parse(formData);

      const { error } = await supabase
        .from('advocates')
        .insert({
          user_id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone || null,
          organization: formData.organization || null,
          advocacy_areas: formData.advocacyAreas,
          social_media_handles: formData.socialMedia,
          experience: formData.experience || null
        });

      if (error) throw error;

      toast({
        title: 'Application Submitted!',
        description: 'Thank you for joining our advocacy network! We will be in touch with opportunities.',
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
    if (e.target.name.startsWith('social_')) {
      const platform = e.target.name.replace('social_', '');
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [platform]: e.target.value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    }
  };

  const handleAdvocacyAreaChange = (area: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      advocacyAreas: checked 
        ? [...prev.advocacyAreas, area]
        : prev.advocacyAreas.filter(a => a !== area)
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Label htmlFor="organization">Organization/Affiliation (Optional)</Label>
          <Input
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleInputChange}
            placeholder="Your organization or company"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Areas of Advocacy Interest *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {advocacyOptions.map((area) => (
            <div key={area} className="flex items-center space-x-2">
              <Checkbox
                id={area}
                checked={formData.advocacyAreas.includes(area)}
                onCheckedChange={(checked) => handleAdvocacyAreaChange(area, !!checked)}
              />
              <Label htmlFor={area} className="text-sm">{area}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Social Media Handles (Optional)</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="social_twitter"
            value={formData.socialMedia.twitter}
            onChange={handleInputChange}
            placeholder="@twitter_handle"
          />
          <Input
            name="social_linkedin"
            value={formData.socialMedia.linkedin}
            onChange={handleInputChange}
            placeholder="LinkedIn profile URL"
          />
          <Input
            name="social_facebook"
            value={formData.socialMedia.facebook}
            onChange={handleInputChange}
            placeholder="Facebook profile/page"
          />
          <Input
            name="social_instagram"
            value={formData.socialMedia.instagram}
            onChange={handleInputChange}
            placeholder="@instagram_handle"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">Experience & Background</Label>
        <Textarea
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          placeholder="Tell us about your advocacy experience, education background, or related work..."
          rows={4}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-primary hover:opacity-90" 
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Join Advocacy Network'}
      </Button>
    </form>
  );
};