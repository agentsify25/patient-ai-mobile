
import { MobileLayout } from "@/components/Layout/MobileLayout";
import { VitalSignsForm } from "@/components/Health/VitalSignsForm";

const LogVitalsPage = () => {
  return (
    <MobileLayout title="Log Vital Signs">
      <div className="container mx-auto py-4">
        <VitalSignsForm />
      </div>
    </MobileLayout>
  );
};

export default LogVitalsPage;
