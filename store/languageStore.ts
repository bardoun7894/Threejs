import { create } from 'zustand';

export type Language = 'en' | 'ar';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    welcomeBack: "Welcome Back",
    accessGranted: "Access granted for",
    disconnect: "Disconnect System",
    subtitle: "Initialize secure connection protocols.",
    identity: "Identity",
    passcode: "Passcode",
    identityPlaceholder: "operator@nexus.com",
    passcodePlaceholder: "••••••••",
    initLogin: "Initialize Login",
    forgot: "Forgot credentials?",
    reset: "Reset Protocol",
    errorRequired: "is required",
    errorEmail: "Please enter a valid email",
    errorPasswordLength: "Password must be at least 6 characters",
    processing: "Processing...",
    titleSuffix: "Login" 
  },
  ar: {
    welcomeBack: "مرحباً بعودتك",
    accessGranted: "تم منح الوصول لـ",
    disconnect: "قطع الاتصال",
    subtitle: "تهيئة بروتوكولات الاتصال الآمن.",
    identity: "الهوية",
    passcode: "رمز المرور",
    identityPlaceholder: "name@nexus.com",
    passcodePlaceholder: "••••••••",
    initLogin: "بدء تسجيل الدخول",
    forgot: "هل نسيت بيانات الاعتماد؟",
    reset: "إعادة تعيين البروتوكول",
    errorRequired: "مطلوب",
    errorEmail: "يرجى إدخال بريد إلكتروني صالح",
    errorPasswordLength: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
    processing: "جارٍ المعالجة...",
    titleSuffix: "تسجيل الدخول"
  }
};

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: 'en',
  dir: 'ltr',
  setLanguage: (lang) => set({ language: lang, dir: lang === 'ar' ? 'rtl' : 'ltr' }),
  t: (key) => {
    const lang = get().language;
    return translations[lang][key] || key;
  }
}));