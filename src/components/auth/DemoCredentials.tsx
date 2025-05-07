
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const DemoCredentials: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="text-sm text-muted-foreground">
      {t('demoCredentialsHeading')}:
      <ul className="mt-2 list-disc pl-5">
        <li>Admin: admin@example.com / admin123</li>
        <li>Customer: customer@example.com / customer123</li>
      </ul>
    </div>
  );
};

export default DemoCredentials;
