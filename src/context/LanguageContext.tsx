
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Supported languages
export type LanguageType = 'en' | 'ml' | 'ta' | 'fr' | 'zh';

// Added currency symbols for each language
export const currencySymbols = {
  en: '$',
  ml: '₹',
  ta: '₹',
  fr: '€',
  zh: '¥'
};

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
    viewAll: 'View All',
    // Admin translations
    adminDashboard: 'Admin Dashboard',
    manageProducts: 'Products',
    activeOrders: 'Active Orders',
    orderLogs: 'Order Logs',
    productsList: 'Products List',
    addProduct: 'Add Product',
    editProduct: 'Edit Product',
    productName: 'Product Name',
    category: 'Category',
    allCategories: 'All Categories',
    selectCategory: 'Select Category',
    price: 'Price',
    imageUrl: 'Image URL',
    description: 'Description',
    actions: 'Actions',
    updateProduct: 'Update Product',
    productAdded: 'Product added successfully',
    productUpdated: 'Product updated successfully',
    productDeleted: 'Product deleted successfully',
    cancel: 'Cancel',
    name: 'Name',
    cut: 'Cut',
    orderId: 'Order ID',
    customer: 'Customer',
    orderDate: 'Order Date',
    completedDate: 'Completed Date',
    items: 'Items',
    total: 'Total',
    viewItems: 'View Items',
    packingList: 'Packing List',
    customerName: 'Customer Name',
    packed: 'Packed',
    completeOrder: 'Complete Order',
    complete: 'Complete',
    noActiveOrders: 'No Active Orders',
    allOrdersCompleted: 'All orders have been completed',
    completedOrders: 'Completed Orders',
    adminAccessDenied: 'Admin access denied',
    backToHome: 'Back to Home',
    pending: 'Pending',
    processing: 'Processing',
    delivered: 'Delivered'
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
    viewAll: 'എല്ലാം കാണുക',
    // Admin translations
    adminDashboard: 'അഡ്മിൻ ഡാഷ്ബോർഡ്',
    manageProducts: 'ഉൽപ്പന്നങ്ങൾ',
    activeOrders: 'സജീവ ഓർഡറുകൾ',
    orderLogs: 'ഓർഡർ ലോഗുകൾ',
    productsList: 'ഉൽപ്പന്നങ്ങളുടെ പട്ടിക',
    addProduct: 'ഉൽപ്പന്നം ചേർക്കുക',
    editProduct: 'ഉൽപ്പന്നം എഡിറ്റ് ചെയ്യുക',
    productName: 'ഉൽപ്പന്നത്തിന്റെ പേര്',
    category: 'വിഭാഗം',
    allCategories: 'എല്ലാ വിഭാഗങ്ങളും',
    selectCategory: 'വിഭാഗം തിരഞ്ഞെടുക്കുക',
    price: 'വില',
    imageUrl: 'ചിത്രം URL',
    description: 'വിവരണം',
    actions: 'പ്രവർത്തനങ്ങൾ',
    updateProduct: 'ഉൽപ്പന്നം പുതുക്കുക',
    productAdded: 'ഉൽപ്പന്നം വിജയകരമായി ചേർത്തു',
    productUpdated: 'ഉൽപ്പന്നം വിജയകരമായി പുതുക്കി',
    productDeleted: 'ഉൽപ്പന്നം വിജയകരമായി നീക്കം ചെയ്തു',
    cancel: 'റദ്ദാക്കുക',
    name: 'പേര്',
    cut: 'മുറിയുക',
    orderId: 'ഓർഡർ ഐഡി',
    customer: 'ഉപഭോക്താവ്',
    orderDate: 'ഓർഡർ തീയതി',
    completedDate: 'പൂർത്തീകരിച്ച തീയതി',
    items: 'ഇനങ്ങൾ',
    total: 'ആകെ',
    viewItems: 'ഇനങ്ങൾ കാണുക',
    packingList: 'പാക്കിംഗ് ലിസ്റ്റ്',
    customerName: 'ഉപഭോക്താവിന്റെ പേര്',
    packed: 'പാക്ക് ചെയ്തു',
    completeOrder: 'ഓർഡർ പൂർത്തിയാക്കുക',
    complete: 'പൂർത്തിയാക്കുക',
    noActiveOrders: 'സജീവ ഓർഡറുകൾ ഇല്ല',
    allOrdersCompleted: 'എല്ലാ ഓർഡറുകളും പൂർത്തിയാക്കി',
    completedOrders: 'പൂർത്തിയാക്കിയ ഓർഡറുകൾ',
    adminAccessDenied: 'അഡ്മിൻ ആക്സസ് നിഷേധിച്ചു',
    backToHome: 'ഹോമിലേക്ക് മടങ്ങുക',
    pending: 'തീർച്ചപ്പെടുത്താത്ത',
    processing: 'പ്രോസസ്സിംഗ്',
    delivered: 'വിതരണം ചെയ്തു'
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
  getCurrencySymbol: () => string;
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
  
  // Get currency symbol based on current language
  const getCurrencySymbol = (): string => {
    return currencySymbols[language] || '$';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getCurrencySymbol, availableLanguages }}>
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
