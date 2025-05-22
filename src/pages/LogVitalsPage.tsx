
import { MobileLayout } from "@/components/Layout/MobileLayout";
import { VitalSignsForm } from "@/components/Health/VitalSignsForm";
import { DefaultPageHeaderElements } from '@/components/Layout/DefaultPageHeaderElements';

const LogVitalsPage = () => {
  const { headerLeft, headerRight } = DefaultPageHeaderElements();
  return (
    <MobileLayout headerLeft={headerLeft} headerRight={headerRight}>
      <h1 className="text-2xl font-semibold mb-6 text-center">Log Vital Signs</h1>
      <div className="container mx-auto py-4">
        <VitalSignsForm />
      </div>
    </MobileLayout>
  );
};

export default LogVitalsPage;
