
import { MobileLayout } from "@/components/Layout/MobileLayout";
import { VitalSignsForm } from "@/components/Health/VitalSignsForm";
import { DefaultPageHeaderElements } from '@/components/Layout/DefaultPageHeaderElements';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LogNewVitalsPage = () => {
  const navigate = useNavigate();
  const { headerRight } = DefaultPageHeaderElements();

  const headerLeft = (
    <Button variant="ghost" size="icon" onClick={() => navigate(-1)} aria-label="Go back">
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );

  return (
    <MobileLayout headerLeft={headerLeft} headerRight={headerRight}>
      <h1 className="text-2xl font-semibold mb-6 text-center">Log New Vital Signs</h1>
      <div className="container mx-auto py-4">
        <VitalSignsForm />
      </div>
    </MobileLayout>
  );
};

export default LogNewVitalsPage;
