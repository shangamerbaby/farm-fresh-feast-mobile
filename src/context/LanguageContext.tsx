import React, { createContext, useState, useContext, ReactNode } from 'react';

// Supported languages
export type LanguageType = 'en' | 'ml' | 'ta' | 'fr' | 'zh' | 'ms';

// Set all currencies to RM (Malaysian Ringgit)
export const currencySymbols = {
  en: 'RM',
  ml: 'RM',
  ta: 'RM',
  fr: 'RM',
  zh: 'RM',
  ms: 'RM'
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
    loginSuccess: 'Login successful',
    invalidCredentials: 'Invalid credentials',
    connectionError: 'Connection error. Please check your internet connection.',
    loginError: 'Login failed. Please try again.',
    demoCredentialsHeading: 'Demo credentials',
    signingIn: 'Signing in...',
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
    delivered: 'Delivered',
    login: 'Login',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    signIn: 'Sign In',
    dontHaveAccount: 'Don\'t have an account?',
    signUp: 'Sign Up',
    logoutSuccess: 'Logged out successfully'
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
    delivered: 'വിതരണം ചെയ്തു',
    login: 'ലോഗിൻ',
    email: 'ഇമെയിൽ',
    password: 'പാസ്‌വേഡ്',
    forgotPassword: 'പാസ്‌വേഡ് മറന്നോ?',
    signIn: 'സൈൻ ഇൻ',
    dontHaveAccount: 'അക്കൗണ്ട് ഇല്ലേ?',
    signUp: 'സൈൻ അപ്പ്',
    connectionError: 'കണക്ഷൻ പിശക്. ദയവായി നിങ്ങളുടെ ഇന്റർനെറ്റ് കണക്ഷൻ പരിശോധിക്കുക.',
    loginError: 'ലോഗിൻ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക.',
    signingIn: 'സൈൻ ഇൻ ചെയ്യുന്നു...',
    logoutSuccess: 'ലോഗ് ഔട്ട് വിജയിച്ചു'
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
    viewAll: 'அனைத்தையும் காட்டு',
    login: 'உள்நுழை',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    forgotPassword: 'கடவுச்சொல்லை மறந்து விட்டீர்களா?',
    signIn: 'உள்நுழைய',
    dontHaveAccount: 'கணக்கு இல்லையா?',
    signUp: 'பதிவு செய்',
    connectionError: 'இணைப்பு பிழை. உங்கள் இணைய இணைப்பை சரிபார்க்கவும்.',
    loginError: 'உள்நுழைவு தோல்வி. மீண்டும் முயற்சிக்கவும்.',
    signingIn: 'உள்நுழைகிறது...',
    logoutSuccess: 'வெற்றிகரமாக வெளியேறப்பட்டது'
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
    viewAll: 'Voir tout',
    login: 'Connexion',
    email: 'E-mail',
    password: 'Mot de passe',
    forgotPassword: 'Mot de passe oublié?',
    signIn: 'Se connecter',
    dontHaveAccount: 'Vous n\'avez pas de compte?',
    signUp: 'S\'inscrire',
    connectionError: 'Erreur de connexion. Veuillez vérifier votre connexion Internet.',
    loginError: 'Échec de la connexion. Veuillez réessayer.',
    signingIn: 'Connexion en cours...',
    logoutSuccess: 'Déconnexion réussie'
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
    viewAll: '查看全部',
    login: '登录',
    email: '电子邮件',
    password: '密码',
    forgotPassword: '忘记密码？',
    signIn: '登录',
    dontHaveAccount: '没有账户？',
    signUp: '注册',
    connectionError: '连接错误。请检查您的互联网连接。',
    loginError: '登录失败。请重试。',
    signingIn: '登录中...',
    logoutSuccess: '注销成功'
  },
  ms: {
    appName: 'Pesta Segar Ladang',
    tagline: 'Penghantaran Daging dari Ladang ke Meja',
    home: 'Utama',
    categories: 'Kategori',
    orders: 'Pesanan',
    account: 'Akaun',
    cow: 'Daging Lembu',
    chicken: 'Ayam',
    mutton: 'Daging Kambing',
    search: 'Cari produk...',
    addToCart: 'Tambah ke Troli',
    viewDetails: 'Lihat Butiran',
    checkout: 'Bayar',
    language: 'Bahasa',
    settings: 'Tetapan',
    freshCuts: 'Potongan Segar',
    premiumSelection: 'Pilihan Premium',
    bestSellers: 'Terlaris',
    viewAll: 'Lihat Semua',
    login: 'Log Masuk',
    email: 'E-mel',
    password: 'Kata Laluan',
    forgotPassword: 'Lupa Kata Laluan?',
    signIn: 'Log Masuk',
    dontHaveAccount: 'Tiada akaun?',
    signUp: 'Daftar',
    // Admin translations
    adminDashboard: 'Papan Pemuka Admin',
    manageProducts: 'Produk',
    activeOrders: 'Pesanan Aktif',
    orderLogs: 'Log Pesanan',
    productsList: 'Senarai Produk',
    addProduct: 'Tambah Produk',
    editProduct: 'Edit Produk',
    productName: 'Nama Produk',
    category: 'Kategori',
    allCategories: 'Semua Kategori',
    selectCategory: 'Pilih Kategori',
    price: 'Harga',
    imageUrl: 'URL Imej',
    description: 'Penerangan',
    actions: 'Tindakan',
    updateProduct: 'Kemas Kini Produk',
    productAdded: 'Produk berjaya ditambah',
    productUpdated: 'Produk berjaya dikemas kini',
    productDeleted: 'Produk berjaya dipadam',
    cancel: 'Batal',
    name: 'Nama',
    cut: 'Potong',
    orderId: 'ID Pesanan',
    customer: 'Pelanggan',
    orderDate: 'Tarikh Pesanan',
    completedDate: 'Tarikh Siap',
    items: 'Item',
    total: 'Jumlah',
    viewItems: 'Lihat Item',
    packingList: 'Senarai Pembungkusan',
    customerName: 'Nama Pelanggan',
    packed: 'Dibungkus',
    completeOrder: 'Siapkan Pesanan',
    complete: 'Siap',
    noActiveOrders: 'Tiada Pesanan Aktif',
    allOrdersCompleted: 'Semua pesanan telah siap',
    completedOrders: 'Pesanan Siap',
    adminAccessDenied: 'Akses admin ditolak',
    backToHome: 'Kembali ke Utama',
    pending: 'Tertunda',
    processing: 'Sedang Diproses',
    delivered: 'Dihantar',
    connectionError: 'Ralat sambungan. Sila periksa sambungan internet anda.',
    loginError: 'Log masuk gagal. Sila cuba lagi.',
    signingIn: 'Log masuk...',
    logoutSuccess: 'Log keluar berjaya'
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

// The key fix: Make sure this is a proper React functional component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageType>('en');

  const availableLanguages = [
    { code: 'en' as LanguageType, name: 'English' },
    { code: 'ml' as LanguageType, name: 'മലയാളം' },
    { code: 'ta' as LanguageType, name: 'தமிழ்' },
    { code: 'fr' as LanguageType, name: 'Français' },
    { code: 'zh' as LanguageType, name: '中文' },
    { code: 'ms' as LanguageType, name: 'Bahasa Melayu' },
  ];

  // Translation function
  const t = (key: string): string => {
    if (!translations[language]) {
      return translations.en[key] || key;
    }
    return translations[language][key] || translations.en[key] || key;
  };
  
  // Get currency symbol based on current language - now fixed to RM for all languages
  const getCurrencySymbol = (): string => {
    return 'RM'; // Always return RM regardless of language
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
