import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

const donationSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required').max(100, 'Name too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  amount: z.string().refine(val => !val || (!isNaN(Number(val)) && Number(val) > 0), 'Please enter a valid amount'),
  donationType: z.enum(['one-time', 'monthly', 'annual']),
  message: z.string().max(1000, 'Message too long').optional()
});

interface DonationFormProps {
  onSuccess?: () => void;
}

export const DonationForm = ({ onSuccess }: DonationFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    amount: '',
    donationType: 'one-time' as 'one-time' | 'monthly' | 'annual',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    
    try {
      donationSchema.parse(formData);

      const { error } = await supabase
        .from('donations')
        .insert({
          user_id: user.id,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone || null,
          amount: formData.amount ? parseFloat(formData.amount) : null,
          donation_type: formData.donationType,
          message: formData.message || null
        });

      if (error) throw error;

      toast({
        title: 'Thank You!',
        description: 'Your donation pledge has been recorded. We will contact you with payment details.',
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
          description: 'Failed to submit donation. Please try again.',
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
          <Label htmlFor="amount">Donation Amount (Optional)</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            min="1"
            step="0.01"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="100.00"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="donationType">Donation Type</Label>
        <Select value={formData.donationType} onValueChange={(value: 'one-time' | 'monthly' | 'annual') => 
          setFormData(prev => ({ ...prev, donationType: value }))
        }>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="one-time">One-time Donation</SelectItem>
            <SelectItem value="monthly">Monthly Recurring</SelectItem>
            <SelectItem value="annual">Annual Recurring</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Tell us why you want to support education..."
          rows={3}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-gradient-primary hover:opacity-90" 
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Donation'}
      </Button>
    </form>
  );
};