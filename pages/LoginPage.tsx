import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Zap, Phone, CreditCard, Sparkles } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useLanguageStore } from '../store/languageStore';
import { Input } from '../components/UI/Input';
import { Button } from '../components/UI/Button';
import { Scene } from '../components/3D/Scene';
import { LanguageSwitcher } from '../components/UI/LanguageSwitcher';

export const LoginPage = () => {
  const { login, isLoading, error: authError, user, logout } = useAuthStore();
  const { t, dir, language } = useLanguageStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const validate = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    // Simple validation logic
    if (!formData.email) {
      newErrors.email = `${t('identity')} ${t('errorRequired')}`;
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('errorEmail');
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = `${t('passcode')} ${t('errorRequired')}`;
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = t('errorPasswordLength');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      await login(formData.email);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const isRTL = dir === 'rtl';

  // Success State View
  if (user) {
    return (
      <div 
        className={`min-h-screen bg-cyber-dark text-white flex items-center justify-center relative overflow-hidden ${isRTL ? 'font-arabic' : 'font-sans'}`}
        dir={dir}
      >
        <Scene />
        <div className="absolute top-6 right-6 z-50">
           <LanguageSwitcher />
        </div>
        <div className="relative z-10 w-full max-w-lg p-8 bg-cyber-glass backdrop-blur-xl border border-cyber-cyan/30 rounded-2xl text-center shadow-[0_0_50px_rgba(0,217,255,0.1)] animate-in fade-in zoom-in duration-500 mx-4">
          <div className="w-20 h-20 bg-cyber-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyber-cyan">
            <Zap className="text-cyber-cyan" size={40} />
          </div>
          <h2 className="text-3xl font-heading font-bold mb-2">{t('welcomeBack')}</h2>
          <p className="text-gray-300 mb-8">{t('accessGranted')} <span className="text-cyber-cyan font-mono">{user.email}</span></p>
          
          {/* Contact & Payment Info Card */}
          <div className="bg-cyber-dark/50 border border-cyber-glassBorder rounded-xl p-6 mb-6 text-start relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-magenta/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 space-y-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">{t('contactLabel')}</p>
                <div className="flex items-center gap-3 text-cyber-cyan">
                  <Phone size={20} />
                  <span className="text-xl font-mono font-bold tracking-wider" dir="ltr">{t('phoneNumber')}</span>
                </div>
              </div>
              
              <div className="h-px w-full bg-white/10" />
              
              <div className="flex items-center gap-3 text-cyber-magenta">
                <CreditCard size={20} />
                <span className="font-medium">{t('paymentLabel')}</span>
              </div>
            </div>
          </div>

          {/* Demo Disclaimer */}
          <div className="mb-8 p-3 rounded-lg bg-cyber-cyan/5 border border-cyber-cyan/20 text-cyber-cyan/90 text-sm flex items-start gap-3 text-start">
             <Sparkles className="shrink-0 mt-0.5" size={16} />
             <p>{t('demoMessage')}</p>
          </div>

          <Button onClick={logout} variant="secondary">
            {t('disconnect')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen bg-cyber-dark flex flex-col md:flex-row overflow-hidden ${isRTL ? 'font-arabic' : 'font-sans'}`}
      dir={dir}
    >
      
      {/* 3D Visual Section (Top on mobile, Right on Desktop LTR, Left on Desktop RTL) */}
      <div className="relative h-[40vh] md:h-screen md:w-1/2 md:order-2 order-1 bg-gradient-to-b from-cyber-dark to-transparent">
        <Scene />
        {/* Overlay Gradient for seamless blending */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t md:bg-gradient-to-l rtl:md:bg-gradient-to-r from-cyber-dark via-transparent to-transparent opacity-80" />
      </div>

      {/* Form Section (Bottom on mobile, Left on Desktop LTR, Right on Desktop RTL) */}
      <div className="flex-1 md:w-1/2 flex items-center justify-center p-6 md:p-12 relative z-10 md:order-1 order-2">
        <div className="absolute top-6 ltr:right-6 rtl:left-6 z-50">
            <LanguageSwitcher />
        </div>

        <div className="w-full max-w-md">
          
          <div className="mb-10 text-start">
            <h1 className="text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-cyber-cyan mb-2 flex flex-wrap items-baseline gap-2">
              ZAHER<span className="text-cyber-magenta">.</span>
              <span className="font-arabic text-4xl">زاهر</span>
            </h1>
            <p className="text-gray-400">{t('subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t('identity')}
              name="email"
              type="email"
              placeholder={t('identityPlaceholder')}
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              icon={<Mail size={18} />}
            />
            
            <Input
              label={t('passcode')}
              name="password"
              type="password"
              placeholder={t('passcodePlaceholder')}
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              icon={<Lock size={18} />}
            />

            {authError && (
              <div className="p-3 bg-cyber-magenta/10 border border-cyber-magenta/30 rounded text-cyber-magenta text-sm text-center">
                {authError}
              </div>
            )}

            <div className="pt-4">
              <Button type="submit" isLoading={isLoading}>
                {t('initLogin')} 
                <ArrowRight className="ltr:ml-2 rtl:mr-2 rtl:rotate-180" size={18} />
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              {t('forgot')} <a href="#" className="text-cyber-cyan hover:text-white transition-colors">{t('reset')}</a>
            </p>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
             <div className="absolute top-1/4 left-0 w-64 h-64 bg-cyber-cyan/5 rounded-full blur-3xl" />
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyber-magenta/5 rounded-full blur-3xl" />
          </div>

        </div>
      </div>
    </div>
  );
};