
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Supported languages
export type LanguageType = 'en' | 'ml' | 'ta' | 'fr' | 'zh';

// Translation interface
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Our translations for different languages
const translations: Translations = {
  en: {
    appName: 'Farm Fresh Feast',
    tagline: 'Farm to Table Meat Delivery',
    home: 'Home',
    categories: 'Categories',
    orders: 'Orders',
    account: 'Account',
    cow: 'Beef',
    chicken: 'Chicken',
    mutton: 'Mutton',
    search: 'Search products...',
    addToCart: 'Add to Cart',
    viewDetails: 'View Details',
    checkout: 'Checkout',
    language: 'Language',
    settings: 'Settings',
    freshCuts: 'Fresh Cuts',
    premiumSelection: 'Premium Selection',
    bestSellers: 'Best Sellers',
    viewAll: 'View All'
  },
  ml: {
    appName: 'ഫാം ഫ്രെഷ് ഫീസ്റ്റ്',
    tagline: 'ഫാമിൽ നിന്ന് ടേബിളിലേക്ക് ഇറച്ചി ഡെലിവറി',
    home: 'ഹോം',
    categories: 'വിഭാഗങ്ങൾ',
    orders: 'ഓർഡറുകൾ',
    account: 'അക്കൗണ്ട്',
    cow: 'പശു',
    chicken: 'ചിക്കൻ',
    mutton: 'മട്ടൻ',
    search: 'ഉൽപ്പന്നങ്ങൾ തിരയുക...',
    addToCart: 'കാർട്ടിലേക്ക് ചേർക്കുക',
    viewDetails: 'വിശദാംശങ്ങൾ കാണുക',
    checkout: 'ചെക്ക്ഔട്ട്',
    language: 'ഭാഷ',
    settings: 'ക്രമീകരണങ്ങൾ',
    freshCuts: 'പുതിയ കട്ടുകൾ',
    premiumSelection: 'പ്രീമിയം തിരഞ്ഞെടുപ്പ്',
    bestSellers: 'ഏറ്റവും വിൽപ്പന',
    viewAll: 'എല്ലാം കാണുക'
  },
  ta: {
    appName: 'பண்ணை புதிய விருந்து',
    tagline: 'பண்ணையிலிருந்து மேசைக்கு இறைச்சி விநியோகம்',
    home: 'முகப்பு',
    categories: 'வகைகள்',
    orders: 'ஆர்டர்கள்',
    account: 'கணக்கு',
    cow: 'மாட்டிறைச்சி',
    chicken: 'கோழி',
    mutton: 'ஆட்டிறைச்சி',
    search: 'பொருட்களைத் தேடுங்கள்...',
    addToCart: 'கார்ட்டில் சேர்',
    viewDetails: 'விவரங்களைக் காண',
    checkout: 'செக்அவுட்',
    language: 'மொழி',
    settings: 'அமைப்புகள்',
    freshCuts: 'புதிய வெட்டுகள்',
    premiumSelection: 'பிரீமியம் தேர்வு',
    bestSellers: 'சிறந்த விற்பனையாளர்கள்',
    viewAll: 'அனைத்தையும் காட்டு'
  },
  fr: {
    appName: 'Festin Fermier Frais',
    tagline: 'Livraison de viande de la ferme à la table',
    home: 'Accueil',
    categories: 'Catégories',
    orders: 'Commandes',
    account: 'Compte',
    cow: 'Boeuf',
    chicken: 'Poulet',
    mutton: 'Mouton',
    search: 'Rechercher des produits...',
    addToCart: 'Ajouter au panier',
    viewDetails: 'Voir les détails',
    checkout: 'Commander',
    language: 'Langue',
    settings: 'Paramètres',
    freshCuts: 'Coupes fraîches',
    premiumSelection: 'Sélection Premium',
    bestSellers: 'Meilleures ventes',
    viewAll: 'Voir tout'
  },
  zh: {
    appName: '农场新鲜盛宴',
    tagline: '从农场到餐桌的肉类配送',
    home: '首页',
    categories: '分类',
    orders: '订单',
    account: '账户',
    cow: '牛肉',
    chicken: '鸡肉',
    mutton: '羊肉',
    search: '搜索产品...',
    addToCart: '添加到购物车',
    viewDetails: '查看详情',
    checkout: '结账',
    language: '语言',
    settings: '设置',
    freshCuts: '新鲜切块',
    premiumSelection: '优质选择',
    bestSellers: '畅销产品',
    viewAll: '查看全部'
  }
};

// Language context interface
interface LanguageContextType {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  t: (key: string) => string;
  availableLanguages: { code: LanguageType; name: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageType>('en');

  const availableLanguages = [
    { code: 'en' as LanguageType, name: 'English' },
    { code: 'ml' as LanguageType, name: 'മലയാളം' },
    { code: 'ta' as LanguageType, name: 'தமிழ்' },
    { code: 'fr' as LanguageType, name: 'Français' },
    { code: 'zh' as LanguageType, name: '中文' },
  ];

  // Translation function
  const t = (key: string): string => {
    if (!translations[language]) {
      return translations.en[key] || key;
    }
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
